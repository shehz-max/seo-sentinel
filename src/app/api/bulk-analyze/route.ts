import { NextRequest, NextResponse } from "next/server";
import { getDapaMetrics } from "@/services/dapaService";
import { analyzeHtmlSignals, calculateCustomSpamScore } from "@/services/spamDetector";
import { getAiInsight } from "@/services/groqService";
import { db } from "@/lib/firebase";
// However, the existing project seems to use client SDK in 'src/lib/firebase.ts' which initializes app based on window check.
// Using client SDK in API routes works for some ops but usually Admin SDK is better. 
// Given the constraints and existing code reuse, we will attempt to use the existing services.
// Note: 'dapaService' and 'spamDetector' are isomorphic (work on server).
// But 'db' from '@/lib/firebase' might be undefined on server if the 'if (typeof window !== "undefined")' check is strict.
// Wait, the previous fix to firebase.ts made it initialize unconditionally inside a try-catch, so it SHOULD work on server now.
import { doc, getDoc, updateDoc, increment, setDoc } from "firebase/firestore";

// optimization for shared hosting
// optimization for shared hosting
export const maxDuration = 60; // 60 seconds max

export async function POST(req: NextRequest) {
    try {
        const { urls, userId } = await req.json();

        if (!userId) {
            return NextResponse.json({ error: "Authentication required" }, { status: 401 });
        }

        if (!urls || !Array.isArray(urls)) {
            return NextResponse.json({ error: "Invalid URL list" }, { status: 400 });
        }

        // 1. Enforce batch size limit (Optimization for OnicHost)
        // Reduced to 25 to prevent 60s timeout on shared hosting
        if (urls.length > 25) {
            return NextResponse.json({
                error: "Maximum 25 domains per batch (Backend Limit). Please use the UI for larger lists."
            }, { status: 400 });
        }

        // 2. Check daily job count
        // We need to use 'db'. Since we are on server, we need to ensure 'db' is initialized.
        // If the client SDK initialization in lib/firebase.ts fails on server, this will crash.
        // Assuming the fix works.

        if (!db) {
            return NextResponse.json({ error: "Database connection failed" }, { status: 500 });
        }

        const userRef = doc(db, "users", userId);
        const userDoc = await getDoc(userRef);

        if (!userDoc.exists()) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        const userData = userDoc.data();
        const today = new Date().toISOString().split('T')[0];

        // Check reset
        if (userData.lastResetDate !== today) {
            // If date changed, we implicitly reset. We will update the date when we increment.
            // Just treat current usage as 0.
        } else {
            if ((userData.bulkDomainsToday || 0) + urls.length > 500) {
                return NextResponse.json({
                    error: "Daily limit reached: 500 domains per day"
                }, { status: 403 });
            }
        }

        // 3. Process inline (Sequential/Batching)
        const results = await processBulkInline(urls);

        // 4. Update job count
        await setDoc(userRef, {
            bulkDomainsToday: userData.lastResetDate !== today ? urls.length : increment(urls.length),
            lastResetDate: today
        }, { merge: true });

        return NextResponse.json({ results });

    } catch (error) {
        console.error("Bulk Analysis Failed:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}

async function processBulkInline(urls: string[]) {
    const results = [];

    // Process 5 concurrent requests at a time
    for (let i = 0; i < urls.length; i += 5) {
        const batch = urls.slice(i, i + 5);
        const batchResults = await Promise.all(
            batch.map(url => analyzeSingleUrl(url))
        );
        results.push(...batchResults);

        // API rate limit buffer
        if (i + 5 < urls.length) {
            await new Promise(r => setTimeout(r, 200));
        }
    }

    return results;
}

const ONE_DAY_MS = 24 * 60 * 60 * 1000;

async function analyzeSingleUrl(urlInput: string) {
    let domain = "";
    try {
        // Normalize
        let targetUrl = urlInput.trim();
        if (!targetUrl.startsWith("http")) {
            targetUrl = `https://${targetUrl}`;
        }
        try {
            domain = new URL(targetUrl).hostname.replace('www.', '');
        } catch (e) {
            domain = targetUrl; // fallback
        }

        // --- CACHE CHECK ---
        // Check if we have a recent scan for this domain in Firestore
        if (db) {
            try {
                const cacheRef = doc(db, "cached_analyses", domain);
                const cacheSnap = await getDoc(cacheRef);

                if (cacheSnap.exists()) {
                    const cacheData = cacheSnap.data();
                    const cacheTime = cacheData.timestamp?.toMillis ? cacheData.timestamp.toMillis() : new Date(cacheData.updatedAt || 0).getTime();

                    // If cache is fresh (less than 24 hours old)
                    if (Date.now() - cacheTime < ONE_DAY_MS) {
                        return {
                            ...cacheData.result,
                            cached: true
                        };
                    }
                }
            } catch (cacheErr) {
                console.warn("Cache lookup failed:", cacheErr);
            }
        }
        // -------------------

        // Fetch HTML with timeout
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 15000); // 15s timeout

        let html = "";
        try {
            const response = await fetch(targetUrl, {
                headers: { "User-Agent": "Mozilla/5.0 (compatible; SEOSentinelBot/1.0)" },
                signal: controller.signal
            });
            if (response.ok) {
                html = await response.text();
            }
        } catch (e) {
            console.warn(`Failed to fetch ${targetUrl}`);
        } finally {
            clearTimeout(timeoutId);
        }

        // Parallel Analysis
        const [dapaMetrics, spamSignals] = await Promise.all([
            getDapaMetrics(domain),
            analyzeHtmlSignals(html)
        ]);

        const technicalSpamScore = calculateCustomSpamScore(spamSignals);
        const apiSpamScore = Math.max(0, dapaMetrics.spamScore);
        const finalSpamScore = Math.round((apiSpamScore * 0.4) + (technicalSpamScore * 0.6));

        // --- NEW: Generate Dynamic AI Insight ---
        const failedSignalsList = spamSignals.filter(s => s.detected).map(s => s.name);
        const aiInsight = await getAiInsight(domain, dapaMetrics.domainAuthority, finalSpamScore, failedSignalsList);

        // Fallback to rule-based if AI fails or returns error string
        let insight = aiInsight;
        if (aiInsight.includes("Unavailable") || aiInsight.includes("failed")) {
            const failedCount = spamSignals.filter(s => s.detected).length;
            const failedNames = spamSignals.filter(s => s.detected).map(s => s.name.split(' ')[0]);
            if (failedCount === 0) {
                insight = `Exceptional domain health. ${domain} shows no detectable spam signals across 27 checkpoints. Highly trusted asset.`;
            } else if (finalSpamScore > 50) {
                insight = `Critical toxicity detected. Risks found in ${failedNames.slice(0, 2).join(", ")}. Immediate link removal or disavow recommended.`;
            } else if (failedCount > 5) {
                insight = `Moderate risk profile. Over ${failedCount} technical red flags found, including ${failedNames[0]} issues. Monitor closely.`;
            } else {
                insight = `Generally stable domain. Minor optimizations needed for ${failedNames[0] || 'SEO'} for better ranking potential.`;
            }
        }

        const resultData = {
            domain,
            da: dapaMetrics.domainAuthority,
            pa: dapaMetrics.pageAuthority,
            spamScore: finalSpamScore,
            backlinks: dapaMetrics.totalBacklinks,
            signals: spamSignals,
            insight, // Unique per-domain report
            status: "success" as const
        };

        // --- CACHE SAVE ---
        if (db) {
            try {
                await setDoc(doc(db, "cached_analyses", domain), {
                    result: resultData,
                    updatedAt: new Date().toISOString(),
                    timestamp: new Date()
                });
            } catch (saveErr) {
                console.warn("Failed to save to cache:", saveErr);
            }
        }
        // ------------------

        return resultData;

    } catch (error) {
        return {
            domain: domain || urlInput,
            da: 0,
            pa: 0,
            spamScore: 0,
            backlinks: 0,
            status: "failed",
            insight: "Analysis failed. Server could not reach the domain.",
            error: error instanceof Error ? error.message : "Unknown error"
        };
    }
}
