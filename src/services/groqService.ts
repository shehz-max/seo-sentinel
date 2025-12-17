import Groq from "groq-sdk";

// Initialize Groq
// In production: process.env.GROQ_API_KEY
const apiKey = process.env.GROQ_API_KEY || "";

export async function getAiInsight(domain: string, da: number, spamScore: number, failedSignals: string[]) {
    // If no key is configured (and fallback fails), return generic message
    if (!apiKey) {
        return "AI Insight Unavailable: Missing API Key.";
    }

    try {
        const groq = new Groq({ apiKey });

        const prompt = `
      Act as a Senior SEO Consultant. Analyze this website profile:
      Domain: ${domain}
      Moz Domain Authority: ${da}
      Spam Score: ${spamScore}/100
      Failed Technical Signals: ${failedSignals.join(", ")}

      Provide a concise 2-sentence strategic summary.
      1. Is this site safe to link to?
      2. What is the single biggest fix needed?
    `;

        const chatCompletion = await groq.chat.completions.create({
            "messages": [
                {
                    "role": "user",
                    "content": prompt
                }
            ],
            "model": "llama-3.3-70b-versatile",
            "temperature": 0.5,
            "max_tokens": 150,
            "top_p": 1,
            "stream": false,
            "stop": null
        });

        return chatCompletion.choices[0]?.message?.content || "Analysis complete.";

    } catch (error: any) {
        console.error("Groq AI Error:", error);
        // Provide more specific error if possible
        if (error?.message) {
            return `AI Analysis Unavailable: ${error.message}`;
        }
        return "AI Analysis failed temporarily. Please check your API key.";
    }
}
