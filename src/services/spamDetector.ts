import * as cheerio from "cheerio";

export interface SpamSignal {
    id: string;
    name: string;
    detected: boolean;
    severity: "critical" | "high" | "medium" | "low";
    description: string;
}

export async function analyzeHtmlSignals(html: string): Promise<SpamSignal[]> {
    const $ = cheerio.load(html);
    const signals: SpamSignal[] = [];

    // 1. Google Tag Manager (GTM)
    const gtmRegex = /(googletagmanager\.com|'GTM-[A-Z0-9]+')/i;
    const hasGTM = gtmRegex.test(html);
    signals.push({
        id: "gtm_missing",
        name: "Missing Google Tag Manager",
        detected: !hasGTM,
        severity: "medium",
        description: "Legitimate businesses typically track conversions with GTM."
    });

    // 2. SSL / HTTPS (Inferred from content, usually checked by protocol but here checks for mixed content or insecure links)
    // Note: True SSL check happens at network level, this checks for internal insecure links
    const hasHttpLinks = $("a[href^='http://']").length > 0;
    signals.push({
        id: "insecure_links",
        name: "Insecure (HTTP) Links",
        detected: hasHttpLinks,
        severity: "high",
        description: "Links to non-secure HTTP pages are a security risk."
    });

    // 3. Contact Info (Email)
    const emailRegex = /([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)/;
    const hasEmail = emailRegex.test(html);
    signals.push({
        id: "no_email",
        name: "No Email Address",
        detected: !hasEmail,
        severity: "medium",
        description: "Spam sites often hide contact information."
    });

    // 4. Meta Keywords (Deprecated/Spammy)
    const hasMetaKeywords = $("meta[name='keywords']").length > 0;
    signals.push({
        id: "meta_keywords",
        name: "Uses Meta Keywords",
        detected: hasMetaKeywords,
        severity: "low",
        description: "Deprecated tag often used by low-quality spam sites."
    });

    // 5. Title Tag Length
    const title = $("title").text();
    const titleLength = title.length;
    const badTitle = titleLength < 10 || titleLength > 70;
    signals.push({
        id: "bad_title_length",
        name: "Abnormal Title Length",
        detected: badTitle,
        severity: "low",
        description: "Titles should be between 10-70 characters."
    });

    // 6. External Link Ratio
    const textLength = $("body").text().length;
    const linkCount = $("a[href^='http']").length;
    // A crude approximation: if > 1 link per 200 chars of text, high density
    const highLinkDensity = (linkCount > 5) && (textLength / linkCount < 200);
    signals.push({
        id: "link_stuffing",
        name: "Link Stuffing Detected",
        detected: highLinkDensity,
        severity: "high",
        description: "Abnormally high ratio of external links to text content."
    });

    // 7. Poison Words (Critical)
    const bodyText = $("body").text().toLowerCase();
    const poisonWords = ["casino", "viagra", "cialis", "payday loan", "buy crypto", "lottery winner"];
    const foundPoison = poisonWords.filter(word => bodyText.includes(word));
    signals.push({
        id: "poison_words",
        name: "Poison Words Detected",
        detected: foundPoison.length > 0,
        severity: "critical",
        description: `Suspicious terms found: ${foundPoison.slice(0, 3).join(", ")}`
    });

    // 8. Favicon Check (Minor)
    const hasFavicon = $("link[rel*='icon']").length > 0 || $("link[rel='shortcut icon']").length > 0;
    signals.push({
        id: "no_favicon",
        name: "Missing Favicon",
        detected: !hasFavicon,
        severity: "low",
        description: "Professional sites usually have a favicon."
    });

    // 9. Social Links (Trust Signal)
    const socialPatterns = [/linkedin\.com/, /twitter\.com/, /facebook\.com/, /instagram\.com/];
    const hasSocials = $("a[href]").toArray().some(el => {
        const href = $(el).attr("href") || "";
        return socialPatterns.some(p => p.test(href));
    });
    signals.push({
        id: "no_socials",
        name: "No Social Media Links",
        detected: !hasSocials,
        severity: "low",
        description: "Lack of social proof/links reduces trust."
    });

    return signals;
}

export function calculateCustomSpamScore(signals: SpamSignal[]): number {
    let score = 0;

    signals.filter(s => s.detected).forEach(signal => {
        switch (signal.severity) {
            case "critical": score += 25; break;
            case "high": score += 15; break;
            case "medium": score += 10; break;
            case "low": score += 5; break;
        }
    });

    return Math.min(100, score);
}
