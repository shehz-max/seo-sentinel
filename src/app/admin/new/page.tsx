"use client";

import { useAuth } from "@/contexts/AuthContext";
import { db } from "@/lib/firebase";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { ArrowLeft, Save, Loader2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Navbar from "@/components/layout/Navbar";

export default function NewPostPage() {
    const { user, isAdmin, loading } = useAuth();
    const router = useRouter();
    const [isSaving, setIsSaving] = useState(false);

    const [formData, setFormData] = useState({
        title: "",
        slug: "",
        excerpt: "",
        category: "SEO Guides",
        readTime: "5 min read",
        date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
        content: ""
    });

    useEffect(() => {
        if (!loading) {
            if (!user || !isAdmin) {
                router.push("/");
            }
        }
    }, [user, isAdmin, loading, router]);

    // Auto-generate slug from title
    useEffect(() => {
        const slug = formData.title
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/(^-|-$)+/g, '');
        setFormData(prev => ({ ...prev, slug }));
    }, [formData.title]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSaving(true);

        try {
            await setDoc(doc(db, "posts", formData.slug), {
                ...formData,
                author: "SEO Sentinel Team",
                publishedAt: serverTimestamp(),
                updatedAt: serverTimestamp()
            });
            alert("Post published successfully!");
            router.push("/admin");
        } catch (error) {
            console.error("Error creating post:", error);
            alert("Failed to create post. Check console.");
        } finally {
            setIsSaving(false);
        }
    };

    if (loading || !isAdmin) return null;

    return (
        <div className="min-h-screen bg-[#020617] text-white">
            <Navbar />

            <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
                <div className="flex items-center justify-between mb-8">
                    <Link
                        href="/admin"
                        className="flex items-center text-gray-400 hover:text-white transition-colors"
                    >
                        <ArrowLeft className="h-4 w-4 mr-2" />
                        Back to Dashboard
                    </Link>
                    <h1 className="text-2xl font-bold">New Post</h1>
                </div>

                <div className="glass-dark border border-white/10 rounded-2xl p-6 sm:p-10">
                    <form onSubmit={handleSubmit} className="space-y-6">

                        {/* Title & Slug */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-300">Title</label>
                                <input
                                    type="text"
                                    required
                                    value={formData.title}
                                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary/50"
                                    placeholder="Enter post title"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-300">Slug (URL)</label>
                                <input
                                    type="text"
                                    required
                                    value={formData.slug}
                                    onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                                    className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-3 text-gray-400 focus:outline-none focus:border-primary/50 font-mono text-sm"
                                />
                            </div>
                        </div>

                        {/* Excerpt */}
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-300">Excerpt (Short Description)</label>
                            <textarea
                                required
                                rows={2}
                                value={formData.excerpt}
                                onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary/50"
                                placeholder="A brief summary for the blog card..."
                            />
                        </div>

                        {/* Meta Info */}
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-300">Category</label>
                                <select
                                    value={formData.category}
                                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary/50"
                                >
                                    <option>SEO Guides</option>
                                    <option>Technical SEO</option>
                                    <option>SEO Metrics</option>
                                    <option>Case Study</option>
                                    <option>Updates</option>
                                </select>
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-300">Read Time</label>
                                <input
                                    type="text"
                                    value={formData.readTime}
                                    onChange={(e) => setFormData({ ...formData, readTime: e.target.value })}
                                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary/50"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-300">Date Display</label>
                                <input
                                    type="text"
                                    value={formData.date}
                                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary/50"
                                />
                            </div>
                        </div>

                        {/* Content */}
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-300 flex justify-between">
                                <span>Content (Markdown Supported)</span>
                                <a href="https://www.markdownguide.org/cheat-sheet/" target="_blank" className="text-primary hover:underline text-xs">Formatting Help</a>
                            </label>
                            <textarea
                                required
                                rows={20}
                                value={formData.content}
                                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary/50 font-mono text-sm leading-relaxed"
                                placeholder="# Heading 1&#10;&#10;Write your content here..."
                            />
                        </div>

                        {/* Action Bar */}
                        <div className="pt-6 border-t border-white/10 flex justify-end gap-4">
                            <Link
                                href="/admin"
                                className="px-6 py-3 rounded-lg border border-white/10 text-gray-300 font-medium hover:bg-white/5 transition-colors"
                            >
                                Cancel
                            </Link>
                            <button
                                type="submit"
                                disabled={isSaving}
                                className="px-8 py-3 rounded-lg bg-primary hover:bg-primary-dark text-white font-bold shadow-lg shadow-primary/20 transition-all flex items-center gap-2 disabled:opacity-70"
                            >
                                {isSaving ? (
                                    <>
                                        <Loader2 className="h-5 w-5 animate-spin" />
                                        Publishing...
                                    </>
                                ) : (
                                    <>
                                        <Save className="h-5 w-5" />
                                        Publish Post
                                    </>
                                )}
                            </button>
                        </div>

                    </form>
                </div>
            </main>
        </div>
    );
}
