"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Menu, X, ShieldCheck, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

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
                "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
                isScrolled
                    ? "glass-dark shadow-lg shadow-primary/10 border-b border-primary/20"
                    : "bg-transparent"
            )}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16 md:h-20">
                    <div className="flex-shrink-0 flex items-center">
                        <Link href="/" className="flex items-center gap-2 group">
                            <div className="relative">
                                <ShieldCheck className="h-7 w-7 md:h-8 md:h-8 text-primary transition-all group-hover:scale-110" />
                                <Sparkles className="h-2.5 w-2.5 text-secondary absolute -top-1 -right-1 animate-pulse" />
                            </div>
                            <span className="font-bold text-lg md:text-xl tracking-tight">
                                <span className="text-white">SEO</span>
                                <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Sentinel</span>
                            </span>
                        </Link>
                    </div>

                    <div className="hidden lg:block">
                        <div className="ml-10 flex items-baseline space-x-1">
                            <Link href="/" className="px-4 py-2 rounded-lg text-sm font-medium text-gray-300 hover:text-white transition-all">Tool</Link>
                            <Link href="/blog" className="px-4 py-2 rounded-lg text-sm font-medium text-gray-300 hover:text-white transition-all">Blogs</Link>
                            <Link href="/about" className="px-4 py-2 rounded-lg text-sm font-medium text-gray-300 hover:text-white transition-all">About</Link>
                            <Link href="/contact" className="px-4 py-2 rounded-lg text-sm font-medium text-gray-300 hover:text-white transition-all">Contact</Link>
                            <Link href="/login" className="ml-4 px-4 py-2 rounded-lg text-sm font-medium text-gray-300 hover:bg-slate-800/50 transition-all">Log in</Link>
                            <Link href="/signup" className="px-5 py-2 rounded-lg text-sm font-medium bg-gradient-to-r from-primary via-secondary to-accent text-white hover:shadow-lg hover:shadow-primary/50 transition-all hover:scale-105">Get Started</Link>
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
                <div className="lg:hidden glass-dark border-t border-primary/20 absolute top-full left-0 right-0 shadow-2xl animate-in fade-in slide-in-from-top-4 duration-300">
                    <div className="px-4 pt-4 pb-6 space-y-2">
                        <Link href="/" onClick={() => setIsOpen(false)} className="block px-4 py-3 rounded-xl text-base font-medium text-gray-300 hover:text-white hover:bg-white/5 border border-transparent hover:border-primary/20">Tool</Link>
                        <Link href="/blog" onClick={() => setIsOpen(false)} className="block px-4 py-3 rounded-xl text-base font-medium text-gray-300 hover:text-white hover:bg-white/5 border border-transparent hover:border-primary/20">Blogs</Link>
                        <Link href="/about" onClick={() => setIsOpen(false)} className="block px-4 py-3 rounded-xl text-base font-medium text-gray-300 hover:text-white hover:bg-white/5 border border-transparent hover:border-primary/20">About Us</Link>
                        <Link href="/contact" onClick={() => setIsOpen(false)} className="block px-4 py-3 rounded-xl text-base font-medium text-gray-300 hover:text-white hover:bg-white/5 border border-transparent hover:border-primary/20">Contact</Link>
                        <div className="pt-4 mt-4 border-t border-white/10 grid grid-cols-2 gap-4">
                            <Link href="/login" onClick={() => setIsOpen(false)} className="px-4 py-3 rounded-xl text-center text-sm font-medium text-white bg-white/5 border border-white/10">Log in</Link>
                            <Link href="/signup" onClick={() => setIsOpen(false)} className="px-4 py-3 rounded-xl text-center text-sm font-medium bg-primary text-white">Get Started</Link>
                        </div>
                    </div>
                </div>
            )}
        </nav>
    );
}
