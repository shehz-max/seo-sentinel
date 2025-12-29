"use client";

import { useAuth } from "@/contexts/AuthContext";
import { useRouter, useSearchParams } from "next/navigation";
import { ShieldCheck, Sparkles } from "lucide-react";
import Link from "next/link";
import { useEffect, useState, Suspense } from "react";

function SignupContent() {
    const { user, loginWithGoogle, signupWithEmail } = useAuth();
    const router = useRouter();
    const searchParams = useSearchParams();
    const redirectUrl = searchParams.get("redirect") || "/";
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [form, setForm] = useState({ name: "", email: "", password: "" });

    useEffect(() => {
        if (user) {
            router.push(redirectUrl);
        }
    }, [user, router, redirectUrl]);

    const handleEmailSignup = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setIsLoading(true);
        try {
            await signupWithEmail(form.email, form.password, form.name);
        } catch (err: any) {
            console.error(err);
            if (err.message?.includes("email-already-in-use")) {
                setError("This email is already registered.");
            } else if (err.message?.includes("weak-password")) {
                setError("Password is too weak (min 6 chars).");
            } else {
                setError("Signup failed. Please try again.");
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-secondary/10 via-transparent to-accent/10 blur-3xl"></div>

            <div className="max-w-md w-full space-y-8 glass-dark p-6 sm:p-10 rounded-3xl border border-secondary/30 shadow-2xl relative z-10 mx-4">
                <div className="text-center">
                    <Link href="/" className="inline-flex items-center gap-2 mb-6 group">
                        <div className="relative">
                            <ShieldCheck className="h-10 w-10 sm:h-12 sm:w-12 text-secondary group-hover:scale-110 transition-transform" />
                            <Sparkles className="h-4 w-4 text-accent absolute -top-1 -right-1 animate-pulse" />
                        </div>
                    </Link>
                    <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
                        Join SEO Sentinel
                    </h2>
                    <p className="mt-3 text-sm sm:text-base text-gray-400">
                        The first step to a safer, more authoritative domain.
                    </p>
                </div>

                <div className="mt-8 space-y-6">

                    <form onSubmit={handleEmailSignup} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-400 mb-1">Full Name</label>
                            <input
                                type="text"
                                required
                                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-secondary/50"
                                placeholder="John Doe"
                                value={form.name}
                                onChange={(e) => setForm({ ...form, name: e.target.value })}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-400 mb-1">Email Address</label>
                            <input
                                type="email"
                                required
                                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-secondary/50"
                                placeholder="name@company.com"
                                value={form.email}
                                onChange={(e) => setForm({ ...form, email: e.target.value })}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-400 mb-1">Password</label>
                            <input
                                type="password"
                                required
                                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-secondary/50"
                                placeholder="Min 6 characters"
                                minLength={6}
                                value={form.password}
                                onChange={(e) => setForm({ ...form, password: e.target.value })}
                            />
                        </div>

                        {error && (
                            <p className="text-red-400 text-sm text-center bg-red-500/10 py-2 rounded-lg">{error}</p>
                        )}

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full py-3.5 rounded-xl bg-secondary hover:bg-secondary-dark text-white font-bold transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-secondary/20"
                        >
                            {isLoading ? "Creating Account..." : "Create Account"}
                        </button>
                    </form>

                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-white/10"></div>
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="px-2 bg-[#0B0F19] text-gray-400">Or sign up with</span>
                        </div>
                    </div>

                    <button
                        onClick={async () => {
                            setError(null);
                            try {
                                await loginWithGoogle();
                            } catch (err: any) {
                                console.error("Google Signup Error:", err);
                                setError(err.message || "Google Sign-Up failed. Please try again.");
                            }
                        }}
                        className="group relative w-full flex justify-center items-center gap-3 py-3.5 border border-white/10 text-sm font-bold rounded-xl text-white bg-white/5 hover:bg-white/10 transition-all"
                    >
                        <svg className="h-5 w-5" viewBox="0 0 24 24">
                            {/* Google Logo */}
                            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.26.81-.58z" fill="#FBBC05" />
                            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                        </svg>
                        Google
                    </button>

                    <p className="mt-6 text-center text-sm text-gray-400">
                        Already have an account?{" "}
                        <Link href="/login" className="text-secondary font-bold hover:text-secondary-light transition-colors">
                            Log in here
                        </Link>
                    </p>

                    <p className="mt-4 text-center text-xs text-gray-500">
                        By signing up, you agree to our{" "}
                        <Link href="/legal/terms" className="text-primary hover:underline">
                            Terms of Service
                        </Link>{" "}
                        and{" "}
                        <Link href="/legal/privacy" className="text-primary hover:underline">
                            Privacy Policy
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default function Signup() {
    return (
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-[#020617] text-white">Loading Signup...</div>}>
            <SignupContent />
        </Suspense>
    );
}
