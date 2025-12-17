import { NextRequest, NextResponse } from "next/server";
import { getDapaMetrics } from "@/services/dapaService";
import { analyzeHtmlSignals, calculateCustomSpamScore } from "@/services/spamDetector";
import { getAiInsight } from "@/services/groqService";

export async function POST(req: NextRequest) {
    try {
        const { url } = await req.json();

        if (!url) {
            return NextResponse.json({ error: "URL is required" }, { status: 400 });
        }

        // Normalize URL
        let targetUrl = url;
        if (!targetUrl.startsWith("http")) {
            targetUrl = `https://${targetUrl}`;
        }

        // 1. Fetch HTML from target (The Scraper)
        console.log(`Analyzing: ${targetUrl}`);
        const response = await fetch(targetUrl, {
            headers: {
                "User-Agent": "Mozilla/5.0 (compatible; SEOSentinelBot/1.0; +https://seosentinel.com)"
            },
            next: { revalidate: 0 } // No cache
        });

        if (!response.ok) {
            return NextResponse.json({ error: `Failed to reach site: ${response.status}` }, { status: response.status });
        }

        const html = await response.text();
        const domain = new URL(targetUrl).hostname;

        // 2. Parallel Processing - NEW: Using DapaChecker API
        const [dapaMetrics, spamSignals] = await Promise.all([
            getDapaMetrics(domain),
            analyzeHtmlSignals(html)
        ]);

        // 3. Calculate Hybrid Scores
        const technicalSpamScore = calculateCustomSpamScore(spamSignals);
        // Hybrid Score: Weight API Spam Score (40%) and Our Detection (60%)
        // Handle cases where API returns -1 or null
        const apiSpamScore = Math.max(0, dapaMetrics.spamScore);
        const finalSpamScore = Math.round((apiSpamScore * 0.4) + (technicalSpamScore * 0.6));

        // 4. Get AI Insight (Groq)
        const failedSignals = spamSignals.filter(s => s.detected).map(s => s.name);
        // Use DA from API for insight context
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
