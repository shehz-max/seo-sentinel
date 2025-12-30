"use client";

import Link from "next/link";
import { ArrowRight, CheckCircle2, Search, BarChart3, ShieldAlert, Lock, Layers } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";

import { useAuth } from "@/contexts/AuthContext";
import HomeContent from "@/components/home/HomeContent";
import { hasGuestRemaining, incrementGuestUsage } from "@/lib/limits";

export default function Home() {
  const [domain, setDomain] = useState("");
  const router = useRouter();
  const { user } = useAuth();

  const handleAnalyze = (e: React.FormEvent) => {
    e.preventDefault();
    if (!domain) return;

    // If user is logged in, they are unlimited.
    if (user) {
      router.push(`/result/${encodeURIComponent(domain)}`);
      return;
    }

    // If guest, check limits
    if (hasGuestRemaining()) {
      incrementGuestUsage();
      router.push(`/result/${encodeURIComponent(domain)}`);
    } else {
      // Limit reached -> Redirect to Signup with context
      // We encode the return URL so they come back to results after signing up!
      const returnUrl = `/result/${encodeURIComponent(domain)}`;
      router.push(`/login?redirect=${encodeURIComponent(returnUrl)}`);
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

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white mb-6 leading-[1.1]">
            <span className="text-gradient-blue whitespace-nowrap">Free Spams Score Checker</span>
            <br />
            Check Website Spams Score & DA/PA
          </h1>

          <p className="mt-4 text-lg sm:text-xl text-gray-400 max-w-3xl mx-auto mb-10 leading-relaxed px-2">
            Use our free Moz spam score checker to instantly check <strong>spams score</strong>, <strong>website spams score</strong>, DA, PA, and toxic links. Spot risks fast.
          </p>

          <form onSubmit={handleAnalyze} className="max-w-xl mx-auto mb-12 relative group px-2">
            {/* ... keeping form input styling same ... */}
            <div className="absolute -inset-1 bg-gradient-to-r from-primary to-secondary rounded-xl blur opacity-30 group-hover:opacity-60 transition duration-1000"></div>
            <div className="relative glass-dark rounded-xl p-1.5 shadow-2xl flex flex-col sm:flex-row items-stretch sm:items-center border border-primary/20 gap-2">
              <div className="flex items-center flex-1 px-2">
                <Search className="h-5 w-5 text-primary ml-2 hidden sm:block" />
                <input
                  type="text"
                  value={domain}
                  onChange={(e) => setDomain(e.target.value)}
                  placeholder="Paste URLs (e.g. example.com)"
                  className="flex-1 p-3 text-base sm:text-lg bg-transparent border-none focus:ring-0 text-white placeholder-gray-500 outline-none w-full"
                />
              </div>
              <button type="submit" className="bg-gradient-to-r from-primary to-primary-dark hover:scale-[1.02] active:scale-95 text-white px-8 py-3.5 sm:py-3 rounded-lg font-bold transition-all shadow-lg shadow-primary/30 flex items-center justify-center whitespace-nowrap">
                Check Spams <ArrowRight className="ml-2 h-4 w-4" />
              </button>
            </div>
          </form>

          {/* ... keeping trust badges ... */}
          <div className="flex justify-center flex-wrap gap-4 sm:gap-8 opacity-60">
            {/* ... */}
          </div>

          {/* ... keeping Bulk CTA ... */}
          <Link href="/bulk" className="block p-1 rounded-2xl bg-gradient-to-br from-white/10 to-white/5 border border-white/10 hover:border-primary/40 transition-all hover:scale-[1.01] hover:shadow-2xl hover:shadow-primary/20 group-hover:bg-white/10">
            <div className="relative overflow-hidden rounded-xl glass-dark md:p-10 p-8 flex flex-col md:flex-row items-center gap-8">

              {/* Visual Icon/Graphic */}
              <div className="relative flex-shrink-0">
                <div className="absolute inset-0 bg-primary/20 blur-2xl rounded-full animate-pulse-slow"></div>
                <div className="relative h-20 w-20 rounded-2xl bg-gradient-to-br from-[#1a1f2e] to-[#0B0F19] border border-white/10 flex items-center justify-center shadow-inner">
                  <Layers className="h-10 w-10 text-primary" />
                </div>
                {/* Floating badges */}
                <div className="absolute -right-3 -top-3 px-2 py-1 bg-green-500/20 text-green-400 text-[10px] font-bold uppercase tracking-wider rounded border border-green-500/30 backdrop-blur-md">
                  New
                </div>
              </div>

              {/* Text Content */}
              <div className="text-center md:text-left flex-1 space-y-3">
                <h3 className="text-2xl font-bold text-white flex items-center justify-center md:justify-start gap-3">
                  Bulk Website Analyzer
                  <ArrowRight className="h-5 w-5 text-gray-500 group-hover:text-primary group-hover:translate-x-1 transition-all" />
                </h3>
                <p className="text-gray-400 max-w-md">
                  Have a list of domains? Analyze up to <span className="text-white font-bold">50 websites</span> at once. Get Spams Score, DA, and PA in seconds with one click.
                </p>
              </div>

              {/* Button Mockup */}
              <div className="flex-shrink-0">
                <span className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-white/5 border border-white/10 text-white font-semibold hover:bg-primary hover:border-primary/50 transition-all shadow-lg shadow-black/20">
                  Try Bulk Check Free
                </span>
              </div>
            </div>
          </Link>
        </div>
      </section>

      {/* Features Grid - UPDATED TO "Why Check Spam Score With Us?" */}
      <section className="py-16 sm:py-24 bg-slate-950/50" id="features">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-20">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Features of Our <span className="text-gradient-blue">SpamsCheck</span> Tool</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">High spams score kills rankings—don't wait for Google penalties. Here's why 1,000+ SEOs pick our tool:</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            <FeatureCard
              icon={<ShieldAlert className="h-8 w-8 text-primary" />}
              title="MOZ-Powered Accuracy"
              desc="Straight from MOZ API – spam score, DA, PA you can trust."
            />
            <FeatureCard
              icon={<Layers className="h-8 w-8 text-secondary" />}
              title="Bulk Free Checks"
              desc="Scan Bulk URLs at once, export Excel—faster than competitors."
            />
            <FeatureCard
              icon={<CheckCircle2 className="h-8 w-8 text-green-500" />}
              title="Actionable Fixes"
              desc="Spot toxic signals, spammy anchors & improve site hygiene."
            />
            <FeatureCard
              icon={<Lock className="h-8 w-8 text-blue-500" />}
              title="Zero Cost"
              desc="Unlimited use, privacy-safe—results in 30 seconds."
            />
          </div>
        </div>
      </section>

      {/* Content Section (SEO) */}
      <HomeContent />

      {/* CTA Section */}
      <section className="py-20 sm:py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-primary/20 via-transparent to-transparent"></div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="glass-dark px-6 py-10 sm:p-16 rounded-[2.5rem] border border-primary/30 shadow-2xl">
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
              No credit card required • 3 Free daily scans
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
