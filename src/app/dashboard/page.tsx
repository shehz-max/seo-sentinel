"use client";

import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Activity, LogOut, User as UserIcon } from "lucide-react";

export default function Dashboard() {
    const { user, loading, logout } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!loading && !user) {
            router.push("/login");
        }
    }, [user, loading, router]);

    if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;

    return (
        <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
            <div className="bg-white dark:bg-slate-900 shadow rounded-lg overflow-hidden border border-slate-200 dark:border-slate-800">
                <div className="px-4 py-5 sm:px-6 flex justify-between items-center border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50">
                    <h3 className="text-lg leading-6 font-medium text-slate-900 dark:text-white">
                        User Dashboard
                    </h3>
                    <button
                        onClick={logout}
                        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-red-700 bg-red-100 hover:bg-red-200 focus:outline-none"
                    >
                        <LogOut className="h-4 w-4 mr-2" />
                        Sign out
                    </button>
                </div>

                <div className="px-4 py-5 sm:p-6 grid grid-cols-1 gap-6 lg:grid-cols-3">
                    {/* Profile Card */}
                    <div className="col-span-1 bg-white dark:bg-slate-950 p-6 rounded-xl border border-slate-100 dark:border-slate-800 shadow-sm">
                        <div className="flex items-center gap-4 mb-4">
                            <div className="bg-primary/10 p-3 rounded-full">
                                <UserIcon className="h-6 w-6 text-primary" />
                            </div>
                            <div>
                                <h4 className="text-sm font-medium text-slate-500">Profile</h4>
                                <p className="text-lg font-bold text-slate-900 dark:text-white">{user?.displayName || "User"}</p>
                                <p className="text-xs text-slate-400">{user?.email}</p>
                            </div>
                        </div>
                        <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800">
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                Pro Plan Active
                            </span>
                        </div>
                    </div>

                    {/* Usage Stats */}
                    <div className="col-span-1 bg-white dark:bg-slate-950 p-6 rounded-xl border border-slate-100 dark:border-slate-800 shadow-sm">
                        <div className="flex items-center gap-4 mb-4">
                            <div className="bg-blue-100 p-3 rounded-full">
                                <Activity className="h-6 w-6 text-blue-600" />
                            </div>
                            <div>
                                <h4 className="text-sm font-medium text-slate-500">Monthly Usage</h4>
                                <p className="text-lg font-bold text-slate-900 dark:text-white">12 / 100 Checks</p>
                            </div>
                        </div>
                        <div className="w-full bg-slate-200 rounded-full h-2.5 dark:bg-slate-700 mt-4">
                            <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: "12%" }}></div>
                        </div>
                    </div>
                </div>

                {/* History Table Placeholder */}
                <div className="px-4 py-5 sm:p-6">
                    <h4 className="text-lg font-medium text-slate-900 dark:text-white mb-4">Recent Audits</h4>
                    <div className="border rounded-lg p-8 text-center text-slate-500 bg-slate-50 dark:bg-slate-900/50 dark:border-slate-800">
                        No recent scans found. Start analyzing domains to see history here.
                    </div>
                </div>

            </div>
        </div>
    );
}
