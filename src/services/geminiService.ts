import { GoogleGenerativeAI } from "@google/generative-ai";

// Initialize AI (Mocked if key missing to prevent crash during setup)
// In production: process.env.GOOGLE_API_KEY
const apiKey = process.env.GOOGLE_API_KEY || "mock-key";
// Note: @google/genai syntax differs slightly by version, using standard client pattern
// Adjusting to common pattern for 'google-generative-ai' or '@google/genai'

export async function getAiInsight(domain: string, da: number, spamScore: number, failedSignals: string[]) {
    if (!process.env.GOOGLE_API_KEY) {
        return "AI Insight Unavailable: Please configure GOOGLE_API_KEY. (Mock: Based on the high spam score and missing contact info, this domain appears risky for SEO efforts.)";
    }

    try {
        const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);
        const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

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

        const result = await model.generateContent(prompt);
        const response = await result.response;
        return response.text();
    } catch (error) {
        console.error("Gemini Error:", error);
        return "AI Analysis failed temporarily.";
    }
}
