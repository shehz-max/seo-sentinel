"use client";

import { useAuth } from "@/contexts/AuthContext";
import { db } from "@/lib/firebase";
import { collection, deleteDoc, doc, getDocs, orderBy, query } from "firebase/firestore";
import { Edit, Plus, Trash2, Eye, LayoutDashboard } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Navbar from "@/components/layout/Navbar";

interface BlogPost {
    slug: string;
    title: string;
    date: string;
    category: string;
    publishedAt?: any;
}

export default function AdminDashboard() {
    const { user, isAdmin, loading } = useAuth();
    const router = useRouter();
    const [posts, setPosts] = useState<BlogPost[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (!loading) {
            if (!user || !isAdmin) {
                router.push("/");
            } else {
                fetchPosts();
            }
        }
    }, [user, isAdmin, loading, router]);

    const fetchPosts = async () => {
        try {
            const postsRef = collection(db, "posts");
            const q = query(postsRef, orderBy("publishedAt", "desc"));
            const querySnapshot = await getDocs(q);

            const fetchedPosts: BlogPost[] = [];
            querySnapshot.forEach((doc) => {
                fetchedPosts.push(doc.data() as BlogPost);
            });
            setPosts(fetchedPosts);
        } catch (error) {
            console.error("Error fetching posts:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleDelete = async (slug: string) => {
        if (confirm("Are you sure you want to delete this post?")) {
            try {
                await deleteDoc(doc(db, "posts", slug));
                setPosts(posts.filter(p => p.slug !== slug));
            } catch (error) {
                console.error("Error deleting post:", error);
                alert("Failed to delete post");
            }
        }
    };

    if (loading || isLoading) {
        return (
            <div className="min-h-screen bg-[#020617] flex items-center justify-center text-white">
                Loading Admin Panel...
            </div>
        );
    }

    if (!isAdmin) return null;

    return (
        <div className="min-h-screen bg-[#020617] text-white">
            <Navbar />

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
                <div className="flex flex-col sm:flex-row justify-between items-center mb-10 gap-4">
                    <div>
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-bold uppercase tracking-wider mb-2">
                            <LayoutDashboard className="h-3 w-3" />
                            Admin Area
                        </div>
                        <h1 className="text-3xl font-bold text-white">Blog Manager</h1>
                    </div>

                    <Link
                        href="/admin/new"
                        className="flex items-center gap-2 px-6 py-3 bg-primary hover:bg-primary-dark text-white rounded-lg font-bold transition-all shadow-lg shadow-primary/20"
                    >
                        <Plus className="h-5 w-5" />
                        Create New Post
                    </Link>
                </div>

                <div className="glass-dark rounded-xl border border-white/10 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="bg-white/5 border-b border-white/10">
                                <tr>
                                    <th className="px-6 py-4 font-semibold text-gray-300">Title</th>
                                    <th className="px-6 py-4 font-semibold text-gray-300">Category</th>
                                    <th className="px-6 py-4 font-semibold text-gray-300">Date</th>
                                    <th className="px-6 py-4 font-semibold text-gray-300 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/5">
                                {posts.length === 0 ? (
                                    <tr>
                                        <td colSpan={4} className="px-6 py-12 text-center text-gray-500">
                                            No posts found. Create your first one!
                                        </td>
                                    </tr>
                                ) : (
                                    posts.map((post) => (
                                        <tr key={post.slug} className="hover:bg-white/5 transition-colors">
                                            <td className="px-6 py-4 font-medium text-white">{post.title}</td>
                                            <td className="px-6 py-4 text-gray-400">
                                                <span className="inline-block px-2 py-1 bg-white/5 rounded text-xs">
                                                    {post.category}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-gray-400 font-mono text-sm">{post.date}</td>
                                            <td className="px-6 py-4 text-right">
                                                <div className="flex items-center justify-end gap-2">
                                                    <Link
                                                        href={`/blog/${post.slug}`}
                                                        target="_blank"
                                                        className="p-2 hover:bg-white/10 rounded-lg text-gray-400 hover:text-white transition-colors"
                                                        title="View Live"
                                                    >
                                                        <Eye className="h-4 w-4" />
                                                    </Link>
                                                    <Link
                                                        href={`/admin/edit/${post.slug}`}
                                                        className="p-2 hover:bg-primary/20 rounded-lg text-gray-400 hover:text-primary transition-colors"
                                                        title="Edit"
                                                    >
                                                        <Edit className="h-4 w-4" />
                                                    </Link>
                                                    <button
                                                        onClick={() => handleDelete(post.slug)}
                                                        className="p-2 hover:bg-red-500/20 rounded-lg text-gray-400 hover:text-red-400 transition-colors"
                                                        title="Delete"
                                                    >
                                                        <Trash2 className="h-4 w-4" />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </main>
        </div>
    );
}
