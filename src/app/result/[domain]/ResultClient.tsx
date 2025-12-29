"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Shield, ShieldAlert, ShieldCheck, Activity, Link as LinkIcon, Bot, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

import { useAuth } from "@/contexts/AuthContext";

export default function ResultClient({ domain }: { domain: string }) {
    const { user } = useAuth();
    const [data, setData] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [needsAuth, setNeedsAuth] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch("/api/analyze", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        url: domain,
                        userId: user?.uid
                    }),
                });

                if (res.status === 403) {
                    const json = await res.json();
                    if (json.requiresLogin) {
                        setNeedsAuth(true);
                        return;
                    }
                }

                if (!res.ok) throw new Error("Analysis failed");

                const json = await res.json();
                setData(json);
            } catch (err) {
                setError("Could not analyze this domain. Please ensure it is accessible.");
            } finally {
                setLoading(false);
            }
        };

        if (domain) fetchData();
    }, [domain, user]);

    if (needsAuth) return (
        <div className="min-h-screen flex items-center justify-center p-6">
            <div className="max-w-md w-full glass-dark p-10 rounded-3xl border border-primary/30 text-center shadow-2xl">
                <Shield className="h-16 w-16 text-primary mx-auto mb-6 animate-bounce" />
                <h2 className="text-3xl font-bold text-white mb-4">Limit Reached!</h2>
                <p className="text-gray-400 mb-8 leading-relaxed">
                    You've used your free guest scan for today. Sign up now to get <b>10 FREE credits</b> and unlock deep-scan insights.
                </p>
                <div className="flex flex-col gap-4">
                    <Link href="/signup" className="w-full py-4 rounded-xl bg-gradient-to-r from-primary to-secondary text-white font-bold hover:scale-105 transition-all shadow-lg shadow-primary/30">
                        Get Started Free
                    </Link>
                    <Link href="/login" className="text-gray-500 hover:text-white transition-colors">
                        Already have an account? Log in
                    </Link>
                </div>
            </div>
        </div>
    );

    if (loading) return (
        <div className="min-h-screen flex flex-col items-center justify-center">
            <div className="relative">
                <div className="animate-spin rounded-full h-24 w-24 border-t-2 border-b-2 border-primary"></div>
                <Shield className="h-8 w-8 text-primary absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-pulse" />
            </div>
            <p className="mt-8 text-xl font-medium bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent animate-pulse">
                Auditing Signals & Moz Data...
            </p>
            <p className="mt-2 text-slate-500 text-sm">Powered by SEO Sentinel AI Engine</p>
        </div>
    );

    if (error) return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="text-center p-8 bg-red-50 rounded-xl border border-red-200">
                <ShieldAlert className="h-12 w-12 text-red-500 mx-auto mb-4" />
                <h2 className="text-xl font-bold text-red-700">Scan Failed</h2>
                <p className="text-red-600 mt-2">{error}</p>
                <Link href="/" className="mt-6 inline-block text-red-700 underline">Try Another Domain</Link>
            </div>
        </div>
    );

    const daData = [{ value: data.metrics.da }, { value: 100 - data.metrics.da }];
    const paData = [{ value: data.metrics.pa }, { value: 100 - data.metrics.pa }];
    const spamData = [{ value: data.metrics.spamScore }, { value: 100 - data.metrics.spamScore }];
    const COLORS = { da: ["#06b6d4", "#1e293b"], pa: ["#a855f7", "#1e293b"], spam: ["#ef4444", "#1e293b"] };

    return (
        <div className="max-w-7xl mx-auto px-4 py-6 sm:py-10 lg:px-8">
            <Link href="/" className="inline-flex items-center text-slate-500 hover:text-primary mb-6 transition-colors">
                <ArrowLeft className="h-4 w-4 mr-2" /> Back to Search
            </Link>

            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
                <div>
                    <h1 className="text-2xl sm:text-3xl font-bold text-white break-all">{data.domain}</h1>
                    <p className="text-slate-400 text-sm mt-1 flex items-center gap-2">
                        <Activity className="h-3 w-3" /> Audit completed just now
                    </p>
                </div>
                <div className="flex gap-2 w-full sm:w-auto">
                    <span className="px-4 py-1.5 bg-green-500/10 text-green-400 border border-green-500/20 rounded-full text-xs font-bold uppercase tracking-wider flex items-center">
                        <ShieldCheck className="h-4 w-4 mr-1.5" /> Verified
                    </span>
                </div>
            </div>

            {/* Metrics Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-12">
                {/* DA Card */}
                <MetricCard title="Domain Authority" value={data.metrics.da} label="Broad Strength">
                    <div className="h-24 w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie data={daData} dataKey="value" innerRadius={18} outerRadius={30} startAngle={180} endAngle={0}>
                                    {daData.map((entry, index) => <Cell key={index} fill={COLORS.da[index]} />)}
                                </Pie>
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </MetricCard>

                {/* Spam Score Card */}
                <MetricCard title="Spam Score" value={`${data.metrics.spamScore}%`} label="Risk Level" color={data.metrics.spamScore > 30 ? "text-red-500" : "text-green-500"}>
                    <div className="h-24 w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie data={spamData} dataKey="value" innerRadius={18} outerRadius={30} startAngle={180} endAngle={0}>
                                    {spamData.map((entry, index) => <Cell key={index} fill={COLORS.spam[index]} />)}
                                </Pie>
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </MetricCard>

                {/* Page Authority Card */}
                <MetricCard title="Page Authority" value={data.metrics.pa} label="Page Strength" className="sm:col-span-2 lg:col-span-1">
                    <div className="h-24 w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie data={paData} dataKey="value" innerRadius={18} outerRadius={30} startAngle={180} endAngle={0}>
                                    {paData.map((entry: any, index: any) => <Cell key={index} fill={COLORS.pa[index]} />)}
                                </Pie>
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </MetricCard>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* AI Insight Sidebar */}
                <div className="lg:col-span-1 order-2 lg:order-1">
                    <div className="bg-gradient-to-br from-slate-900 to-indigo-950 p-6 sm:p-8 rounded-3xl shadow-2xl border border-white/5 relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 blur-3xl rounded-full"></div>
                        <div className="flex items-center gap-3 mb-6">
                            <div className="p-2 bg-primary/20 rounded-lg">
                                <Bot className="h-6 w-6 text-primary" />
                            </div>
                            <h3 className="font-bold text-lg text-white">AI Consultant</h3>
                        </div>
                        <p className="text-slate-300 leading-relaxed italic text-base sm:text-lg mb-6">
                            "{data.insight}"
                        </p>
                        <div className="pt-6 border-t border-white/10 flex justify-between items-center text-[10px] font-bold tracking-widest text-slate-500 uppercase">
                            <span>Analysis Engine</span>
                            <span>v1.0.4 - SENTINEL</span>
                        </div>
                    </div>
                </div>

                {/* Signal Matrix */}
                <div className="lg:col-span-2 order-1 lg:order-2 overflow-hidden">
                    <div className="bg-slate-900/50 rounded-3xl border border-white/5 overflow-hidden">
                        <div className="px-6 py-5 border-b border-white/5 flex items-center justify-between">
                            <h3 className="font-bold text-white flex items-center gap-2">
                                <Activity className="h-4 w-4 text-primary" /> Signal Analysis
                            </h3>
                            <span className="text-[10px] font-bold text-slate-500 uppercase">Technical Verification</span>
                        </div>
                        <div className="overflow-x-auto scrollbar-hide">
                            <table className="min-w-full divide-y divide-white/5">
                                <thead className="bg-white/5">
                                    <tr>
                                        <th className="px-6 py-4 text-left text-[10px] font-bold text-slate-400 uppercase tracking-widest">Signal</th>
                                        <th className="px-6 py-4 text-left text-[10px] font-bold text-slate-400 uppercase tracking-widest">Status</th>
                                        <th className="px-6 py-4 text-left text-[10px] font-bold text-slate-400 uppercase tracking-widest hidden sm:table-cell">Findings</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-white/5">
                                    {data.signals.map((signal: any) => (
                                        <tr key={signal.id} className="hover:bg-white/5 transition-colors group">
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className="text-sm font-bold text-white group-hover:text-primary transition-colors">{signal.name}</span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                {signal.detected ? (
                                                    <span className="inline-flex items-center px-2.5 py-1 rounded-lg text-[10px] font-bold bg-red-500/10 text-red-500 border border-red-500/20 uppercase tracking-wider">
                                                        <ShieldAlert className="h-3 w-3 mr-1.5" /> FAILED
                                                    </span>
                                                ) : (
                                                    <span className="inline-flex items-center px-2.5 py-1 rounded-lg text-[10px] font-bold bg-green-500/10 text-green-500 border border-green-500/20 uppercase tracking-wider">
                                                        <ShieldCheck className="h-3 w-3 mr-1.5" /> PASSED
                                                    </span>
                                                )}
                                            </td>
                                            <td className="px-6 py-4 hidden sm:table-cell">
                                                <p className="text-sm text-slate-400 leading-relaxed font-medium">{signal.description}</p>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function MetricCard({ title, value, label, children, color = "text-slate-900 dark:text-white" }: any) {
    return (
        <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm relative overflow-hidden">
            <div className="flex justify-between items-start mb-2">
                <div className="flex items-center gap-2 text-slate-500">
                    <Activity className="h-5 w-5" />
                    <h3 className="font-medium uppercase tracking-wide text-xs">{title}</h3>
                </div>
            </div>

            <div className="flex items-center justify-between">
                <div>
                    <p className={`text-4xl font-extrabold ${color} mt-2`}>{value}</p>
                    <p className="text-sm text-slate-400 mt-2">{label}</p>
                </div>
                <div className="w-24 h-24 absolute right-4 top-4 opacity-50">
                    {children}
                </div>
            </div>
        </div>
    );
}
