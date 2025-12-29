"use client";

import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Activity, LogOut, User as UserIcon, ShieldCheck, Zap, History, Settings, CreditCard } from "lucide-react";
import Link from "next/link";

export default function Dashboard() {
    const { user, userData, loading, logout } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!loading && !user) {
            router.push("/login");
        }
    }, [user, loading, router]);

    if (loading) return (
        <div className="min-h-screen flex items-center justify-center bg-slate-950">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
    );

    return (
        <div className="min-h-screen bg-slate-950 pt-12 pb-24">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Header / Profile Section */}
                <div className="relative mb-8 sm:mb-12">
                    <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20 blur-3xl rounded-full opacity-50"></div>
                    <div className="relative glass-dark p-6 sm:p-8 rounded-3xl border border-white/10 flex flex-col items-center sm:flex-row sm:justify-between gap-6 shadow-2xl text-center sm:text-left">
                        <div className="flex flex-col sm:flex-row items-center gap-6">
                            <div className="relative">
                                <div className="h-20 w-20 sm:h-24 sm:w-24 rounded-2xl bg-gradient-to-br from-primary to-secondary p-[2px]">
                                    <div className="h-full w-full rounded-2xl bg-slate-900 flex items-center justify-center overflow-hidden">
                                        {user?.photoURL ? (
                                            <img src={user.photoURL} alt="Profile" className="h-full w-full object-cover" />
                                        ) : (
                                            <UserIcon className="h-10 w-10 text-white/50" />
                                        )}
                                    </div>
                                </div>
                                <div className="absolute -bottom-1 -right-1 bg-green-500 h-5 w-5 sm:h-6 sm:w-6 rounded-full border-4 border-slate-900 shadow-lg"></div>
                            </div>
                            <div>
                                <h1 className="text-2xl sm:text-3xl font-bold text-white flex items-center justify-center sm:justify-start gap-2">
                                    Hey, {user?.displayName?.split(' ')[0] || "Explorer"}! <Zap className="h-5 w-5 sm:h-6 sm:w-6 text-yellow-400 fill-yellow-400" />
                                </h1>
                                <p className="text-gray-400 text-sm sm:text-base flex flex-col sm:flex-row items-center gap-1 sm:gap-2 mt-1">
                                    <span className="truncate max-w-[200px] sm:max-w-none">{user?.email}</span>
                                    <span className="hidden sm:inline">•</span>
                                    <span className="text-primary font-bold uppercase text-[10px] tracking-widest bg-primary/10 px-2 py-0.5 rounded-md">{userData?.plan || "Free"} Member</span>
                                </p>
                            </div>
                        </div>
                        <div className="flex gap-3 w-full sm:w-auto">
                            <button onClick={logout} className="w-full sm:w-auto px-6 py-2.5 rounded-xl border border-red-500/30 bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-all flex items-center justify-center gap-2 text-sm font-bold">
                                <LogOut className="h-4 w-4" /> Sign Out
                            </button>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 sm:gap-8">
                    {/* Stats Panel */}
                    <div className="lg:col-span-1 space-y-6">
                        {/* Credits Card */}
                        <div className="glass-dark p-6 rounded-2xl border border-primary/20 bg-gradient-to-br from-primary/5 to-transparent relative overflow-hidden group">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 blur-3xl rounded-full -mr-16 -mt-16 group-hover:bg-primary/30 transition-all"></div>
                            <div className="flex items-center justify-between mb-4">
                                <div className="p-2 bg-primary/10 rounded-lg">
                                    <CreditCard className="h-5 w-5 text-primary" />
                                </div>
                                <span className="text-[10px] font-bold text-primary tracking-widest uppercase">Credits</span>
                            </div>
                            <h3 className="text-4xl font-black text-white mb-1">
                                {userData?.credits ?? "0"}
                            </h3>
                            <p className="text-gray-400 text-xs">Available for analysis</p>
                            <div className="mt-6 pt-6 border-t border-white/5 opacity-50 pointer-events-none grayscale">
                                <button className="w-full py-3 rounded-xl bg-white/5 border border-white/5 text-gray-500 font-bold text-xs">
                                    Top Up (Coming Soon)
                                </button>
                            </div>
                        </div>

                        {/* Plan Card */}
                        <div className="glass-dark p-6 rounded-2xl border border-white/5">
                            <div className="flex items-center gap-3 text-secondary mb-4">
                                <div className="p-2 bg-secondary/10 rounded-lg">
                                    <ShieldCheck className="h-5 w-5 text-secondary" />
                                </div>
                                <span className="text-[10px] font-bold tracking-widest uppercase">Active Plan</span>
                            </div>
                            <h4 className="text-xl font-bold text-white mb-1">{userData?.plan || "Free"}</h4>
                            <p className="text-gray-400 text-[10px] leading-relaxed uppercase tracking-tight">Access to deep-scans enabled</p>
                        </div>
                    </div>

                    {/* Main Content Area */}
                    <div className="lg:col-span-3 space-y-6 sm:gap-8">
                        {/* Summary Grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                            <div className="glass-dark p-6 sm:p-8 rounded-2xl border border-white/5 flex items-center gap-6">
                                <div className="h-12 w-12 sm:h-14 sm:w-14 rounded-xl bg-blue-500/10 flex items-center justify-center flex-shrink-0">
                                    <Activity className="h-6 w-6 sm:h-8 sm:w-8 text-blue-500" />
                                </div>
                                <div>
                                    <p className="text-2xl sm:text-3xl font-bold text-white leading-none mb-1">{userData?.totalChecks || 0}</p>
                                    <p className="text-gray-500 text-xs font-bold uppercase tracking-widest">Audits</p>
                                </div>
                            </div>
                            <div className="glass-dark p-6 sm:p-8 rounded-2xl border border-white/5 flex items-center gap-6">
                                <div className="h-12 w-12 sm:h-14 sm:w-14 rounded-xl bg-purple-500/10 flex items-center justify-center flex-shrink-0">
                                    <CreditCard className="h-6 w-6 sm:h-8 sm:w-8 text-purple-500" />
                                </div>
                                <div>
                                    <p className="text-2xl sm:text-3xl font-bold text-white leading-none mb-1">
                                        {userData?.credits || 0}
                                    </p>
                                    <p className="text-gray-500 text-xs font-bold uppercase tracking-widest">Credits Left</p>
                                </div>
                            </div>
                        </div>

                        {/* Recent Activity */}
                        <div className="glass-dark rounded-3xl border border-white/5 overflow-hidden shadow-xl">
                            <div className="px-6 sm:px-8 py-5 sm:py-6 border-b border-white/5 flex justify-between items-center bg-white/2">
                                <h3 className="text-sm sm:text-lg font-bold text-white flex items-center gap-3">
                                    <History className="h-4 w-4 sm:h-5 sm:w-5 text-gray-500" /> Recent Activity
                                </h3>
                                <Link href="/" className="text-xs font-bold text-primary hover:underline uppercase tracking-widest">New</Link>
                            </div>
                            <div className="p-10 sm:p-12 text-center text-gray-500">
                                <div className="bg-white/5 h-16 w-16 sm:h-20 sm:w-20 rounded-full flex items-center justify-center mx-auto mb-6">
                                    <Activity className="h-8 w-8 sm:h-10 sm:w-10 opacity-20" />
                                </div>
                                <h4 className="text-base sm:text-lg font-bold text-white mb-2">History Tracking Coming Soon</h4>
                                <p className="max-w-xs mx-auto text-xs sm:text-sm leading-relaxed text-gray-400">
                                    We are building a comprehensive audit history system. Currently, your results are available immediately after scan.
                                </p>
                                <Link href="/" className="mt-8 inline-block px-8 py-3 rounded-xl bg-white/5 hover:bg-white/10 text-white font-bold text-sm transition-all border border-white/10">
                                    Start New Scan
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
