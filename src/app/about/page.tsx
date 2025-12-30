"use client";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Users, ShieldCheck, HeartHandshake, CheckCircle2 } from "lucide-react";

export default function AboutPage() {
    return (
        <div className="min-h-screen text-white relative overflow-hidden">
            {/* Navbar handled by layout */}

            <main className="pt-32 pb-20">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

                    {/* Header */}
                    <div className="text-center mb-16 animate-in fade-in slide-in-from-bottom-4 duration-700">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-wider mb-6">
                            <Users className="h-4 w-4" />
                            <span>About Website Spams Check</span>
                        </div>
                        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-6">
                            Built by SEO Pros, <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
                                For SEO Pros
                            </span>
                        </h1>
                    </div>

                    {/* Content Card */}
                    <div className="glass-dark p-8 sm:p-12 rounded-[2.5rem] border border-white/10 shadow-2xl space-y-12 relative overflow-hidden animate-in fade-in slide-in-from-bottom-8 duration-700 delay-150">

                        {/* Blob effects */}
                        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 blur-[80px] rounded-full pointer-events-none" />
                        <div className="absolute bottom-0 left-0 w-64 h-64 bg-secondary/5 blur-[80px] rounded-full pointer-events-none" />

                        {/* Our Story */}
                        <div className="relative z-10">
                            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                                <ShieldCheck className="h-6 w-6 text-primary" />
                                Our Story
                            </h2>
                            <p className="text-gray-300 leading-relaxed text-lg">
                                We made this <strong>Website Spams Checker</strong> because we know the pain. We've seen websites drop in Google rankings from bad links you can't even spot. Sick of expensive tools that limit your checks, we built a free one powered by MOZ that just works.
                            </p>
                            <p className="text-gray-400 mt-4 leading-relaxed">
                                Spent years cleaning spammy profiles for clients. Now, we share the tool that saved our projects—no fluff, just results.
                            </p>
                        </div>

                        <hr className="border-white/5" />

                        {/* What We Do & Promise */}
                        <div className="grid md:grid-cols-2 gap-12 relative z-10">
                            <div>
                                <h3 className="text-xl font-bold text-white mb-4">What We Do</h3>
                                <ul className="space-y-4 text-gray-400">
                                    <li className="flex gap-3">
                                        <div className="h-6 w-6 rounded-full bg-white/5 flex items-center justify-center flex-shrink-0 text-white font-bold text-xs border border-white/10">1</div>
                                        <span>Deliver instant spams score, DA, PA checks.</span>
                                    </li>
                                    <li className="flex gap-3">
                                        <div className="h-6 w-6 rounded-full bg-white/5 flex items-center justify-center flex-shrink-0 text-white font-bold text-xs border border-white/10">2</div>
                                        <span>Flag bad backlinks, toxic signals, spammy anchors.</span>
                                    </li>
                                    <li className="flex gap-3">
                                        <div className="h-6 w-6 rounded-full bg-white/5 flex items-center justify-center flex-shrink-0 text-white font-bold text-xs border border-white/10">3</div>
                                        <span>Help you fix issues before Google penalizes.</span>
                                    </li>
                                </ul>
                            </div>

                            <div>
                                <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                                    <HeartHandshake className="h-5 w-5 text-blue-500" />
                                    Our Promise
                                </h3>
                                <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
                                    <ul className="space-y-3">
                                        <li className="flex items-center gap-3 text-white font-medium">
                                            <CheckCircle2 className="h-5 w-5 text-green-500" />
                                            Free basic checks
                                        </li>
                                        <li className="flex items-center gap-3 text-white font-medium">
                                            <CheckCircle2 className="h-5 w-5 text-green-500" />
                                            Accurate data
                                        </li>
                                        <li className="flex items-center gap-3 text-white font-medium">
                                            <CheckCircle2 className="h-5 w-5 text-green-500" />
                                            Real fixes
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </main>

            {/* Footer handled by layout */}
        </div>
    );
}
