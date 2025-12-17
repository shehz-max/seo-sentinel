"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Shield, ShieldAlert, ShieldCheck, Activity, Link as LinkIcon, Bot, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

export default function ResultClient({ domain }: { domain: string }) {
    const [data, setData] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch("/api/analyze", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ url: domain }),
                });

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
    }, [domain]);

    if (loading) return (
        <div className="min-h-screen flex flex-col items-center justify-center">
            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-primary"></div>
            <p className="mt-4 text-slate-500 animate-pulse">Scanning HTML & Fetching Moz Data...</p>
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
        <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
            <Link href="/" className="inline-flex items-center text-slate-500 hover:text-primary mb-6">
                <ArrowLeft className="h-4 w-4 mr-1" /> Back to Search
            </Link>

            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900 dark:text-white capitalize">{data.domain}</h1>
                    <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">Audit completed just now</p>
                </div>
                <div className="mt-4 md:mt-0 flex gap-2">
                    <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium flex items-center">
                        <ShieldCheck className="h-4 w-4 mr-1" /> Verified Authority
                    </span>
                </div>
            </div>

            {/* Gauges */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                {/* DA Card */}
                <MetricCard title="Domain Authority" value={data.metrics.da} label="Broad Strength">
                    <div className="h-32 w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie data={daData} dataKey="value" innerRadius={25} outerRadius={40} startAngle={180} endAngle={0}>
                                    {daData.map((entry, index) => <Cell key={index} fill={COLORS.da[index]} />)}
                                </Pie>
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </MetricCard>

                {/* Spam Score Card */}
                <MetricCard title="Spam Score" value={`${data.metrics.spamScore}%`} label="Risk Level" color={data.metrics.spamScore > 30 ? "text-red-600" : "text-green-600"}>
                    <div className="h-32 w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie data={spamData} dataKey="value" innerRadius={25} outerRadius={40} startAngle={180} endAngle={0}>
                                    {spamData.map((entry, index) => <Cell key={index} fill={COLORS.spam[index]} />)}
                                </Pie>
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </MetricCard>

                {/* Page Authority Card (Replaces Backlinks) */}
                <MetricCard title="Page Authority" value={data.metrics.pa} label="Page Strength">
                    <div className="h-32 w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie data={paData} dataKey="value" innerRadius={25} outerRadius={40} startAngle={180} endAngle={0}>
                                    {paData.map((entry: any, index: any) => <Cell key={index} fill={COLORS.pa[index]} />)}
                                </Pie>
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </MetricCard>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* AI Insight Sidebar */}
                <div className="lg:col-span-1">
                    <div className="bg-gradient-to-br from-indigo-900 to-slate-900 text-white p-6 rounded-xl shadow-xl border border-indigo-700/50">
                        <div className="flex items-center gap-2 mb-4">
                            <Bot className="h-6 w-6 text-yellow-400" />
                            <h3 className="font-bold text-lg">AI Consultant</h3>
                        </div>
                        <p className="text-indigo-100 leading-relaxed italic">
                            "{data.insight}"
                        </p>
                        <p className="text-xs text-indigo-300 font-mono">MODEL: GROQ-LLAMA-3.3</p>
                    </div>
                </div>

                {/* The Matrix (Signal Table) */}
                <div className="lg:col-span-2">
                    <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden">
                        <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-u-slate-900/50">
                            <h3 className="font-bold text-slate-900 dark:text-white">Signal Analysis Matrix</h3>
                        </div>
                        <table className="min-w-full divide-y divide-slate-200 dark:divide-slate-800">
                            <thead className="bg-slate-50 dark:bg-slate-800">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Signal Name</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Status</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider hidden sm:table-cell">Details</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white dark:bg-slate-900 divide-y divide-slate-200 dark:divide-slate-800">
                                {data.signals.map((signal: any) => (
                                    <tr key={signal.id}>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-900 dark:text-white">
                                            {signal.name}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                                            {signal.detected ? (
                                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                                                    <ShieldAlert className="h-3 w-3 mr-1" /> FAILED
                                                </span>
                                            ) : (
                                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                                    <ShieldCheck className="h-3 w-3 mr-1" /> PASSED
                                                </span>
                                            )}
                                        </td>
                                        <td className="px-6 py-4 text-sm text-slate-500 dark:text-slate-400 hidden sm:table-cell">
                                            {signal.description}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
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
