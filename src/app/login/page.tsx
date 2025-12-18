"use client";

import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { ShieldCheck, Sparkles } from "lucide-react";
import Link from "next/link";
import { useEffect } from "react";

export default function Login() {
    const { user, loginWithGoogle } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (user) {
            router.push("/dashboard");
        }
    }, [user, router]);

    return (
        <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-secondary/10 blur-3xl"></div>

            <div className="max-w-md w-full space-y-8 glass-dark p-6 sm:p-10 rounded-3xl border border-primary/30 shadow-2xl relative z-10 mx-4">
                <div className="text-center">
                    <Link href="/" className="inline-flex items-center gap-2 mb-6 group">
                        <div className="relative">
                            <ShieldCheck className="h-10 w-10 sm:h-12 sm:w-12 text-primary group-hover:scale-110 transition-transform" />
                            <Sparkles className="h-4 w-4 text-secondary absolute -top-1 -right-1 animate-pulse" />
                        </div>
                    </Link>
                    <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
                        Welcome Back
                    </h2>
                    <p className="mt-3 text-sm sm:text-base text-gray-400">
                        Log in to your SEO Sentinel dashboard
                    </p>
                </div>

                <div className="mt-8">
                    <button
                        onClick={() => loginWithGoogle()}
                        className="group relative w-full flex justify-center items-center gap-3 py-3.5 sm:py-4 px-6 border-2 border-primary/30 text-sm sm:text-base font-bold rounded-xl text-white bg-white/5 hover:bg-white/10 hover:border-primary/50 transition-all shadow-lg shadow-primary/20"
                    >
                        <svg className="h-6 w-6" viewBox="0 0 24 24">
                            {/* SVG Paths for Google Logo remain same */}
                            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.26.81-.58z" fill="#FBBC05" />
                            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                        </svg>
                        Log in with Google
                    </button>

                    <p className="mt-6 text-center text-sm text-gray-400">
                        Don't have an account?{" "}
                        <Link href="/signup" className="text-primary font-bold hover:text-primary-light transition-colors">
                            Get Started Free
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
