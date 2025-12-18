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
        const guestChecks = cookieStore.get("guest_checks")?.value || "0";

        if (!userId) {
            if (parseInt(guestChecks) >= 1) {
                return NextResponse.json({
                    error: "Free limit reached.",
                    requiresLogin: true
                }, { status: 403 });
            }
            // Increment guest check cookie
            cookieStore.set("guest_checks", (parseInt(guestChecks) + 1).toString(), { maxAge: 86400 });
        }
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
