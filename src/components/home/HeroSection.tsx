"use client";

/**
 * =====================================================================
 * HeroSection Component
 * ---------------------------------------------------------------------
 * PURPOSE:
 * Displays the primary landing hero matching Screen 1.
 * Features:
 * - "👋 Welcome to DevLearn" badge
 * - "Learn. Build. Grow." primary H1 headline
 * - Search bar with direct submit to /search?q=...
 * - Popular topic pills (React, Cypress, API Testing, Docker, Linux, SEO)
 * - Animated tech illustration on the right with floating badges
 *   (React, JavaScript, Terminal, Docker)
 * =====================================================================
 */

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Search, Sparkles, Terminal, Code2, Cpu, CheckCircle } from "lucide-react";

export default function HeroSection() {
  const router = useRouter();
  const [query, setQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query.trim())}`);
    }
  };

  const topicPills = [
    { name: "React", href: "/blog?cat=react" },
    { name: "Cypress", href: "/blog?cat=qa-testing" },
    { name: "API Testing", href: "/blog?cat=api" },
    { name: "Docker", href: "/blog?cat=devops" },
    { name: "Linux", href: "/blog?cat=linux" },
    { name: "SEO", href: "/blog?cat=seo" },
  ];

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-blue-50/50 via-white to-slate-50/50 pt-12 pb-16 lg:pt-20 lg:pb-24 border-b border-slate-200/60">
      
      {/* Subtle Background Glow Orbs */}
      <div className="absolute top-10 left-1/4 w-72 h-72 bg-blue-300/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-80 h-80 bg-purple-300/20 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* LEFT COLUMN: HERO CONTENT */}
          <div className="lg:col-span-7 space-y-6 text-left">
            
            {/* 1. Welcome Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-blue-50 border border-blue-200/80 text-brand-primary shadow-xs">
              <span className="text-sm">👋</span>
              <span>Welcome to DevLearn</span>
            </div>

            {/* 2. Primary H1 Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-[1.12]">
              Learn. Build. Grow.
            </h1>

            {/* 3. Subtitle description */}
            <p className="text-base sm:text-lg text-slate-600 max-w-xl leading-relaxed">
              Practical guides, tutorials and real-world examples for Web
              Development, QA Testing, DevOps and more.
            </p>

            {/* 4. Search Form */}
            <form onSubmit={handleSearch} className="max-w-lg flex items-center gap-2 pt-2">
              <div className="relative flex-1">
                <input
                  type="text"
                  placeholder="Search articles, topics or keywords..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 sm:py-3.5 text-sm sm:text-base bg-white border border-slate-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-brand-primary text-slate-800 placeholder-slate-400 transition-all"
                />
                <Search className="w-5 h-5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              </div>
              <button
                type="submit"
                className="px-5 sm:px-6 py-3 sm:py-3.5 bg-brand-primary hover:bg-blue-600 text-white font-semibold text-sm sm:text-base rounded-xl shadow-md shadow-brand-primary/25 hover:shadow-lg transition-all"
              >
                Search
              </button>
            </form>

            {/* 5. Popular Topics Quick Filter Pills */}
            <div className="pt-2 flex flex-wrap items-center gap-2 text-xs font-medium text-slate-500">
              <span className="text-slate-400 font-semibold mr-1">Popular:</span>
              {topicPills.map((pill) => (
                <Link
                  key={pill.name}
                  href={pill.href}
                  className="px-3 py-1 bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 rounded-lg shadow-2xs hover:border-brand-primary/40 transition-all"
                >
                  {pill.name}
                </Link>
              ))}
            </div>

          </div>

          {/* RIGHT COLUMN: 3D TECH VISUAL ILLUSTRATION */}
          <div className="lg:col-span-5 relative flex justify-center items-center">
            
            {/* Visual Workspace Canvas */}
            <div className="relative w-full max-w-md aspect-square bg-gradient-to-tr from-slate-900 to-indigo-950 rounded-3xl p-6 shadow-2xl border border-slate-800 flex flex-col justify-between overflow-hidden">
              
              {/* Top Bar with mock macOS window buttons */}
              <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500" />
                  <div className="w-3 h-3 rounded-full bg-green-500" />
                </div>
                <div className="text-[11px] font-mono text-slate-400">
                  ~/devlearn-workspace
                </div>
                <div className="w-3 h-3" />
              </div>

              {/* Code Editor Snippet Body */}
              <div className="font-mono text-xs text-slate-300 space-y-2 py-4">
                <p className="text-slate-500">// Build & deploy in production</p>
                <p>
                  <span className="text-purple-400">const</span>{" "}
                  <span className="text-blue-400">deployApp</span> ={" "}
                  <span className="text-yellow-400">async</span> () =&gt; &#123;
                </p>
                <p className="pl-4">
                  <span className="text-purple-400">await</span>{" "}
                  <span className="text-emerald-400">runTestSuite</span>();
                </p>
                <p className="pl-4">
                  <span className="text-purple-400">return</span>{" "}
                  <span className="text-emerald-400">&apos;🚀 Live on Vercel&apos;</span>;
                </p>
                <p>&#125;;</p>
                <div className="pt-2 text-emerald-400 text-[11px] flex items-center gap-1.5">
                  <CheckCircle className="w-3.5 h-3.5" />
                  <span>All 48 tests passing (100% coverage)</span>
                </div>
              </div>

              {/* Bottom Interactive Terminal Status */}
              <div className="bg-slate-950/80 rounded-xl p-3 border border-slate-800 text-[11px] font-mono text-slate-400 flex items-center justify-between">
                <div className="flex items-center gap-2 text-emerald-400">
                  <Terminal className="w-3.5 h-3.5" />
                  <span>Next.js 14 • Ready in 120ms</span>
                </div>
                <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 text-[10px] font-bold">
                  PASS
                </span>
              </div>

            </div>

            {/* FLOATING BADGE 1: React Logo */}
            <div className="absolute -top-4 -left-4 sm:-left-6 bg-white p-3 rounded-2xl shadow-xl border border-slate-100 flex items-center gap-2.5 animate-float-slow">
              <div className="w-8 h-8 rounded-lg bg-sky-50 flex items-center justify-center text-sky-500">
                <Code2 className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-900">React 19</p>
                <p className="text-[10px] text-slate-500">Components & Hooks</p>
              </div>
            </div>

            {/* FLOATING BADGE 2: QA & Automation */}
            <div className="absolute -bottom-4 -right-4 sm:-right-6 bg-white p-3 rounded-2xl shadow-xl border border-slate-100 flex items-center gap-2.5 animate-float-slow" style={{ animationDelay: "2s" }}>
              <div className="w-8 h-8 rounded-lg bg-emerald-50 flex items-center justify-center text-emerald-600">
                <CheckCircle className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-900">Cypress & Postman</p>
                <p className="text-[10px] text-slate-500">Automated E2E</p>
              </div>
            </div>

            {/* FLOATING BADGE 3: DevOps & Prometheus */}
            <div className="absolute top-1/2 -right-6 sm:-right-8 -translate-y-1/2 bg-white px-3 py-2 rounded-xl shadow-lg border border-slate-100 hidden sm:flex items-center gap-2 animate-float-slow" style={{ animationDelay: "1s" }}>
              <div className="w-2.5 h-2.5 rounded-full bg-brand-secondary animate-pulse" />
              <span className="text-xs font-semibold text-slate-800">Docker & DevOps</span>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
