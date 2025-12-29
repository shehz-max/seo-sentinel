import { NextRequest, NextResponse } from "next/server";
import { getDapaMetrics } from "@/services/dapaService";
import { analyzeHtmlSignals, calculateCustomSpamScore } from "@/services/spamDetector";
import { getAiInsight } from "@/services/groqService";
import { cookies } from "next/headers";

export async function POST(req: NextRequest) {
    try {
        const { url, userId } = await req.json();

        if (!url) {
            return NextResponse.json({ error: "URL is required" }, { status: 400 });
        }

        // --- Rate Limiting / Credit System ---
        const cookieStore = await cookies();
        const guestCookie = cookieStore.get("guest_checks")?.value;
        const today = new Date().toISOString().split('T')[0];

        let guestData = { count: 0, date: today };

        try {
            if (guestCookie) {
                const parsed = JSON.parse(guestCookie);
                // If it's a new day, reset count, otherwise use stored data
                if (parsed.date === today) {
                    guestData = parsed;
                }
            }
        } catch (e) {
            // Fallback for old cookie format (simple number) or invalid JSON
            // Implicitly resets to 0 for new format
        }

        if (!userId) {
            if (guestData.count >= 5) {
                return NextResponse.json({
                    error: "Daily limit reached (5/5). Sign up for unlimited checks!",
                    requiresLogin: true
                }, { status: 403 });
            }
            // Increment guest check
            guestData.count++;
            cookieStore.set("guest_checks", JSON.stringify(guestData), { maxAge: 86400 });
        } else {
            // For authenticated users, verify limits via Firestore
            // checkAndResetDailyLimits logic is handled in bulk route, 
            // but for single checks we usually allow unlimited for auth users.
            // We can just track usage here if needed.
        }
        // --- End System ---
        // In a real prod environment, we would verify the userId via Firebase Admin SDK
        // and decrement credits in Firestore here. For now, we simulate the flow.
        // --- End System ---

        // Normalize URL
        let targetUrl = url;
        if (!targetUrl.startsWith("http")) {
            targetUrl = `https://${targetUrl}`;
        }

        // 1. Fetch HTML from target
        const response = await fetch(targetUrl, {
            headers: {
                "User-Agent": "Mozilla/5.0 (compatible; SEOSentinelBot/1.0; +https://seosentinel.com)"
            },
            next: { revalidate: 0 }
        });

        if (!response.ok) {
            return NextResponse.json({ error: `Failed to reach site: ${response.status}` }, { status: response.status });
        }

        const html = await response.text();
        const domain = new URL(targetUrl).hostname;

        // 2. Parallel Processing
        const [dapaMetrics, spamSignals] = await Promise.all([
            getDapaMetrics(domain),
            analyzeHtmlSignals(html)
        ]);

        // 3. Calculate Hybrid Scores
        const technicalSpamScore = calculateCustomSpamScore(spamSignals);
        const apiSpamScore = Math.max(0, dapaMetrics.spamScore);
        const finalSpamScore = Math.round((apiSpamScore * 0.4) + (technicalSpamScore * 0.6));

        // 4. Get AI Insight
        const failedSignals = spamSignals.filter(s => s.detected).map(s => s.name);
        const aiInsight = await getAiInsight(domain, dapaMetrics.domainAuthority, finalSpamScore, failedSignals);

        // 5. Construct Response
        return NextResponse.json({
            domain,
            metrics: {
                da: dapaMetrics.domainAuthority,
                pa: dapaMetrics.pageAuthority,
                backlinks: dapaMetrics.totalBacklinks,
                spamScore: finalSpamScore
            },
            signals: spamSignals,
            insight: aiInsight
        });

    } catch (error) {
        console.error("Analysis Failed:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
