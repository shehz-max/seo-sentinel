// This service handles interactions with the Moz API.
// CURRENT STATE: Mocked for development/demo purposes without billing.

export interface MozData {
    domainAuthority: number;
    pageAuthority: number;
    spamScore: number;
    totalBacklinks: number;
}

export async function getMozMetrics(domain: string): Promise<MozData> {
    // SIMULATION MODE
    // In production, this would fetch from "https://lsapi.seomoz.com/v2/..."

    console.log(`[MozService] Fetching metrics for: ${domain}`);

    // Deterministic mock based on domain length to give consistent results
    const pseudoRandom = domain.length % 10;

    // High quality domains
    if (domain.includes("google") || domain.includes("moz")) {
        return {
            domainAuthority: 90 + pseudoRandom,
            pageAuthority: 85 + pseudoRandom,
            spamScore: 1,
            totalBacklinks: 15000000
        };
    }

    // Spammy looking domains
    if (domain.includes("cheap") || domain.includes("loan") || domain.includes("free")) {
        return {
            domainAuthority: 10 + pseudoRandom,
            pageAuthority: 12 + pseudoRandom,
            spamScore: 65 + (pseudoRandom * 2), // High spam
            totalBacklinks: 450
        };
    }

    // Average domains
    return {
        domainAuthority: 25 + (pseudoRandom * 3),
        pageAuthority: 30 + (pseudoRandom * 2),
        spamScore: 5 + pseudoRandom,
        totalBacklinks: 1200 + (pseudoRandom * 100)
    };
}
