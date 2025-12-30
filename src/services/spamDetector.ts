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

    // --- 1-7. Existing Refined Signals ---
    const gtmRegex = /(googletagmanager\.com|'GTM-[A-Z0-9]+')/i;
    signals.push({ id: "gtm_missing", name: "Missing Tracking", detected: !gtmRegex.test(html), severity: "medium", description: "Legitimate businesses typically use GTM for conversion tracking." });

    signals.push({ id: "insecure_links", name: "Insecure links", detected: $("a[href^='http://']").length > 0, severity: "high", description: "Found non-secure HTTP links which pose a security risk." });

    const emailRegex = /([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)/;
    signals.push({ id: "no_email", name: "No Contact Email", detected: !emailRegex.test(html), severity: "medium", description: "No public email address found in HTML source." });

    signals.push({ id: "meta_keywords", name: "Meta Keywords", detected: $("meta[name='keywords']").length > 0, severity: "low", description: "Uses meta keywords tag, which is often a sign of low-quality SEO." });

    const title = $("title").text();
    signals.push({ id: "bad_title", name: "Title Quality", detected: title.length < 10 || title.length > 70, severity: "low", description: "Meta title is either too short or too long for optimal SEO." });

    const textLength = $("body").text().length;
    const linkCount = $("a[href^='http']").length;
    const highDensity = (linkCount > 10) && (textLength / linkCount < 150);
    signals.push({ id: "link_stuffing", name: "Link Stuffing", detected: highDensity, severity: "high", description: "High density of external links compared to text content." });

    const bodyText = $("body").text().toLowerCase();
    const poisonWords = ["casino", "viagra", "cialis", "payday loan", "buy crypto", "lottery"];
    const foundPoison = poisonWords.filter(word => bodyText.includes(word));
    signals.push({ id: "poison_words", name: "Poison Content", detected: foundPoison.length > 0, severity: "critical", description: `Found suspicious terms: ${foundPoison.join(", ")}` });

    // --- 8-15. Trust & Essential Tags ---
    signals.push({ id: "no_favicon", name: "No Favicon", detected: $("link[rel*='icon']").length === 0, severity: "low", description: "Professional websites almost always include a favicon." });

    const socialPatterns = [/linkedin\.com/, /twitter\.com/, /facebook\.com/, /instagram\.com/];
    const hasSocials = $("a[href]").toArray().some(el => socialPatterns.some(p => p.test($(el).attr("href") || "")));
    signals.push({ id: "no_social", name: "No Social Trust", detected: !hasSocials, severity: "low", description: "No links to major social media platforms found." });

    signals.push({ id: "no_description", name: "No Meta Description", detected: $("meta[name='description']").length === 0, severity: "medium", description: "Missing meta description tag which is essential for SEO." });

    signals.push({ id: "no_viewport", name: "Mobile Compatibility", detected: $("meta[name='viewport']").length === 0, severity: "high", description: "Missing viewport tag; site may not be mobile-responsive." });

    signals.push({ id: "no_canonical", name: "Duplicate Content Risk", detected: $("link[rel='canonical']").length === 0, severity: "low", description: "Missing canonical tag which prevents duplicate content issues." });

    signals.push({ id: "no_h1", name: "Missing H1", detected: $("h1").length === 0, severity: "medium", description: "No H1 heading found. Every page should have one main topic heading." });

    signals.push({ id: "multiple_h1", name: "Multiple H1s", detected: $("h1").length > 1, severity: "low", description: "Found more than one H1 tag. This can confuse search engines." });

    signals.push({ id: "no_lang", name: "Missing Lang Attribute", detected: !$("html").attr("lang"), severity: "low", description: "HTML lang attribute is missing, affecting accessibility." });

    // --- 16-22. Technical Red Flags ---
    signals.push({ id: "iframe_detected", name: "Hidden iFrames", detected: $("iframe").length > 0, severity: "medium", description: "Detected iFrames which can be used to hide malicious content/spam." });

    signals.push({ id: "flash_content", name: "Legacy Flash Content", detected: $("embed, object").length > 0, severity: "medium", description: "Uses Flash or legacy objects which are deprecated and insecure." });

    signals.push({ id: "meta_refresh", name: "Auto-Redirects", detected: $("meta[http-equiv='refresh']").length > 0, severity: "high", description: "Meta refresh detected. This is a common technique for spam redirects." });

    const jsCode = $("script").text();
    const isObfuscated = /eval\(|unescape\(|String\.fromCharCode/.test(jsCode);
    signals.push({ id: "obfuscated_js", name: "Obfuscated Scripts", detected: isObfuscated, severity: "critical", description: "Found code patterns often used to hide malicious scripts or trackers." });

    const textToHtml = textLength / html.length;
    signals.push({ id: "thin_content", name: "Thin Content", detected: textToHtml < 0.1, severity: "high", description: "Very low text-to-code ratio. Common in door-way or landing spam pages." });

    const hasEmptyLinks = $("a[href='#'], a[href='']").length > 5;
    signals.push({ id: "empty_links", name: "Empty Links", detected: hasEmptyLinks, severity: "low", description: "High volume of placeholder or broken links detected." });

    const isLargePage = html.length > 250000;
    signals.push({ id: "heavy_page", name: "Bloated Code", detected: isLargePage, severity: "medium", description: "Page source is extremely large (>250KB), suggesting poor optimization." });

    // --- 23-27. Brand & User Experience ---
    const bodyLower = bodyText;
    const hasPrivacy = bodyLower.includes("privacy policy") || $("a:contains('Privacy')").length > 0;
    signals.push({ id: "no_privacy", name: "No Privacy Policy", detected: !hasPrivacy, severity: "medium", description: "Could not find a link to a Privacy Policy page." });

    const hasTerms = bodyLower.includes("terms of") || $("a:contains('Terms')").length > 0;
    signals.push({ id: "no_terms", name: "No Terms of Service", detected: !hasTerms, severity: "medium", description: "Missing key legal terms and conditions link." });

    const scriptCount = $("script").length;
    signals.push({ id: "script_bloat", name: "Script Overloading", detected: scriptCount > 30, severity: "low", description: "Site is loading more than 30 separate scripts which harms performance." });

    const inlineStyles = $("*[style]").length;
    signals.push({ id: "inline_styles", name: "Inline Style Usage", detected: inlineStyles > 20, severity: "low", description: "Heavy use of inline styles instead of professional CSS files." });

    const imagesMissingAlt = $("img:not([alt])").length > 5;
    signals.push({ id: "missing_alt", name: "Missing Image Alt", detected: imagesMissingAlt, severity: "low", description: "Multiple images are missing alt text, hurting trust and accessibility." });

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
