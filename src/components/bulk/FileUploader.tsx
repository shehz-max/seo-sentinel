"use client";

import { useState, useCallback } from "react";
import { Upload, FileText, AlertCircle, X, Clipboard, FileSpreadsheet } from "lucide-react";
import { cn } from "@/lib/utils";

interface FileUploaderProps {
    onDomainsExtracted: (domains: string[]) => void;
    maxDomains?: number;
}

export default function FileUploader({ onDomainsExtracted, maxDomains = 10 }: FileUploaderProps) {
    const [dragActive, setDragActive] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [fileName, setFileName] = useState<string | null>(null);
    const [manualInput, setManualInput] = useState("");
    const [mode, setMode] = useState<"manual" | "file">("manual");

    const processContent = useCallback((content: string) => {
        const rawDomains = content.split(/[\n,,\s]+/).map(d => d.trim()).filter(d => d.length > 0);

        // Basic domain validation regex (simplified)
        // Relaxed regex: Allows anything with a dot in the middle, no spaces
        // This covers subdomains, new TLDs, and international domains better
        const domainRegex = /^[^\s]+\.[^\s]+$/;
        const validDomains = rawDomains.filter(d => d.includes(".") && !d.includes(" "));

        if (validDomains.length === 0) {
            setError("No valid domains detected. Please check your format.");
            return;
        }

        if (validDomains.length > maxDomains) {
            setError(`Limit exceeded: ${validDomains.length} domains found. Max allowed is ${maxDomains} per batch.`);
            return;
        }

        setError(null);
        onDomainsExtracted(validDomains);
    }, [maxDomains, onDomainsExtracted]);

    const handleFile = (file: File) => {
        if (!file.name.endsWith(".csv") && !file.name.endsWith(".txt")) {
            setError("Please upload a .csv or .txt file");
            return;
        }

        setFileName(file.name);
        const reader = new FileReader();
        reader.onload = (e) => {
            const text = e.target?.result as string;
            processContent(text);
        };
        reader.readAsText(file);
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            handleFile(e.dataTransfer.files[0]);
        }
    };

    const handleManualSubmit = () => {
        processContent(manualInput);
    };

    return (
        <div className="w-full space-y-8">
            {/* Mode Switcher */}
            <div className="flex justify-center">
                <div className="inline-flex p-1 bg-black/20 border border-white/5 rounded-xl backdrop-blur-md">
                    <button
                        onClick={() => { setMode("manual"); setError(null); }}
                        className={cn(
                            "flex items-center gap-2 px-6 py-2.5 rounded-lg text-sm font-medium transition-all duration-300",
                            mode === "manual"
                                ? "bg-primary/20 text-primary shadow-[0_0_20px_-5px_rgba(6,182,212,0.3)] ring-1 ring-primary/30"
                                : "text-gray-400 hover:text-white hover:bg-white/5"
                        )}
                    >
                        <Clipboard className="h-4 w-4" />
                        Paste List
                    </button>
                    <button
                        onClick={() => { setMode("file"); setError(null); }}
                        className={cn(
                            "flex items-center gap-2 px-6 py-2.5 rounded-lg text-sm font-medium transition-all duration-300",
                            mode === "file"
                                ? "bg-primary/20 text-primary shadow-[0_0_20px_-5px_rgba(6,182,212,0.3)] ring-1 ring-primary/30"
                                : "text-gray-400 hover:text-white hover:bg-white/5"
                        )}
                    >
                        <FileSpreadsheet className="h-4 w-4" />
                        Upload CSV
                    </button>
                </div>
            </div>

            {mode === "manual" ? (
                <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2">
                    <div className="relative group">
                        <div className="absolute -inset-0.5 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-xl blur opacity-20 group-hover:opacity-40 transition duration-500"></div>
                        <div className="relative">
                            <textarea
                                value={manualInput}
                                onChange={(e) => setManualInput(e.target.value)}
                                placeholder="example.com&#10;google.com&#10;test.co.uk"
                                className="w-full h-56 bg-[#0B0F19]/80 border border-white/10 rounded-xl p-5 text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/30 resize-none font-mono text-sm leading-relaxed transition-all shadow-inner"
                            />
                            <div className="absolute bottom-4 right-4 px-2 py-1 bg-black/40 rounded-md border border-white/5 text-xs text-gray-400 font-mono">
                                {manualInput.split(/\n/).filter(x => x.trim()).length} / {maxDomains}
                            </div>
                        </div>
                    </div>

                    <button
                        onClick={handleManualSubmit}
                        disabled={!manualInput.trim()}
                        className="w-full py-4 bg-gradient-to-r from-primary/10 to-secondary/10 hover:from-primary/20 hover:to-secondary/20 border border-white/10 hover:border-primary/30 text-white rounded-xl font-bold transition-all disabled:opacity-50 disabled:cursor-not-allowed group relative overflow-hidden"
                    >
                        <span className="relative z-10 flex items-center justify-center gap-2">
                            Process Domains
                        </span>
                    </button>
                </div>
            ) : (
                <div className="animate-in fade-in slide-in-from-bottom-2">
                    <div
                        onDragEnter={(e) => { e.preventDefault(); setDragActive(true); }}
                        onDragLeave={(e) => { e.preventDefault(); setDragActive(false); }}
                        onDragOver={(e) => { e.preventDefault(); setDragActive(true); }}
                        onDrop={handleDrop}
                        className={cn(
                            "relative border-2 border-dashed rounded-2xl p-12 transition-all duration-300 text-center cursor-pointer group overflow-hidden",
                            dragActive
                                ? "border-primary bg-primary/5 scale-[1.01]"
                                : "border-white/10 hover:border-primary/30 hover:bg-white/5",
                            fileName ? "border-green-500/30 bg-green-500/5" : ""
                        )}
                    >
                        <input
                            type="file"
                            accept=".csv,.txt"
                            onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])}
                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                        />

                        {/* Background glow effect */}
                        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

                        <div className="relative z-0 flex flex-col items-center gap-4">
                            {fileName ? (
                                <>
                                    <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-green-500/20 to-emerald-500/20 flex items-center justify-center border border-green-500/30 shadow-[0_0_30px_-10px_rgba(34,197,94,0.3)]">
                                        <FileText className="h-8 w-8 text-green-400" />
                                    </div>
                                    <div className="space-y-1">
                                        <p className="text-white font-bold text-lg">{fileName}</p>
                                        <p className="text-green-400 text-sm">Ready to parse</p>
                                    </div>
                                    <button
                                        onClick={(e) => {
                                            e.preventDefault();
                                            e.stopPropagation(); // Stop bubbling to input
                                            setFileName(null);
                                            onDomainsExtracted([]);
                                        }}
                                        className="mt-4 px-4 py-2 bg-white/5 hover:bg-red-500/20 hover:text-red-400 border border-white/10 rounded-lg text-sm text-gray-400 transition-colors pointer-events-auto relative z-20 flex items-center gap-2"
                                    >
                                        <X className="h-4 w-4" />
                                        Remove File
                                    </button>
                                </>
                            ) : (
                                <>
                                    <div className="h-20 w-20 rounded-full bg-[#0B0F19] border border-white/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-500 shadow-2xl">
                                        <Upload className="h-8 w-8 text-gray-400 group-hover:text-primary transition-colors duration-300" />
                                    </div>
                                    <div className="space-y-2 mt-4">
                                        <p className="text-xl font-bold text-white group-hover:text-primary/90 transition-colors">
                                            Drop your file here
                                        </p>
                                        <p className="text-gray-400">
                                            or click to browse logic
                                        </p>
                                    </div>
                                    <div className="mt-4 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/5 text-xs text-gray-500">
                                        <span className="w-1.5 h-1.5 rounded-full bg-primary/50"></span>
                                        Supports CSV & TXT
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            )}

            {error && (
                <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl flex items-start gap-3 text-red-300 animate-in fade-in slide-in-from-top-2">
                    <AlertCircle className="h-5 w-5 flex-shrink-0 mt-0.5 text-red-500" />
                    <div>
                        <p className="font-medium text-red-400">Upload Failed</p>
                        <p className="text-sm mt-1 opacity-90">{error}</p>
                    </div>
                </div>
            )}
        </div>
    );
}
