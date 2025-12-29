export const GUEST_LIMIT = 3;

export function getGuestUsage(): number {
    if (typeof window === "undefined") return 0;
    const usage = localStorage.getItem("guest_usage");
    return usage ? parseInt(usage, 10) : 0;
}

export function incrementGuestUsage(): void {
    if (typeof window === "undefined") return;
    const current = getGuestUsage();
    localStorage.setItem("guest_usage", (current + 1).toString());
}

export function hasGuestRemaining(): boolean {
    return getGuestUsage() < GUEST_LIMIT;
}
