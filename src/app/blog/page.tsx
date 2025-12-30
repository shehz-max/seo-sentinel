import Link from "next/link";
import { Calendar, Tag } from "lucide-react";

const POSTS = [
    {
        slug: "what-is-spam-score",
        title: "What is Spams Score & How to Lower It? (2024 Guide)",
        excerpt: "High spam score detected? Don't panic. Learn exactly how spam score is calculated, the 3 risk tiers, and 5 actionable steps to fix it today.",
        date: "Dec 17, 2025",
        category: "SEO Guides",
        readTime: "10 min read"
    },
    {
        slug: "why-da-matters",
        title: "Why Domain Authority Actually Matters (And Why It Doesn't)",
        excerpt: "DA is often misunderstood. Here is the mathematical truth behind Moz's famous metric and how to use it correctly.",
        date: "Dec 10, 2025",
        category: "SEO Metrics",
        readTime: "5 min read"
    },
    {
        slug: "27-spam-signals",
        title: "The 27 Spams Signals That Kill Your Rankings",
        excerpt: "From 'Poison Words' to 'Ratio of External Links', we break down the triggers that search engines use to detect spam.",
        date: "Dec 08, 2025",
        category: "Technical SEO",
        readTime: "8 min read"
    },
    {
        slug: "hybrid-seo-audit",
        title: "Why AI Alone Cannot Do SEO Audits",
        excerpt: "AI hallucinations are dangerous for SEO. Discover why you need a Hybrid Engine that combines AI with real data.",
        date: "Dec 05, 2025",
        category: "Case Study",
        readTime: "6 min read"
    }
];

export default function BlogIndex() {
    return (
        <div className="min-h-screen py-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12 sm:mb-16">
                    <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
                        SEO <span className="text-gradient-blue">Resources</span>
                    </h1>
                    <p className="mt-4 text-lg sm:text-xl text-gray-400 max-w-2xl mx-auto px-4">
                        Deep dives into the algorithms that control the web
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 px-2">
                    {POSTS.map((post) => (
                        <Link key={post.slug} href={`/blog/${post.slug}`} className="group block h-full">
                            <div className="glass-dark rounded-xl overflow-hidden border border-primary/20 h-full hover:border-primary/40 hover:shadow-xl hover:shadow-primary/10 transition-all">
                                <div className="h-48 bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center relative overflow-hidden">
                                    <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-secondary/10 group-hover:scale-110 transition-transform duration-500"></div>
                                    <Tag className="h-16 w-16 text-primary/50 relative z-10" />
                                </div>
                                <div className="p-6">
                                    <span className="inline-block px-3 py-1 text-xs font-semibold tracking-wider text-primary bg-primary/10 rounded-full uppercase">
                                        {post.category}
                                    </span>
                                    <h3 className="mt-4 text-xl font-bold text-white group-hover:text-primary transition-colors">
                                        {post.title}
                                    </h3>
                                    <p className="mt-3 text-gray-400 text-sm leading-relaxed">
                                        {post.excerpt}
                                    </p>
                                    <div className="mt-6 flex items-center justify-between text-sm text-gray-500">
                                        <div className="flex items-center">
                                            <Calendar className="h-4 w-4 mr-2" />
                                            <span>{post.date}</span>
                                        </div>
                                        <span>{post.readTime}</span>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}
