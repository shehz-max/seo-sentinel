import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Calendar, Tag, User } from "lucide-react";

// In a real app, this would be in a separate data file or CMS
const BLOG_CONTENT: Record<string, { title: string; content: React.ReactNode; date: string; category: string; author: string }> = {
    "what-is-spam-score": {
        title: "What is Spam Score & How to Lower It? (2024 Guide)",
        date: "Dec 17, 2025",
        category: "SEO Guides",
        author: "SEO Sentinel Team",
        content: (
            <>
                <p className="lead text-xl text-slate-600 dark:text-slate-300 mb-8">
                    Is your website toxic? A high Spam Score can silently kill your search rankings. Learn exactly how it's calculated and the 5 steps to fix it today.
                </p>

                <h2>What is Spam Score?</h2>
                <p>
                    Spam Score is a metric developed by SEO data providers (like Moz and Dapa) to measure the percentage of sites with similar features to yours that search engines have penalized or banned.
                </p>
                <p>
                    It represents the <strong>probability of spam</strong>, not necessarily that your site <em>is</em> spam. However, a score above <strong>30%</strong> is considered high risk and should be addressed immediately.
                </p>

                <div className="bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-500 p-6 my-8">
                    <h3 className="text-blue-700 dark:text-blue-300 font-bold mt-0">The 3 Tiers of Risk</h3>
                    <ul className="list-none pl-0 mb-0 space-y-2">
                        <li>🟢 <strong>1-30% (Low Risk):</strong> Normal for most sites.</li>
                        <li>🟡 <strong>31-60% (Medium Risk):</strong> Warning signs detected. Investigate.</li>
                        <li>🔴 <strong>61-100% (High Risk):</strong> Critical. Likely penalized by Google.</li>
                    </ul>
                </div>

                <h2>What Causes a High Spam Score?</h2>
                <p>It's rarely one thing. It's usually a combination of "Spam Signals". Here are the most common culprits we detect at SEO Sentinel:</p>
                <ul>
                    <li><strong>Poison Words:</strong> Using terms like "casino", "payday loan", or "pharmacy" in irrelevant contexts.</li>
                    <li><strong>Link Stuffing:</strong> Having an unnatural ratio of external links to text content.</li>
                    <li><strong>Missing Pages:</strong> Legitimate businesses have Contact, Privacy, and About pages. Spam sites often don't.</li>
                    <li><strong>No Contact Info:</strong> Missing email addresses or phone numbers.</li>
                    <li><strong>Low Authority TLDs:</strong> Domains ending in .xyz, .info, or .club often start with a higher baseline spam score.</li>
                </ul>

                <h2>How to Lower Your Spam Score (5 Steps)</h2>
                <h3>1. Run a Full Scan</h3>
                <p>Use our <Link href="/" className="text-primary underline">Free Spam Score Checker</Link> to identify exactly which signals you are failing. Are you missing a privacy policy? Do you have broken links?</p>

                <h3>2. Disavow Toxic Backlinks</h3>
                <p>If low-quality sites are linking to you, tell Google to ignore them using the <strong>Google Disavow Tool</strong>. This is the most effective way to lower your score if the issue is off-page.</p>

                <h3>3. Add Trust Pages</h3>
                <p>Ensure your footer links to a robust Privacy Policy, Terms of Service, and Contact Us page. Add a physical address if possible.</p>

                <h3>4. Clean Up Your Content</h3>
                <p>Remove any "thin" content (pages with less than 300 words) or auto-generated text. Replace it with high-quality, helpful articles.</p>

                <h3>5. Secure Your Site (HTTPS)</h3>
                <p>Google considers non-secure (HTTP) sites as a security risk. Ensure your SSL certificate is valid and active on all pages.</p>

                <h2>Conclusion</h2>
                <p>
                    A high spam score isn't a death sentence, but it is a wake-up call. By methodically fixing these technical signals, you can recover your rankings and build a healthier, more authoritative domain.
                </p>
            </>
        )
    },
    // Keep placeholder content for other links so they don't 404
    "why-da-matters": {
        title: "Why Domain Authority Actually Matters",
        date: "Dec 10, 2025",
        category: "SEO Metrics",
        author: "SEO Sentinel Team",
        content: <p>Placeholder content for Why DA Matters...</p>
    },
    "27-spam-signals": {
        title: "The 27 Spam Signals That Kill Rankings",
        date: "Dec 08, 2025",
        category: "Technical SEO",
        author: "SEO Sentinel Team",
        content: <p>Placeholder content for 27 Signals...</p>
    },
    "hybrid-seo-audit": {
        title: "Why AI Alone Cannot Do SEO Audits",
        date: "Dec 05, 2025",
        category: "Case Study",
        author: "SEO Sentinel Team",
        content: <p>Placeholder content for Hybrid Audit...</p>
    }
};

export default function BlogPost({ params }: { params: { slug: string } }) {
    const post = BLOG_CONTENT[params.slug];

    if (!post) {
        return notFound();
    }

    return (
        <article className="max-w-3xl mx-auto px-4 py-20 sm:px-6 lg:px-8">
            <Link href="/blog" className="inline-flex items-center text-slate-500 hover:text-primary mb-8 transition-colors">
                <ArrowLeft className="h-4 w-4 mr-2" /> Back to Resources
            </Link>

            <header className="mb-10">
                <div className="flex items-center gap-4 text-sm text-slate-500 mb-4">
                    <span className="inline-flex items-center text-primary font-medium">
                        <Tag className="h-3 w-3 mr-1" />
                        {post.category}
                    </span>
                    <span className="flex items-center">
                        <Calendar className="h-3 w-3 mr-1" />
                        {post.date}
                    </span>
                    <span className="flex items-center">
                        <User className="h-3 w-3 mr-1" />
                        {post.author}
                    </span>
                </div>
                <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white capitalize leading-tight">
                    {post.title}
                </h1>
            </header>

            <div className="prose dark:prose-invert prose-lg lg:prose-xl max-w-none prose-headings:font-bold prose-headings:text-slate-900 dark:prose-headings:text-white prose-a:text-primary hover:prose-a:text-primary-dark prose-img:rounded-xl">
                {post.content}
            </div>
        </article>
    );
}
