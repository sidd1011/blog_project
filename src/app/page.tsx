/**
 * =====================================================================
 * Home Page (Screen 1)
 * ---------------------------------------------------------------------
 * PURPOSE:
 * Landing page matching Screen 1 from the design.
 * Features:
 * 1. HeroSection with welcome badge, H1, search box, topic pills,
 *    and 3D animated floating tech badges.
 * 2. Latest Articles grid displaying all 6 articles from the image:
 *    - React Website Deploy Kaise Karein – Step by Step Guide
 *    - Postman API Testing Tutorial for Beginners
 *    - Cypress Testing for Beginners – Complete Guide
 *    - Grafana + Prometheus Setup for Monitoring
 *    - Google Search Console Indexing Issues Kaise Fix Karein
 *    - Linux Commands for Developers – Must Know
 * 3. Highlights & CTA to browse all categories or subscribe.
 * =====================================================================
 */

import React from "react";
import Link from "next/link";
import HeroSection from "@/components/home/HeroSection";
import LatestArticles from "@/components/home/LatestArticles";
import { getArticles, getCategories } from "@/lib/db";
import { BookOpen, Code2, ShieldCheck, Terminal, Rocket, ArrowRight } from "lucide-react";

export const revalidate = 0; // Fresh content on load

export default function HomePage() {
  const articles = getArticles();
  const categories = getCategories();

  return (
    <div className="flex flex-col">
      {/* 1. HERO SECTION (Screen 1) */}
      <HeroSection />

      {/* 2. LATEST ARTICLES GRID (Screen 1) */}
      <LatestArticles articles={articles} />

      {/* 3. FEATURED TOPIC TRACKS */}
      <section className="py-16 bg-white border-t border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
              Explore Our Core Learning Tracks
            </h2>
            <p className="text-slate-600 text-sm sm:text-base">
              From front-end UI engineering to end-to-end automated testing and cloud deployment.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* Track 1: Modern Web */}
            <div className="p-6 rounded-2xl border border-slate-200/80 bg-slate-50 hover:bg-white hover:border-brand-primary/40 hover:shadow-lg transition-all group">
              <div className="w-12 h-12 rounded-xl bg-blue-100 text-brand-primary flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Code2 className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-1">Web Development</h3>
              <p className="text-xs text-slate-600 leading-relaxed mb-4">
                React, Next.js, JavaScript deep dives, state machines, and performant UI architectures.
              </p>
              <Link
                href="/blog?cat=react"
                className="text-xs font-bold text-brand-primary hover:text-blue-700 flex items-center gap-1"
              >
                <span>Explore React Guides</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Track 2: QA & Automation */}
            <div className="p-6 rounded-2xl border border-slate-200/80 bg-slate-50 hover:bg-white hover:border-emerald-500/40 hover:shadow-lg transition-all group">
              <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-1">QA & Automation</h3>
              <p className="text-xs text-slate-600 leading-relaxed mb-4">
                Cypress E2E, Postman test scripts, API contract testing, and regression suites.
              </p>
              <Link
                href="/blog?cat=qa-testing"
                className="text-xs font-bold text-emerald-600 hover:text-emerald-700 flex items-center gap-1"
              >
                <span>View Testing Guides</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Track 3: DevOps & Cloud */}
            <div className="p-6 rounded-2xl border border-slate-200/80 bg-slate-50 hover:bg-white hover:border-purple-500/40 hover:shadow-lg transition-all group">
              <div className="w-12 h-12 rounded-xl bg-purple-100 text-brand-secondary flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Rocket className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-1">DevOps & Cloud</h3>
              <p className="text-xs text-slate-600 leading-relaxed mb-4">
                Docker, Kubernetes, Prometheus, Grafana monitoring, and continuous deployment workflows.
              </p>
              <Link
                href="/blog?cat=devops"
                className="text-xs font-bold text-brand-secondary hover:text-purple-700 flex items-center gap-1"
              >
                <span>Check DevOps Tracks</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Track 4: Linux & SEO */}
            <div className="p-6 rounded-2xl border border-slate-200/80 bg-slate-50 hover:bg-white hover:border-amber-500/40 hover:shadow-lg transition-all group">
              <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Terminal className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-1">Linux & Systems</h3>
              <p className="text-xs text-slate-600 leading-relaxed mb-4">
                Command-line mastery, server permissions, SSH tunnels, shell automation, and speed tweaks.
              </p>
              <Link
                href="/blog?cat=linux"
                className="text-xs font-bold text-amber-700 hover:text-amber-800 flex items-center gap-1"
              >
                <span>Read Linux Guides</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

          </div>
        </div>
      </section>

      {/* 4. CALL TO ACTION BANNER */}
      <section className="py-16 bg-gradient-to-r from-brand-primary to-brand-secondary text-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center space-y-6">
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight">
            Ready to Accelerate Your Tech Career?
          </h2>
          <p className="text-base sm:text-lg text-blue-100 max-w-2xl mx-auto leading-relaxed">
            Join thousands of developers mastering React, QA Testing, and Cloud engineering with
            clear, real-world tutorials.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <Link
              href="/blog"
              className="px-6 py-3.5 rounded-xl bg-white text-brand-primary font-bold text-sm shadow-lg hover:bg-blue-50 transition-all"
            >
              Browse All Tutorials
            </Link>
            <Link
              href="/categories"
              className="px-6 py-3.5 rounded-xl bg-blue-700/60 hover:bg-blue-700 text-white font-semibold text-sm border border-blue-400/40 transition-all"
            >
              Explore Categories
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
