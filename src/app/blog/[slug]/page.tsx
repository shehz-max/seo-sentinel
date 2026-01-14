"use client";

import { useEffect, useState } from "react";
import { db } from "@/lib/firebase";
import { doc, getDoc } from "firebase/firestore";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, Calendar, User, Tag, Loader2, Share2 } from "lucide-react";
import ReactMarkdown from "react-markdown";
import Navbar from "@/components/layout/Navbar";

interface BlogPost {
    title: string;
    content: string;
    date: string;
    category: string;
    author: string;
    slug: string;
}

export default function BlogPost() {
    const params = useParams();
    const slug = params.slug as string;
    const [post, setPost] = useState<BlogPost | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPost = async () => {
            try {
                if (!db) return;
                const docRef = doc(db, "posts", slug);
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    setPost(docSnap.data() as BlogPost);
                }
            } catch (error) {
                console.error("Error fetching post:", error);
            } finally {
                setLoading(false);
            }
        };

        if (slug) fetchPost();
    }, [slug]);

    if (loading) {
        return (
            <div className="min-h-screen bg-[#020617] flex items-center justify-center">
                <Loader2 className="h-10 w-10 text-primary animate-spin" />
            </div>
        );
    }

    if (!post) {
        return (
            <div className="min-h-screen bg-[#020617] flex flex-col items-center justify-center text-white">
                <h1 className="text-4xl font-bold mb-4">404 - Post Not Found</h1>
                <Link href="/blog" className="text-primary hover:underline">Return to Blog</Link>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#020617] selection:bg-primary/20 selection:text-white">
            <article className="relative pt-32 pb-24">
                {/* Background Glow */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[500px] bg-primary/5 blur-[120px] rounded-full pointer-events-none" />

                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <Link href="/blog" className="inline-flex items-center text-gray-400 hover:text-white transition-colors mb-12 group">
                        <ArrowLeft className="h-4 w-4 mr-2 group-hover:-translate-x-1 transition-transform" />
                        Back to Resources
                    </Link>

                    <header className="mb-16 text-center">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-wider mb-6">
                            <Tag className="h-3 w-3" />
                            {post.category}
                        </div>
                        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white mb-8 leading-tight">
                            {post.title}
                        </h1>

                        <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-gray-400 border-y border-white/5 py-6">
                            <div className="flex items-center">
                                <div className="h-8 w-8 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-bold mr-3">
                                    {post.author?.[0] || 'S'}
                                </div>
                                <span className="font-medium text-white">{post.author}</span>
                            </div>
                            <div className="w-1 h-1 rounded-full bg-gray-600" />
                            <div className="flex items-center">
                                <Calendar className="h-4 w-4 mr-2" />
                                {post.date}
                            </div>
                        </div>
                    </header>

                    <div className="prose prose-invert prose-lg max-w-none prose-headings:font-bold prose-headings:text-white prose-p:text-gray-300 prose-a:text-primary prose-a:no-underline hover:prose-a:underline prose-strong:text-white prose-code:text-primary prose-pre:bg-white/5 prose-pre:border prose-pre:border-white/10 prose-img:rounded-2xl prose-img:border prose-img:border-white/10">
                        <ReactMarkdown>{post.content}</ReactMarkdown>
                    </div>

                    <div className="mt-20 pt-10 border-t border-white/10">
                        <div className="bg-white/5 rounded-2xl p-8 sm:p-12 text-center border border-white/5">
                            <h3 className="text-2xl font-bold text-white mb-4">Enjoyed this article?</h3>
                            <p className="text-gray-400 mb-8 max-w-lg mx-auto">
                                Check your website's spam score instantly with our free tool.
                            </p>
                            <Link
                                href="/"
                                className="inline-flex items-center px-8 py-4 bg-primary hover:bg-primary-dark text-white rounded-xl font-bold transition-all shadow-lg shadow-primary/20 hover:scale-105"
                            >
                                Check My Website
                            </Link>
                        </div>
                    </div>
                </div>
            </article>
        </div>
    );
}
