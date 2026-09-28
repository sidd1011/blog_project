/**
 * =====================================================================
 * Categories Page (Screen 4)
 * ---------------------------------------------------------------------
 * PURPOSE:
 * Displays all categories in an organized card grid matching Screen 4.
 * Features:
 * 1. Category name, count, custom icon, and clear description.
 * 2. Bottom beginner-friendly CTA banner ("Not sure where to start?").
 * =====================================================================
 */

import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import {
  Code2,
  FileCode,
  CheckCircle2,
  Network,
  Server,
  Terminal,
  Search,
  Wrench,
  Layers,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import { getCategories } from "@/lib/db";

export const metadata: Metadata = {
  title: "Categories – Browse Web Dev, QA & DevOps Tutorials",
  description:
    "Explore tutorials categorized by React, JavaScript, QA & Cypress testing, REST APIs, Docker, Linux, and Technical SEO.",
  alternates: {
    canonical: "https://devlearn.in/categories",
  },
};

export const revalidate = 0;

export default function CategoriesPage() {
  const categories = getCategories();

  // Helper to map icon string to Lucide component
  const renderCategoryIcon = (iconName: string) => {
    const iconClass = "w-6 h-6";
    switch (iconName) {
      case "Code2":
        return <Code2 className={iconClass} />;
      case "FileCode":
        return <FileCode className={iconClass} />;
      case "CheckCircle2":
        return <CheckCircle2 className={iconClass} />;
      case "Network":
        return <Network className={iconClass} />;
      case "Server":
        return <Server className={iconClass} />;
      case "Terminal":
        return <Terminal className={iconClass} />;
      case "Search":
        return <Search className={iconClass} />;
      case "Wrench":
        return <Wrench className={iconClass} />;
      default:
        return <Layers className={iconClass} />;
    }
  };

  return (
    <div className="bg-slate-50 min-h-screen py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header Title & Subtitle (Screen 4) */}
        <div className="text-left space-y-2">
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Categories
          </h1>
          <p className="text-slate-600 text-sm sm:text-base">
            Browse articles by category and find what you need.
          </p>
        </div>

        {/* Categories Grid (Screen 4) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {categories.map((cat) => (
            <Link
              key={cat.id}
              href={`/blog?cat=${cat.slug}`}
              className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-7 shadow-xs hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-2xl bg-blue-50 text-brand-primary flex items-center justify-center group-hover:scale-110 transition-transform">
                    {renderCategoryIcon(cat.icon)}
                  </div>
                  <span className="text-xs font-bold text-slate-500 bg-slate-100 px-3 py-1 rounded-full">
                    {cat.count} Articles
                  </span>
                </div>

                <div>
                  <h2 className="text-xl font-bold text-slate-900 group-hover:text-brand-primary transition-colors">
                    {cat.name}
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mt-2 line-clamp-2">
                    {cat.description}
                  </p>
                </div>
              </div>

              <div className="pt-5 mt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-brand-primary">
                <span>View All Articles</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          ))}
        </div>

        {/* Bottom CTA Banner (Screen 4: Not sure where to start?) */}
        <div className="bg-white rounded-3xl border border-blue-200/80 p-6 sm:p-8 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4 text-left">
            <div className="w-12 h-12 rounded-2xl bg-blue-100 text-brand-primary flex items-center justify-center shrink-0">
              <Sparkles className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900">
                Not sure where to start?
              </h3>
              <p className="text-xs sm:text-sm text-slate-600">
                Check out our beginner-friendly tutorials and get started today!
              </p>
            </div>
          </div>

          <Link
            href="/blog"
            className="px-6 py-3 rounded-xl bg-brand-primary hover:bg-blue-600 text-white font-bold text-xs sm:text-sm shadow-md shadow-brand-primary/20 shrink-0 transition-all"
          >
            View Tutorials
          </Link>
        </div>

      </div>
    </div>
  );
}
