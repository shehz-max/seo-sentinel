"use client";

import { CheckCircle2, AlertTriangle, TrendingUp, ShieldCheck, HelpCircle } from "lucide-react";

// ... imports ...

export default function HomeContent() {
    return (
        <section className="py-20 relative overflow-hidden bg-[#0B0F19]">
            {/* Background Decor */}
            <div className="absolute top-1/4 -right-64 w-96 h-96 bg-primary/5 blur-[100px] rounded-full pointer-events-none" />
            <div className="absolute bottom-1/4 -left-64 w-96 h-96 bg-secondary/5 blur-[100px] rounded-full pointer-events-none" />

            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-20">

                {/* Article Header */}
                <div className="text-center">
                    <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
                        Check Website <span className="text-gradient-blue">Spam Score & DA/PA Now</span>
                    </h2>
                    <div className="h-1 w-20 bg-gradient-to-r from-primary to-secondary mx-auto rounded-full" />
                </div>

                {/* Content Block */}
                <article className="prose prose-invert prose-lg max-w-none space-y-12">

                    {/* Intro */}
                    <div className="glass-dark p-8 sm:p-10 rounded-3xl border border-white/5 shadow-xl">
                        <p className="text-gray-400 leading-relaxed mb-6">
                            Does your website raise any red flags with Google and other search engines? When your spam score is high, it is detrimental to your SEO, leading to sudden rises and falls in your rankings and organic traffic.
                        </p>
                        <p className="text-gray-400 leading-relaxed mb-6">
                            Our Website Spam Score Checker analyzes backlinks and other key SEO indicators to determine whether your site is safe, risky, or spammy. Check individual URLs (up to 3 per day) instantly, or check up to 50 websites at once.
                        </p>
                        <p className="text-gray-400 leading-relaxed">
                            Access in-depth reports, identify weak areas, and discover what’s putting your rankings at risk. Beginner-friendly yet powerful, it is the ultimate tool for bloggers, website owners, and SEO professionals to monitor spam score, Domain Authority (DA), and Page Authority (PA) for long-term online growth.
                        </p>
                    </div>

                    {/* How to Use */}
                    <div>
                        <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                            <ShieldCheck className="h-6 w-6 text-primary" />
                            How to Use Our Spam Score Checker
                        </h2>
                        <p className="text-gray-400 mb-6">Easily check your website’s risk with our spam score checker:</p>
                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="glass-dark p-6 rounded-2xl border border-white/5">
                                <span className="text-primary font-bold block mb-2">Step 1</span>
                                <p className="text-gray-400">For a single website, enter your domain or page URL in the box.</p>
                            </div>
                            <div className="glass-dark p-6 rounded-2xl border border-white/5">
                                <span className="text-primary font-bold block mb-2">Step 2</span>
                                <p className="text-gray-400">Click “Check Spam” to get an instant spam risk report.</p>
                            </div>
                            <div className="glass-dark p-6 rounded-2xl border border-white/5">
                                <span className="text-primary font-bold block mb-2">Step 3</span>
                                <p className="text-gray-400">For multiple sites, create a free account and upload or paste up to <strong>50 domains</strong> at once.</p>
                            </div>
                            <div className="glass-dark p-6 rounded-2xl border border-white/5">
                                <span className="text-primary font-bold block mb-2">Step 4</span>
                                <p className="text-gray-400">Run the bulk scan and view all spam score reports in one place using our spam score checker—no technical expertise required.</p>
                            </div>
                        </div>
                        <p className="text-gray-400 mt-4 text-sm italic">You can run <strong>three free checks per day</strong> without logging in, making it a convenient alternative to the Moz spam score checker.</p>
                    </div>

                    {/* What is Spam Score */}
                    <div>
                        <h2 className="text-2xl font-bold text-white mb-4">What Is <span className="text-gradient-blue">Spam Score?</span></h2>
                        <p className="text-gray-400 leading-relaxed mb-4">
                            <strong>Spam score</strong> is a metric used to estimate how likely a website is to be considered spammy or risky by search engines. It analyzes various signals, including low-quality backlinks, irrelevant linking patterns, thin or duplicate content, over-optimized anchor text, suspicious domain factors, and unnatural link velocity.
                        </p>
                        <p className="text-gray-400 leading-relaxed">
                            A high <strong>Spam Score</strong> means your website may be associated with spam practices, be at risk of a penalty, be unsafe for link building, and be harmful to your SEO reputation. A low spam score means your website is safer, more natural, and less risky for SEO.
                        </p>
                    </div>

                    {/* How to Reduce Spam Score */}
                    <div>
                        <h2 className="text-2xl font-bold text-white mb-6">How to <span className="text-gradient-blue">Reduce Spam Score</span></h2>
                        <div className="space-y-6">
                            <div>
                                <h3 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
                                    <AlertTriangle className="h-5 w-5 text-yellow-500" /> Remove Toxic Backlinks
                                </h3>
                                <p className="text-gray-400">Toxic backlinks from low-quality or spam sites negatively affect your reputation. Correct this by disavowing low-quality links with the help of Google Disavow Tool, eliminating paid or automated links, and not using link farms and PBNs (Private Blog Networks).</p>
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
                                    <TrendingUp className="h-5 w-5 text-green-500" /> Build Quality Backlinks
                                </h3>
                                <p className="text-gray-400">A single link on a site that is in your niche, has real visitors, and includes you in its own editorial copy, is worth dozens of worthless links. Pursue those relied upon links rather than figures.</p>
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-white mb-2">Improve Content Quality</h3>
                                <p className="text-gray-400">Search engines reward material that is recent, original, and also useful. Delete repeated pages, reject spun text, and do not post thin articles that software wrote - publish pages that answer fundamental questions.</p>
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-white mb-2">Fix Over-Optimization Issues</h3>
                                <p className="text-gray-400">Keyword stuffing, forced anchor text, and a maze of internal links all count as over-optimization. Use keywords when they fit, write anchor text that reads like plain speech, and link internally only where it helps the reader.</p>
                            </div>
                            <div className="bg-primary/5 p-4 rounded-xl border border-primary/10">
                                <h3 className="text-lg font-bold text-white mb-1">Identify What to Fix First</h3>
                                <p className="text-gray-400 text-sm">Our <strong>spam score checker</strong> report highlights exactly where your site is lacking so you can prioritize improvements effectively.</p>
                            </div>
                        </div>
                    </div>

                    {/* What is DA/PA */}
                    <div className="grid md:grid-cols-2 gap-8">
                        <div className="glass-dark p-8 rounded-3xl border border-white/5">
                            <h2 className="text-2xl font-bold text-white mb-4">Domain Authority (DA)</h2>
                            <p className="text-gray-400 leading-relaxed mb-4">
                                Domain Authority (DA) is a metric that estimates a website's success on search engine result pages. A range from 0 to 100 is used, with a high score indicating a high ranking capacity. The factors that most affect DA are the quality and quantity of backlinks, the domain's age, and the quality of the content.
                            </p>
                            <p className="text-gray-400 leading-relaxed">
                                Increased DA implies superior ranking potential, stronger trust indicators, and greater natural visibility. A website with a DA of 60 is considered much stronger than one with a DA of 20. DA, however, is only one of many metrics that search engines consider.
                            </p>
                        </div>
                        <div className="glass-dark p-8 rounded-3xl border border-white/5">
                            <h2 className="text-2xl font-bold text-white mb-4">Page Authority (PA)</h2>
                            <p className="text-gray-400 leading-relaxed mb-4">
                                Page Authority (PA) is similar to DA; however, rather than assessing the authority of the entire website, it evaluates the ranking potential of a specific page. PA relies on page-level backlink optimization, in-page links, and content relevance.
                            </p>
                            <p className="text-gray-400 leading-relaxed">
                                DA and PA apply to competitor analysis, decision-making on link-building, and assessing website strength. They help you understand your position relative to the competitors and what you need to do to improve on what you have done.
                            </p>
                        </div>
                    </div>

                    {/* How to Increase DA/PA */}
                    <div className="glass-dark p-8 rounded-3xl border border-white/5 bg-slate-900/50">
                        <h2 className="text-2xl font-bold text-white mb-6">How to Increase DA and PA</h2>
                        <p className="text-gray-400 mb-6">You have to build a robust, credible website to increase Domain Authority (DA) and Page Authority (PA). The following are the ways:</p>
                        <ul className="grid sm:grid-cols-2 gap-4 text-gray-400">
                            <li className="flex items-center gap-2"><CheckCircle2 className="h-5 w-5 text-primary" /> Obtain relevant backlinks on high-authority websites.</li>
                            <li className="flex items-center gap-2"><CheckCircle2 className="h-5 w-5 text-primary" /> Create valuable and original content.</li>
                            <li className="flex items-center gap-2"><CheckCircle2 className="h-5 w-5 text-primary" /> Optimize internal links.</li>
                            <li className="flex items-center gap-2"><CheckCircle2 className="h-5 w-5 text-primary" /> Eliminate toxic backlinks.</li>
                            <li className="flex items-center gap-2"><CheckCircle2 className="h-5 w-5 text-primary" /> Check load speed and UX (user experience).</li>
                            <li className="flex items-center gap-2"><CheckCircle2 className="h-5 w-5 text-primary" /> Prevent spammy SEO.</li>
                        </ul>
                        <p className="text-gray-400 mt-6 border-l-4 border-primary pl-4">
                            Remember, DA and PA increase gradually. There are no shortcuts. Do not purchase backlinks that can raise the spam rating and lead to fines. It is essential to be patient and work hard.
                        </p>
                    </div>

                    {/* Features of Tool */}
                    <div>
                        <h2 className="text-2xl font-bold text-white mb-6">Features of Our SpamCheck Tool</h2>
                        <div className="grid sm:grid-cols-2 gap-4">
                            {[
                                "Single spam score check without login (up to 3 checks per day)",
                                "Bulk spam score checker for up to 50 websites (Login Required)",
                                "Detailed spam risk report",
                                "Clear indication of areas where the website is lacking",
                                "Beginner-friendly dashboard",
                                "Data-driven spam risk evaluation",
                                "Trusted by SEO professionals & agencies",
                                "Analyzes multiple signals to assess spam risk",
                                "Provides actionable insights to keep websites safe",
                                "Serves both beginners and experienced professionals"
                            ].map((feature, i) => (
                                <div key={i} className="flex gap-3 items-start">
                                    <div className="h-6 w-6 rounded-full bg-white/5 flex items-center justify-center flex-shrink-0 text-primary font-bold text-xs border border-white/10">{i + 1}</div>
                                    <span className="text-gray-400">{feature}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Conclusion */}
                    <div className="glass-dark p-8 rounded-3xl border border-primary/20 text-center">
                        <h2 className="text-2xl font-bold text-white mb-4">Conclusion</h2>
                        <p className="text-gray-400 leading-relaxed mb-6">
                            Protect your website and boost rankings with our Spam Score Checker. A high spam rating will hurt traffic, search engine optimization, and your brand name.
                        </p>
                        <p className="text-gray-400 leading-relaxed">
                            Check your site instantly, identify risky backlinks, and fix issues before they harm your search results. To compare your site's strength with your competitors', you can use the Domain Authority (DA) and Page Authority (PA) metrics. Wait no longer, track, enhance, and control your SEO performance today!
                        </p>
                    </div>

                </article>

                {/* --- FAQs Section (Accordion) --- */}
                <div className="glass-dark p-8 sm:p-12 rounded-[2.5rem] border border-white/5">
                    <div className="text-center mb-10">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-gray-400 text-xs font-bold uppercase tracking-wider mb-4">
                            <HelpCircle className="h-4 w-4" />
                            <span>Common Questions</span>
                        </div>
                        <h2 className="text-3xl font-bold text-white">Frequently Asked Questions</h2>
                    </div>

                    <div className="space-y-4">
                        <FAQItem
                            question="What is the spam score of a website?"
                            answer="Spam Score is an estimate of the likelihood that a website will be penalized by search engines for potentially spammy indicators, based on indicators typical of low-quality or penalized websites."
                        />
                        <FAQItem
                            question="What is a good score for spam?"
                            answer="A spam score below 2 indicates little risk. A score of 3 to 5 means moderate risk. Scores of 6 or above represent a high risk."
                        />
                        <FAQItem
                            question="What does a 1% spam score mean?"
                            answer="A score below 1 percent is low spam. A moderate level of spam consists of a score of 31-60. A score of 61 or higher indicates significant spam. Lower scores typically indicate safer websites."
                        />
                        <FAQItem
                            question="How can I improve my spam score?"
                            answer="You should remove bad backlinks to reduce your spam score, avoid paid or spammy links, improve content quality, use natural anchor text, and create authentic, relevant links."
                        />
                        <FAQItem
                            question="Does Domain Authority affect SEO?"
                            answer="Yes. Better search rankings, more organic traffic, and increased visibility are typically the result of higher domain authority."
                        />
                    </div>
                </div>

            </div>
        </section>
    );
}

function FAQItem({ question, answer }: { question: string, answer: React.ReactNode }) {
    return (
        <details className="group p-6 rounded-2xl bg-white/5 border border-white/5 open:bg-white/10 transition-colors duration-300">
            <summary className="flex items-center justify-between cursor-pointer list-none text-lg font-bold text-white">
                {question}
                <span className="ml-4 flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-white/10 group-open:bg-primary/20 transition-all">
                    {/* Plus Icon (Default) */}
                    <svg className="w-4 h-4 text-gray-400 group-open:hidden" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                    {/* Minus Icon (Open) */}
                    <svg className="w-4 h-4 text-primary hidden group-open:block" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                    </svg>
                </span>
            </summary>
            <div className="mt-4 text-gray-400 leading-relaxed animate-in fade-in slide-in-from-top-2">
                {answer}
            </div>
        </details>
    );
}
