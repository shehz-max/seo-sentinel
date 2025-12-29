"use client";

import { Download, ExternalLink, AlertTriangle, CheckCircle, XCircle } from "lucide-react";
import { useState, Fragment } from "react";

interface BulkResult {
    domain: string;
    da: number;
    pa: number;
    spamScore: number;
    backlinks: number;
    status: "success" | "failed";
    signals?: string[];
}

interface BulkResultsTableProps {
    results: BulkResult[];
}

export default function BulkResultsTable({ results }: BulkResultsTableProps) {
    const [sortField, setSortField] = useState<keyof BulkResult>("spamScore");
    const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");
    const [expandedRows, setExpandedRows] = useState<Set<string>>(new Set());

    const sortedResults = [...results].sort((a, b) => {
        const aValue = a[sortField];
        const bValue = b[sortField];

        if (typeof aValue === 'number' && typeof bValue === 'number') {
            return sortDirection === "asc" ? aValue - bValue : bValue - aValue;
        }
        return 0;
    });

    const handleSort = (field: keyof BulkResult) => {
        if (sortField === field) {
            setSortDirection(sortDirection === "asc" ? "desc" : "asc");
        } else {
            setSortField(field);
            setSortDirection("desc");
        }
    };

    const toggleRow = (domain: string) => {
        const newExpanded = new Set(expandedRows);
        if (newExpanded.has(domain)) {
            newExpanded.delete(domain);
        } else {
            newExpanded.add(domain);
        }
        setExpandedRows(newExpanded);
    };

    const downloadCSV = () => {
        const headers = ["Domain", "DA", "PA", "Spam Score", "Status", "Issues Found"];
        const rows = results.map(r => [
            r.domain,
            r.da,
            r.pa,
            r.spamScore,
            r.status,
            r.signals ? r.signals.join("; ") : "None"
        ]);

        const csvContent = [
            headers.join(","),
            ...rows.map(r => r.join(","))
        ].join("\n");

        const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", `seo_sentinel_bulk_${new Date().toISOString().split('T')[0]}.csv`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const getScoreColor = (score: number) => {
        if (score < 30) return "text-green-400";
        if (score < 60) return "text-yellow-400";
        return "text-red-400";
    };

    return (
        <div className="space-y-4">
            <div className="flex justify-between items-center">
                <h3 className="text-xl font-bold text-white">Results ({results.length})</h3>
                <button
                    onClick={downloadCSV}
                    className="flex items-center gap-2 px-4 py-2 bg-primary/20 hover:bg-primary/30 text-primary rounded-lg text-sm font-medium transition-colors"
                >
                    <Download className="h-4 w-4" />
                    Export CSV
                </button>
            </div>

            <div className="overflow-x-auto rounded-xl border border-white/10 bg-white/5">
                <table className="w-full text-left text-sm text-gray-300">
                    <thead className="bg-white/5 text-gray-400 uppercase font-medium">
                        <tr>
                            <th className="px-6 py-4 cursor-pointer hover:text-white whitespace-nowrap" onClick={() => handleSort("domain")}>Domain</th>
                            <th className="px-6 py-4 cursor-pointer hover:text-white whitespace-nowrap" onClick={() => handleSort("da")}>DA</th>
                            <th className="px-6 py-4 cursor-pointer hover:text-white whitespace-nowrap" onClick={() => handleSort("pa")}>PA</th>
                            <th className="px-6 py-4 cursor-pointer hover:text-white whitespace-nowrap" onClick={() => handleSort("spamScore")}>Spam Score</th>
                            <th className="px-6 py-4 whitespace-nowrap">Analysis</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                        {sortedResults.map((result, idx) => (
                            <Fragment key={idx}>
                                <tr className="hover:bg-white/5 transition-colors group">
                                    <td className="px-6 py-4 font-medium text-white">
                                        <div className="flex items-center gap-2">
                                            {result.domain}
                                            <a href={`https://${result.domain}`} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-white">
                                                <ExternalLink className="h-3 w-3" />
                                            </a>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">{result.da}</td>
                                    <td className="px-6 py-4">{result.pa}</td>
                                    <td className={`px-6 py-4 font-bold ${getScoreColor(result.spamScore)}`}>
                                        {result.spamScore}%
                                    </td>
                                    <td className="px-6 py-4">
                                        <button
                                            onClick={() => toggleRow(result.domain)}
                                            className="px-3 py-1 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-xs text-primary transition-colors flex items-center gap-1"
                                        >
                                            {expandedRows.has(result.domain) ? "Hide Report" : "View Report"}
                                        </button>
                                    </td>
                                </tr>
                                {/* Detailed View Row */}
                                {expandedRows.has(result.domain) && (
                                    <tr className="bg-white/[0.02]">
                                        <td colSpan={6} className="px-6 py-4">
                                            <div className="p-4 rounded-xl border border-white/10 bg-[#0B0F19]/50 space-y-4 animate-in fade-in slide-in-from-top-2">
                                                <div className="flex items-start gap-4">
                                                    <div className="flex-1">
                                                        <h4 className="text-sm font-bold text-white mb-2 flex items-center gap-2">
                                                            <AlertTriangle className="h-4 w-4 text-yellow-500" />
                                                            Risk Analysis (27-Point Inspection)
                                                        </h4>

                                                        {result.signals && result.signals.length > 0 ? (
                                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-3">
                                                                {result.signals.map((signal: any, sIdx) => {
                                                                    const signalText = typeof signal === 'string' ? signal : (signal.name || signal.description || "Unknown Issue");
                                                                    return (
                                                                        <div key={sIdx} className="flex items-center gap-2 text-xs text-red-300 bg-red-500/10 px-2 py-1.5 rounded-md border border-red-500/20">
                                                                            <XCircle className="h-3 w-3 flex-shrink-0" />
                                                                            {signalText}
                                                                        </div>
                                                                    );
                                                                })}
                                                            </div>
                                                        ) : (
                                                            <div className="flex items-center gap-2 text-sm text-green-400 mt-2">
                                                                <CheckCircle className="h-4 w-4" />
                                                                <span>Clean clean! No critical toxic signals detected.</span>
                                                            </div>
                                                        )}
                                                    </div>

                                                    {/* AI Consultant Placeholder */}
                                                    <div className="w-1/3 min-w-[200px] border-l border-white/10 pl-4">
                                                        <h5 className="text-xs font-bold text-primary mb-2 uppercase tracking-wider">AI Consultant</h5>
                                                        <p className="text-xs text-gray-400 mb-3">
                                                            {result.spamScore > 50
                                                                ? "This domain shows significant toxicity signs. Immediate audit recommended."
                                                                : "This domain appears healthy, but monitor backlinks regularly."}
                                                        </p>
                                                        <button className="w-full py-1.5 rounded-lg bg-primary/10 hover:bg-primary/20 text-primary text-xs font-bold border border-primary/20 transition-all">
                                                            Ask AI Assistant
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                )}
                            </Fragment>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
