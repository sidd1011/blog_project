/**
 * =====================================================================
 * About Page (Screen 6)
 * ---------------------------------------------------------------------
 * PURPOSE:
 * Explains DevLearn's background, values, and community mission
 * matching Screen 6.
 * Features:
 * 1. Dark header banner with description.
 * 2. "Our Mission" card with 3 pillars: Learn, Build, Grow.
 * 3. "Our Story" section with the core motto "Better Code. Better Future."
 * =====================================================================
 */

import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import { BookOpen, Hammer, TrendingUp, Sparkles, Heart, Code2, Users } from "lucide-react";

export const metadata: Metadata = {
  title: "About DevLearn – Our Story, Mission & Community",
  description:
    "We are passionate developers sharing practical knowledge on Web Development, QA Automation, and DevOps to help engineers grow worldwide.",
  alternates: {
    canonical: "https://devlearn.in/about",
  },
};

export default function AboutPage() {
  return (
    <div className="bg-slate-50 min-h-screen">
      
      {/* 1. HEADER BANNER (Screen 6) */}
      <section className="bg-gradient-to-r from-slate-950 via-slate-900 to-indigo-950 text-white py-16 sm:py-20 text-center relative overflow-hidden">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-brand-primary/15 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10 space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-semibold bg-white/10 text-blue-300 border border-white/10">
            <Heart className="w-3.5 h-3.5 text-red-400" />
            <span>Community Driven</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black tracking-tight">
            About DevLearn
          </h1>

          <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
            We are passionate developers who love to share knowledge and help
            others grow in their tech journey.
          </p>
        </div>
      </section>

      {/* 2. OUR MISSION PILLARS (Screen 6) */}
      <section className="py-16 sm:py-20 max-w-5xl mx-auto px-4 sm:px-6">
        <div className="bg-white rounded-3xl border border-slate-200/80 p-8 sm:p-12 shadow-sm space-y-10 text-center">
          
          <div className="space-y-2">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              Our Mission
            </h2>
            <p className="text-slate-600 text-sm sm:text-base max-w-xl mx-auto">
              To create high-quality, easy-to-follow tutorials and guides that help
              developers learn, build and their their skills.
            </p>
          </div>

          {/* 3 Pillars */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 pt-4">
            
            {/* Pillar 1: Learn */}
            <div className="p-6 rounded-2xl bg-blue-50/50 border border-blue-100 flex flex-col items-center space-y-3">
              <div className="w-14 h-14 rounded-2xl bg-blue-100 text-brand-primary flex items-center justify-center shadow-xs">
                <BookOpen className="w-7 h-7" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">Learn</h3>
              <p className="text-xs text-slate-600">Step by step guides</p>
            </div>

            {/* Pillar 2: Build */}
            <div className="p-6 rounded-2xl bg-purple-50/50 border border-purple-100 flex flex-col items-center space-y-3">
              <div className="w-14 h-14 rounded-2xl bg-purple-100 text-brand-secondary flex items-center justify-center shadow-xs">
                <Hammer className="w-7 h-7" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">Build</h3>
              <p className="text-xs text-slate-600">Real world examples</p>
            </div>

            {/* Pillar 3: Grow */}
            <div className="p-6 rounded-2xl bg-emerald-50/50 border border-emerald-100 flex flex-col items-center space-y-3">
              <div className="w-14 h-14 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center shadow-xs">
                <TrendingUp className="w-7 h-7" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">Grow</h3>
              <p className="text-xs text-slate-600">For a better tomorrow</p>
            </div>

          </div>

        </div>
      </section>

      {/* 3. OUR STORY SECTION (Screen 6) */}
      <section className="pb-20 max-w-5xl mx-auto px-4 sm:px-6">
        <div className="bg-white rounded-3xl border border-slate-200/80 p-8 sm:p-12 shadow-sm space-y-6">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            Our Story
          </h2>

          <div className="space-y-4 text-slate-600 text-sm sm:text-base leading-relaxed">
            <p>
              DevLearn started as a small idea to share our learning journey in web
              development and QA. We noticed that while there were hundreds of docs
              available online, very few broke down end-to-end practical workflows:
              from writing a React component to testing it with Cypress and deploying
              it smoothly on cloud infrastructure.
            </p>
            <p>
              Today, it&apos;s a growing community of learners, developers and testers
              working together to write better software.
            </p>
          </div>

          {/* Quote Banner */}
          <div className="pt-4">
            <blockquote className="p-6 rounded-2xl bg-blue-50 border-l-4 border-brand-primary text-brand-primary font-bold text-lg sm:text-xl italic">
              &ldquo;Better Code. Better Future.&rdquo;
            </blockquote>
          </div>
        </div>
      </section>

    </div>
  );
}
