"use client";

import Link from "next/link";
import { Calendar, Tag, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { db } from "@/lib/firebase";
import Navbar from "@/components/layout/Navbar";

interface BlogPost {
    slug: string;
    title: string;
    excerpt: string;
    date: string;
    category: string;
    readTime: string;
}

export default function BlogIndex() {
    const [posts, setPosts] = useState<BlogPost[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                if (!db) return;
                const postsRef = collection(db, "posts");
                // Attempt to order by publishedAt, fallback to client side sort if index missing
                const q = query(postsRef, orderBy("publishedAt", "desc"));
                const querySnapshot = await getDocs(q);

                const fetchedPosts: BlogPost[] = [];
                querySnapshot.forEach((doc) => {
                    fetchedPosts.push(doc.data() as BlogPost);
                });
                setPosts(fetchedPosts);
            } catch (error) {
                console.error("Error fetching posts:", error);
                // Fallback for missing index error
                try {
                    const postsRef = collection(db, "posts");
                    const querySnapshot = await getDocs(postsRef);
                    const fetchedPosts: BlogPost[] = [];
                    querySnapshot.forEach((doc) => {
                        fetchedPosts.push(doc.data() as BlogPost);
                    });
                    setPosts(fetchedPosts);
                } catch (e) {
                    console.error("Critical fetch error", e);
                }
            } finally {
                setLoading(false);
            }
        };

        fetchPosts();
    }, []);

    return (
        <div className="min-h-screen bg-[#020617] selection:bg-primary/20 selection:text-white">
            <Navbar />

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32">
                <div className="text-center mb-16 sm:mb-24">
                    <div className="inline-block mb-4 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-wider">
                        From the Blog
                    </div>
                    <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white mb-6 tracking-tight">
                        SEO <span className="text-gradient-blue">Resources</span>
                    </h1>
                    <p className="max-w-2xl mx-auto text-lg text-gray-400 leading-relaxed">
                        Deep dives into the algorithms that control the web. Master technical SEO, spam analysis, and authority building.
                    </p>
                </div>

                {loading ? (
                    <div className="flex justify-center py-20">
                        <Loader2 className="h-10 w-10 text-primary animate-spin" />
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {posts.length === 0 ? (
                            <div className="col-span-full text-center text-gray-500 py-20 bg-white/5 rounded-3xl border border-white/5">
                                <p>No posts published yet.</p>
                            </div>
                        ) : (
                            posts.map((post) => (
                                <Link key={post.slug} href={`/blog/${post.slug}`} className="group relative block h-full">
                                    <div className="absolute -inset-0.5 bg-gradient-to-r from-primary to-secondary rounded-2xl opacity-0 group-hover:opacity-75 blur transition duration-500" />
                                    <div className="relative h-full glass-dark rounded-xl p-8 border border-white/10 flex flex-col transition-all">

                                        <div className="flex items-center justify-between mb-6">
                                            <span className="inline-flex items-center px-3 py-1 rounded-lg bg-white/5 text-xs font-medium text-primary border border-white/10">
                                                <Tag className="h-3 w-3 mr-1.5" />
                                                {post.category}
                                            </span>
                                            <span className="text-xs text-gray-500 font-mono">{post.readTime}</span>
                                        </div>

                                        <h3 className="text-2xl font-bold text-white mb-4 leading-tight group-hover:text-primary transition-colors">
                                            {post.title}
                                        </h3>

                                        <p className="text-gray-400 mb-8 line-clamp-3 leading-relaxed flex-grow">
                                            {post.excerpt}
                                        </p>

                                        <div className="flex items-center text-sm text-gray-500 pt-6 border-t border-white/5 mt-auto">
                                            <Calendar className="h-4 w-4 mr-2" />
                                            {post.date}
                                        </div>
                                    </div>
                                </Link>
                            ))
                        )}
                    </div>
                )}
            </main>
        </div>
    );
}
