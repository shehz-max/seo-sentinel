"use client";

import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Navbar from "@/components/layout/Navbar";
import FileUploader from "@/components/bulk/FileUploader";
import BulkResultsTable from "@/components/bulk/BulkResultsTable";
import { Loader2, Layers, ShieldAlert, Sparkles, ArrowRight } from "lucide-react";
import { auth } from "@/lib/firebase";

export default function BulkAnalyzePage() {
    const { user, loading: authLoading, canCheckBulk, remainingBulkDomains } = useAuth();
    const router = useRouter();

    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [progress, setProgress] = useState({ current: 0, total: 0 });
    const [results, setResults] = useState<any[] | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [domains, setDomains] = useState<string[]>([]);

    // Auth Guard
    useEffect(() => {
        if (!authLoading && !user) {
            router.push("/login?redirect=/bulk");
        }
    }, [user, authLoading, router]);

    const handleDomainsExtracted = (extractedDomains: string[]) => {
        setDomains(extractedDomains);
        setResults(null);
        setError(null);
        setProgress({ current: 0, total: 0 });
    };

    const runAnalysis = async () => {
        if (domains.length === 0) return;

        if (!canCheckBulk(domains.length)) {
            setError(`Daily limit reached. You can check ${remainingBulkDomains()} more domains today.`);
            return;
        }

        setIsAnalyzing(true);
        setError(null);
        setResults([]);
        setProgress({ current: 0, total: domains.length });

        const BATCH_SIZE = 10;
        const allResults: any[] = [];
        let hasError = false;

        try {
            // Client-side Queue Processing
            for (let i = 0; i < domains.length; i += BATCH_SIZE) {
                const batch = domains.slice(i, i + BATCH_SIZE);

                try {
                    const response = await fetch("/api/bulk-analyze", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({
                            urls: batch,
                            userId: user?.uid
                        }),
                    });

                    const data = await response.json();

                    if (!response.ok) {
                        throw new Error(data.error || "Batch analysis failed");
                    }

                    if (data.results) {
                        allResults.push(...data.results);
                        setResults(prev => [...(prev || []), ...data.results]);
                    }
                } catch (batchErr) {
                    console.error("Batch failed:", batchErr);
                    hasError = true;
                    // Add placeholders for failed domains in this batch so user knows
                    const failedPlaceholders = batch.map(d => ({
                        domain: d,
                        status: "failed",
                        error: "Analysis failed"
                    }));
                    allResults.push(...failedPlaceholders);
                    setResults(prev => [...(prev || []), ...failedPlaceholders]);
                }

                // Update Progress
                setProgress(prev => ({ ...prev, current: Math.min(prev.total, i + BATCH_SIZE) }));
            }

            if (hasError) {
                setError("Some domains failed to analyze. Please check the results.");
            }

        } catch (err) {
            setError(err instanceof Error ? err.message : "Something went wrong");
        } finally {
            setIsAnalyzing(false);
        }
    };

    if (authLoading) {
        return (
            <div className="min-h-screen bg-[#020617] flex items-center justify-center">
                <Loader2 className="h-8 w-8 text-primary animate-spin" />
            </div>
        );
    }

    // Strict Render Guard
    if (!user) {
        return null;
    }

    return (
        <div className="min-h-screen selection:bg-primary/20 selection:text-white relative overflow-hidden">
            {/* Header Gradient Line */}
            <div className="fixed top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent pointer-events-none" />

            <Navbar />

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32 relative z-10">

                {/* Header */}
                <div className="text-center max-w-3xl mx-auto mb-16 animate-in fade-in slide-in-from-bottom-4 duration-700">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-wider mb-6">
                        <Layers className="h-4 w-4" />
                        <span>Professional Tools</span>
                    </div>
                    <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white mb-6 tracking-tight leading-tight">
                        Bulk Website <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
                            Analyzer
                        </span>
                    </h1>
                    <p className="text-lg text-gray-400 mb-8 max-w-2xl mx-auto leading-relaxed">
                        Upload up to 50 domains. We'll analyze them with our 27-point inspection system.
                    </p>

                    <div className="inline-flex items-center gap-3 px-5 py-2.5 bg-white/5 backdrop-blur-md rounded-xl border border-white/10 text-sm text-gray-300 shadow-xl shadow-black/20">
                        <div className={`h-2 w-2 rounded-full ${remainingBulkDomains() > 0 ? "bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.5)]" : "bg-red-500"}`} />
                        <span className="font-mono font-bold text-white">
                            {remainingBulkDomains()} / 50
                        </span>
                        <span className="text-gray-400">domains remaining today</span>
                    </div>
                </div>

                <div className="max-w-4xl mx-auto animate-in fade-in slide-in-from-bottom-8 duration-700 delay-150">
                    {/* Main Card */}
                    <div className="glass-dark rounded-[2rem] p-6 sm:p-12 border border-white/10 shadow-2xl relative overflow-hidden group">
                        {/* Internal gradients for depth */}
                        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 blur-[120px] rounded-full pointer-events-none group-hover:bg-primary/10 transition-colors duration-1000" />
                        <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary/5 blur-[120px] rounded-full pointer-events-none group-hover:bg-secondary/10 transition-colors duration-1000" />

                        {/* Content */}
                        <div className="relative z-10 space-y-10">

                            {/* Input Section - Hide only if we have results AND we are done analyzing? 
                                Actually, dragging/dropping new files should clear results.
                                Let's keep input visible but disabled during analysis? 
                                Or simpler: Show Input if results are null.
                            */}
                            {(!results || isAnalyzing) && (
                                <>
                                    <div className={`bg-[#020617]/40 rounded-2xl border border-white/5 p-2 backdrop-blur-sm transition-opacity duration-500 ${isAnalyzing ? 'opacity-50 pointer-events-none' : ''}`}>
                                        <FileUploader
                                            onDomainsExtracted={handleDomainsExtracted}
                                            maxDomains={50}
                                        />
                                    </div>

                                    {(domains.length > 0 || isAnalyzing) && (
                                        <div className="flex flex-col items-center justify-center animate-in fade-in slide-in-from-bottom-4 space-y-6">
                                            <button
                                                onClick={runAnalysis}
                                                disabled={isAnalyzing}
                                                className="group relative px-8 py-4 bg-gradient-to-r from-primary to-primary-dark hover:scale-[1.02] active:scale-95 text-white rounded-xl font-bold text-lg transition-all shadow-lg shadow-primary/25 disabled:opacity-100 disabled:cursor-not-allowed w-full sm:w-auto flex items-center gap-3 overflow-hidden"
                                            >
                                                <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 skew-x-12" />
                                                {isAnalyzing ? (
                                                    <>
                                                        <Loader2 className="h-5 w-5 animate-spin" />
                                                        <span>Analyzing Batch... ({progress.current}/{progress.total})</span>
                                                    </>
                                                ) : (
                                                    <>
                                                        <Sparkles className="h-5 w-5" />
                                                        <span>Analyze {domains.length} Domains</span>
                                                        <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                                                    </>
                                                )}
                                            </button>

                                            {/* Progress Bar - Only visible during analysis */}
                                            {isAnalyzing && (
                                                <div className="w-full max-w-md space-y-2">
                                                    <div className="flex justify-between text-xs text-gray-400 font-mono">
                                                        <span>Processing...</span>
                                                        <span>{Math.round((progress.current / progress.total) * 100)}%</span>
                                                    </div>
                                                    <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                                                        <div
                                                            className="h-full bg-gradient-to-r from-primary to-secondary transition-all duration-500 ease-out"
                                                            style={{ width: `${(progress.current / progress.total) * 100}%` }}
                                                        />
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    )}
                                </>
                            )}

                            {error && (
                                <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl flex items-center gap-3 text-red-300 animate-in fade-in">
                                    <ShieldAlert className="h-5 w-5 text-red-400" />
                                    <p className="font-medium">{error}</p>
                                </div>
                            )}

                            {/* Show results if we have them, even if still analyzing (streaming effect), 
                                OR if analysis is done. 
                                We probably want to switch to FULL results view only when done? 
                                User said "weird screen".
                                Let's show results table BELOW the progress bar if items exist.
                            */}
                            {results && results.length > 0 && (
                                <div className="space-y-8 animate-in fade-in slide-in-from-bottom-8">
                                    <BulkResultsTable results={results} />

                                    {!isAnalyzing && (
                                        <div className="flex justify-center pt-8 border-t border-white/10">
                                            <button
                                                onClick={() => { setResults(null); setDomains([]); }}
                                                className="px-6 py-2 bg-white/5 hover:bg-white/10 text-white rounded-lg font-medium transition-colors flex items-center gap-2"
                                            >
                                                <Layers className="h-4 w-4" />
                                                Analyze New Batch
                                            </button>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
