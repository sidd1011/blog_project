/**
 * =====================================================================
 * LatestArticles Component
 * ---------------------------------------------------------------------
 * PURPOSE:
 * Displays the "Latest Articles" section on the homepage matching Screen 1.
 * Shows a responsive 3-column grid of recent guides with a "View all →"
 * call-to-action button linking directly to the full tutorials catalog.
 * =====================================================================
 */

import React from "react";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import ArticleCard from "@/components/blog/ArticleCard";
import { Article } from "@/types";

interface LatestArticlesProps {
  articles: Article[];
}

export default function LatestArticles({ articles }: LatestArticlesProps) {
  return (
    <section className="py-16 sm:py-20 bg-slate-50/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold tracking-wider uppercase text-brand-primary mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Fresh Knowledge</span>
            </div>
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
              Latest Articles
            </h2>
          </div>

          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm font-semibold text-brand-primary hover:text-blue-700 group transition-colors"
          >
            <span>View all</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* 3-Column Responsive Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {articles.slice(0, 6).map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>

      </div>
    </section>
  );
}
