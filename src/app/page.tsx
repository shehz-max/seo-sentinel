"use client";

import Link from "next/link";
import { ArrowRight, CheckCircle2, Search, BarChart3, ShieldAlert, Lock } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const [domain, setDomain] = useState("");
  const router = useRouter();

  const handleAnalyze = (e: React.FormEvent) => {
    e.preventDefault();
    if (domain) {
      // Encode to handle pure domains or full URLs safely
      router.push(`/result/${encodeURIComponent(domain)}`);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-24 pb-16 lg:pt-32 lg:pb-28 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-secondary/10 blur-3xl"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="inline-flex items-center px-4 py-2 rounded-full glass-dark border border-primary/30 text-xs sm:text-sm font-medium mb-8">
            <span className="flex h-2 w-2 rounded-full bg-primary mr-2 animate-pulse"></span>
            <span className="text-gray-300">Trusted by 1,000+ SEO Professionals</span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-7xl font-extrabold tracking-tight text-white mb-6 leading-[1.1]">
            Free <span className="text-gradient-blue whitespace-nowrap">Spam Score</span>
            <br />
            Checker & SEO Tools
          </h1>

          <p className="mt-4 text-lg sm:text-xl text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed px-2">
            Instantly check <span className="font-semibold text-primary">Website Spam Score</span> and <span className="font-semibold text-secondary">Domain Authority</span>. Detect toxic signals and fix penalties.
          </p>

          <form onSubmit={handleAnalyze} className="max-w-xl mx-auto mb-12 relative group px-2">
            <div className="absolute -inset-1 bg-gradient-to-r from-primary to-secondary rounded-xl blur opacity-30 group-hover:opacity-60 transition duration-1000"></div>
            <div className="relative glass-dark rounded-xl p-1.5 shadow-2xl flex flex-col sm:flex-row items-stretch sm:items-center border border-primary/20 gap-2">
              <div className="flex items-center flex-1 px-2">
                <Search className="h-5 w-5 text-primary ml-2 hidden sm:block" />
                <input
                  type="text"
                  value={domain}
                  onChange={(e) => setDomain(e.target.value)}
                  placeholder="Enter domain (e.g. example.com)"
                  className="flex-1 p-3 text-base sm:text-lg bg-transparent border-none focus:ring-0 text-white placeholder-gray-500 outline-none w-full"
                />
              </div>
              <button type="submit" className="bg-gradient-to-r from-primary to-primary-dark hover:scale-[1.02] active:scale-95 text-white px-8 py-3.5 sm:py-3 rounded-lg font-bold transition-all shadow-lg shadow-primary/30 flex items-center justify-center whitespace-nowrap">
                Analyze <ArrowRight className="ml-2 h-4 w-4" />
              </button>
            </div>
          </form>

          <div className="flex justify-center flex-wrap gap-4 sm:gap-8 opacity-60">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-gray-400">
              <CheckCircle2 className="h-4 w-4 text-primary" /> Moz Data
            </div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-gray-400">
              <CheckCircle2 className="h-4 w-4 text-primary" /> AI Insights
            </div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-gray-400">
              <CheckCircle2 className="h-4 w-4 text-primary" /> Instant Audit
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-16 sm:py-24 bg-slate-950/50" id="features">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-20">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Why SEO Sentinel?</h2>
            <p className="text-gray-400">Most tools guess. We verify with real-time signal analysis.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            <FeatureCard
              icon={<BarChart3 className="h-8 w-8 text-primary" />}
              title="Authority Checker"
              desc="Check accurate Domain Authority (DA) and Page Authority (PA) scores instantly. Understand your website's ranking power."
            />
            <FeatureCard
              icon={<ShieldAlert className="h-8 w-8 text-red-500" />}
              title="Toxicity Audit"
              desc="Detect 27+ critical toxic signals including poison words and link stuffing that cause search engine penalties."
            />
            <FeatureCard
              icon={<Lock className="h-8 w-8 text-secondary" />}
              title="SEO Hygiene"
              desc="Comprehensive analysis including SSL verification and email visibility to ensure your site is safe for visitors."
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 sm:py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-primary/20 via-transparent to-transparent"></div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="glass-dark p-8 sm:p-16 rounded-[2.5rem] border border-primary/30 shadow-2xl">
            <h2 className="text-3xl sm:text-5xl font-bold text-white mb-6">
              Ready to <span className="text-gradient-blue">Dominate?</span>
            </h2>
            <p className="text-lg text-gray-400 mb-10 leading-relaxed">
              Join 1,000+ website owners who use SEO Sentinel to keep their domains safe and authoritative.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link href="/signup" className="w-full sm:w-auto px-10 py-4 rounded-xl bg-gradient-to-r from-primary to-primary-dark text-white font-bold text-lg hover:scale-105 transition-all shadow-lg shadow-primary/40">
                Get Started Free
              </Link>
              <Link href="/about" className="w-full sm:w-auto px-10 py-4 rounded-xl border border-gray-700 text-gray-300 font-bold text-lg hover:bg-gray-800 transition-all">
                Learn More
              </Link>
            </div>
            <p className="mt-8 text-sm text-gray-500">
              No credit card required • 1 Free daily scan
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

function FeatureCard({ icon, title, desc }: { icon: React.ReactNode, title: string, desc: string }) {
  return (
    <div className="glass-dark p-8 rounded-xl border border-primary/20 hover:border-primary/40 hover:shadow-xl hover:shadow-primary/10 transition-all group">
      <div className="bg-gradient-to-br from-primary/20 to-secondary/20 p-3 rounded-lg inline-block mb-4 group-hover:scale-110 transition-transform">
        {icon}
      </div>
      <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
      <p className="text-gray-400 leading-relaxed">{desc}</p>
    </div>
  );
}

function PricingCheck({ text }: { text: string }) {
  return (
    <li className="flex items-center text-gray-300">
      <CheckCircle2 className="h-5 w-5 text-primary mr-3 flex-shrink-0" />
      {text}
    </li>
  );
}
