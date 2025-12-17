export interface DapaData {
    domainAuthority: number;
    pageAuthority: number;
    spamScore: number;
    totalBacklinks: number;
}

const API_KEY = process.env.DAPA_API_KEY || "b99ec108e4d408cd1011b3522da36679d0ca6d1b";

export async function getDapaMetrics(domain: string): Promise<DapaData> {
    console.log(`[DapaService] Fetching metrics for: ${domain}`);

    try {
        const response = await fetch("https://www.dapachecker.org/api/user/dapa-checker", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${API_KEY}`
            },
            body: JSON.stringify({
                urls: [domain]
            }),
            next: { revalidate: 3600 } // Cache for 1 hour
        });

        if (!response.ok) {
            console.error(`[DapaService] API Error: ${response.status} ${response.statusText}`);
            const text = await response.text();
            console.error(`[DapaService] Error Body: ${text}`);
            throw new Error(`DapaChecker API failed: ${response.statusText}`);
        }

        const json = await response.json();
        console.log("[DapaService] Response:", json);

        // API returns { status: 200, data: [ { ... } ] }
        if (!json.data || !Array.isArray(json.data) || json.data.length === 0) {
            console.warn("[DapaService] Empty data received, returning defaults.");
            return { domainAuthority: 0, pageAuthority: 0, spamScore: 0, totalBacklinks: 0 };
        }

        const result = json.data[0];

        return {
            domainAuthority: result.site_da || 0,
            pageAuthority: result.site_pa || 0,
            spamScore: result.spam_score || 0,
            // API doesn't seem to return backlinks in the example response, 
            // so we'll default to 0 or use a placeholder if not present.
            // Some plans might include it, but the example docs don't show it.
            totalBacklinks: result.backlinks || 0
        };

    } catch (error) {
        console.error("[DapaService] Failed to fetch metrics:", error);
        return {
            domainAuthority: 0,
            pageAuthority: 0,
            spamScore: 0,
            totalBacklinks: 0
        };
    }
}
