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
                <div className="flex justify-between items-center h-16">
                    <div className="flex-shrink-0 flex items-center">
                        <Link href="/" className="flex items-center gap-2 group">
                            <div className="relative">
                                <ShieldCheck className="h-8 w-8 text-primary transition-all group-hover:scale-110 group-hover:rotate-6" />
                                <Sparkles className="h-3 w-3 text-secondary absolute -top-1 -right-1 animate-pulse" />
                            </div>
                            <span className="font-bold text-xl tracking-tight">
                                <span className="text-white">SEO</span>
                                <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Sentinel</span>
                            </span>
                        </Link>
                    </div>

                    <div className="hidden md:block">
                        <div className="ml-10 flex items-baseline space-x-1">
                            <Link href="/" className="px-4 py-2 rounded-lg text-sm font-medium text-gray-300 hover:text-white hover:bg-white/5 transition-all">Tool</Link>
                            <Link href="/blog" className="px-4 py-2 rounded-lg text-sm font-medium text-gray-300 hover:text-white hover:bg-white/5 transition-all">Blogs</Link>
                            <Link href="/about" className="px-4 py-2 rounded-lg text-sm font-medium text-gray-300 hover:text-white hover:bg-white/5 transition-all">About Us</Link>
                            <Link href="/contact" className="px-4 py-2 rounded-lg text-sm font-medium text-gray-300 hover:text-white hover:bg-white/5 transition-all">Contact</Link>
                            <Link href="/login" className="ml-4 px-4 py-2 rounded-lg text-sm font-medium text-gray-300 hover:bg-slate-800/50 transition-all">Log in</Link>
                            <Link href="/signup" className="px-5 py-2 rounded-lg text-sm font-medium bg-gradient-to-r from-primary via-secondary to-accent text-white hover:shadow-lg hover:shadow-primary/50 transition-all hover:scale-105">Get Started</Link>
                        </div>
                    </div>

                    <div className="md:hidden">
                        <button onClick={() => setIsOpen(!isOpen)} className="text-gray-300 hover:text-white transition-colors">
                            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile menu */}
            {isOpen && (
                <div className="md:hidden glass-dark border-t border-primary/20">
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                        <Link href="/" className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-white/5">Tool</Link>
                        <Link href="/blog" className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-white/5">Blogs</Link>
                        <Link href="/about" className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-white/5">About Us</Link>
                        <Link href="/contact" className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-white/5">Contact</Link>
                        <Link href="/login" className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:bg-slate-800/50">Log in</Link>
                        <Link href="/signup" className="block w-full text-center mt-4 px-4 py-2 rounded-lg text-base font-medium bg-gradient-to-r from-primary to-secondary text-white hover:shadow-lg hover:shadow-primary/50">Get Started</Link>
                    </div>
                </div>
            )}
        </nav>
    );
}
