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
      <section className="relative pt-20 pb-20 lg:pt-32 lg:pb-28 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-secondary/10 blur-3xl"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="inline-flex items-center px-4 py-2 rounded-full glass-dark border border-primary/30 text-sm font-medium mb-8">
            <span className="flex h-2 w-2 rounded-full bg-primary mr-2 animate-pulse"></span>
            <span className="text-gray-300">Trusted by 1,000+ SEO Professionals</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-white mb-6">
            Free <span className="text-gradient-blue">Spam Score Checker</span>
            <br className="hidden md:block" />
            & Domain Authority Tool
          </h1>

          <p className="mt-4 text-xl text-gray-400 max-w-2xl mx-auto mb-10">
            Instantly check <span className="font-semibold text-primary">Website Spam Score</span> and <span className="font-semibold text-secondary">Domain Authority (DA/PA)</span>. Detect toxic backlinks, fix SEO penalties, and analyze site reputation for free.
          </p>

          <form onSubmit={handleAnalyze} className="max-w-xl mx-auto mb-12 relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-primary to-secondary rounded-lg blur opacity-30 group-hover:opacity-60 transition duration-1000 group-hover:duration-200"></div>
            <div className="relative glass-dark rounded-lg p-2 shadow-2xl flex items-center border border-primary/20">
              <Search className="h-6 w-6 text-primary ml-3" />
              <input
                type="text"
                value={domain}
                onChange={(e) => setDomain(e.target.value)}
                placeholder="Enter domain (e.g. example.com)"
                className="flex-1 p-3 text-lg bg-transparent border-none focus:ring-0 text-white placeholder-gray-500 outline-none"
              />
              <button type="submit" className="bg-gradient-to-r from-primary to-primary-dark hover:from-primary-dark hover:to-primary text-white px-6 py-3 rounded-md font-medium transition-all shadow-lg shadow-primary/40 flex items-center">
                Analyze <ArrowRight className="ml-2 h-4 w-4" />
              </button>
            </div>
          </form>

          <div className="flex justify-center gap-8">
            <span className="text-gray-500 font-semibold">Trusted by 1,000+ SEO Professionals</span>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 bg-slate-950/50" id="features">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-white">Why SEO Sentinel?</h2>
            <p className="mt-4 text-gray-400">Most tools guess. We verify.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureCard
              icon={<BarChart3 className="h-8 w-8 text-primary" />}
              title="Domain Authority Checker"
              desc="Check accurate Domain Authority (DA) and Page Authority (PA) scores instantly. Understand your website's ranking power compared to competitors."
            />
            <FeatureCard
              icon={<ShieldAlert className="h-8 w-8 text-red-500" />}
              title="Website Toxicity Check"
              desc="Detect 27+ critical toxic signals including poison words, missing security headers, and link stuffing that cause Google penalties."
            />
            <FeatureCard
              icon={<Lock className="h-8 w-8 text-secondary" />}
              title="SEO Health & Security Audit"
              desc="Comprehensive security analysis including SSL verification, email visibility, and technical SEO hygiene to ensure your site is safe for visitors."
            />
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 bg-gradient-to-b from-slate-950/50 to-slate-950" id="pricing">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-white">Simple, Transparent Pricing</h2>
            <p className="mt-4 text-gray-400">Start for free, upgrade for power.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="glass-dark rounded-2xl p-8 border border-primary/20 hover:border-primary/40 transition-all">
              <h3 className="text-xl font-bold text-white">Guest / Free</h3>
              <div className="mt-4 flex items-baseline">
                <span className="text-4xl font-extrabold text-white">$0</span>
                <span className="ml-2 text-gray-400">/month</span>
              </div>
              <ul className="mt-6 space-y-4">
                <PricingCheck text="3 Checks per day" />
                <PricingCheck text="Basic Spam Score" />
                <PricingCheck text="Mock Data (Guest)" />
              </ul>
              <Link href="/signup" className="mt-8 block w-full py-3 px-4 rounded-lg border border-primary text-primary font-medium text-center hover:bg-primary/10 transition-colors">Start Free</Link>
            </div>

            <div className="glass-dark rounded-2xl p-8 border-2 border-primary relative overflow-hidden shadow-2xl shadow-primary/20">
              <div className="absolute top-0 right-0 bg-gradient-to-r from-primary to-secondary text-white text-xs font-bold px-3 py-1 rounded-bl-lg">POPULAR</div>
              <h3 className="text-xl font-bold text-white">Pro Analyst</h3>
              <div className="mt-4 flex items-baseline">
                <span className="text-4xl font-extrabold text-white">$19</span>
                <span className="ml-2 text-gray-400">/month</span>
              </div>
              <ul className="mt-6 space-y-4">
                <PricingCheck text="Unlimited Checks" />
                <PricingCheck text="Real-Time HTML Scraping" />
                <PricingCheck text="Authentic Moz DA/PA" />
                <PricingCheck text="AI Consultant Chat" />
              </ul>
              <Link href="/signup" className="mt-8 block w-full py-3 px-4 rounded-lg bg-gradient-to-r from-primary to-primary-dark text-white font-medium text-center hover:from-primary-dark hover:to-primary shadow-lg shadow-primary/40 transition-all">Get Pro</Link>
            </div>
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
