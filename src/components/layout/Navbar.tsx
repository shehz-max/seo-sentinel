"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Menu, X, ShieldCheck, Sparkles, LogOut } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/contexts/AuthContext";

export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const { user, logout, isAdmin } = useAuth();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <nav
            className={cn(
                "fixed top-0 left-0 right-0 z-[100] transition-all duration-300",
                isScrolled
                    ? "glass-dark shadow-lg shadow-black/40 border-b border-white/5 backdrop-blur-xl bg-slate-950/95"
                    : "bg-transparent border-transparent"
            )}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16 md:h-20">
                    <div className="flex-shrink-0 flex items-center">

                        <Link href="/" className="flex items-center gap-3 group">
                            <div className="relative h-10 w-10 flex items-center justify-center">
                                {/* Base Icon: Globe for 'Website' */}
                                <div className="absolute inset-0 bg-gradient-to-br from-primary to-secondary opacity-20 blur-lg rounded-full group-hover:opacity-40 transition-opacity" />
                                <ShieldCheck className="h-9 w-9 text-primary relative z-10 drop-shadow-lg transform group-hover:scale-110 transition-transform duration-300" />
                                {/* Overlay Icon: Small spark/check to adding detail */}
                                <Sparkles className="absolute -top-1 -right-1 h-4 w-4 text-secondary animate-pulse z-20" />
                            </div>
                            <span className="font-bold text-lg md:text-xl tracking-tight">
                                <span className="text-white">Free</span>
                                <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent"> Spams Check</span>
                            </span>
                        </Link>
                    </div>

                    <div className="hidden lg:block">
                        <div className="ml-10 flex items-baseline space-x-1">
                            <Link href="/" className="px-4 py-2 rounded-lg text-sm font-bold text-gray-200 hover:text-white transition-all">Tool</Link>
                            <Link href="/blog" className="px-4 py-2 rounded-lg text-sm font-bold text-gray-200 hover:text-white transition-all">Blogs</Link>
                            <Link href="/about" className="px-4 py-2 rounded-lg text-sm font-bold text-gray-200 hover:text-white transition-all">About</Link>
                            <Link href="/contact" className="px-4 py-2 rounded-lg text-sm font-bold text-gray-200 hover:text-white transition-all">Contact</Link>

                            {user ? (
                                <div className="ml-4 flex items-center gap-3 pl-4 border-l border-white/10">
                                    <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20">
                                        <Sparkles className="h-3 w-3 text-primary" />
                                        <span className="text-xs font-bold text-primary uppercase tracking-wide">
                                            Free Plan
                                        </span>
                                    </div>
                                    {isAdmin && (
                                        <Link
                                            href="/admin"
                                            className="px-3 py-1.5 rounded-full bg-red-500/10 border border-red-500/20 text-xs font-bold text-red-500 uppercase tracking-wide hover:bg-red-500/20 transition-all"
                                        >
                                            Admin
                                        </Link>
                                    )}
                                    <button
                                        onClick={logout}
                                        className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-all border border-transparent hover:border-red-500/20"
                                    >
                                        <LogOut className="h-4 w-4" />
                                        Sign out
                                    </button>
                                </div>
                            ) : (
                                <>
                                    <Link href="/login" className="ml-4 px-4 py-2 rounded-lg text-sm font-medium text-gray-300 hover:bg-slate-800/50 transition-all">Log in</Link>
                                    <Link href="/signup" className="px-5 py-2 rounded-lg text-sm font-medium bg-gradient-to-r from-primary via-secondary to-accent text-white hover:shadow-lg hover:shadow-primary/50 transition-all hover:scale-105">Get Started</Link>
                                </>
                            )}
                        </div>
                    </div>

                    <div className="lg:hidden">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="p-2 text-gray-300 hover:text-white transition-colors bg-white/5 rounded-lg"
                            aria-label="Toggle Menu"
                        >
                            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile menu */}
            {isOpen && (
                <div className="lg:hidden glass-dark border-t border-primary/20 absolute top-full left-0 right-0 shadow-2xl animate-in fade-in slide-in-from-top-4 duration-300 z-[100] bg-slate-950 border-b border-white/10 max-h-[calc(100vh-4rem)] overflow-y-auto">
                    <div className="px-4 pt-4 pb-6 space-y-2">
                        <Link href="/" onClick={() => setIsOpen(false)} className="block px-4 py-3 rounded-xl text-lg font-bold text-white hover:bg-white/10 border border-transparent hover:border-primary/20 transition-all">Tool</Link>
                        <Link href="/blog" onClick={() => setIsOpen(false)} className="block px-4 py-3 rounded-xl text-lg font-bold text-white hover:bg-white/10 border border-transparent hover:border-primary/20 transition-all">Blogs</Link>
                        <Link href="/about" onClick={() => setIsOpen(false)} className="block px-4 py-3 rounded-xl text-lg font-bold text-white hover:bg-white/10 border border-transparent hover:border-primary/20 transition-all">About Us</Link>
                        <Link href="/contact" onClick={() => setIsOpen(false)} className="block px-4 py-3 rounded-xl text-lg font-bold text-white hover:bg-white/10 border border-transparent hover:border-primary/20 transition-all">Contact</Link>
                        <div className="pt-4 mt-4 border-t border-white/10 flex flex-col gap-3">
                            {user ? (
                                <>
                                    <div className="flex items-center justify-between px-4 py-3 rounded-xl bg-white/5 border border-white/10">
                                        <span className="text-sm text-gray-400">Current Plan</span>
                                        <div className="flex items-center gap-2">
                                            <Sparkles className="h-3 w-3 text-primary" />
                                            <span className="text-sm font-bold text-primary uppercase">Free Plan</span>
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => { logout(); setIsOpen(false); }}
                                        className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-sm font-medium text-red-400 bg-red-500/10 border border-red-500/20"
                                    >
                                        <LogOut className="h-4 w-4" />
                                        Sign out
                                    </button>
                                </>
                            ) : (
                                <div className="grid grid-cols-2 gap-4">
                                    <Link href="/login" onClick={() => setIsOpen(false)} className="px-4 py-3 rounded-xl text-center text-sm font-medium text-white bg-white/5 border border-white/10">Log in</Link>
                                    <Link href="/signup" onClick={() => setIsOpen(false)} className="px-4 py-3 rounded-xl text-center text-sm font-medium bg-primary text-white">Get Started</Link>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </nav>
    );
}
