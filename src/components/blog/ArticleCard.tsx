/**
 * =====================================================================
 * ArticleCard Component
 * ---------------------------------------------------------------------
 * PURPOSE:
 * Reusable card displaying an article in grids across Home, Blog Listing,
 * Categories, and Search Results pages.
 * Features:
 * - Category badge with distinct styling
 * - Optimized image with semantic alt attribute
 * - Fast internal link to `/blog/[slug]`
 * - Reading time and publication date
 * - Author information
 * =====================================================================
 */

import React from "react";
import Link from "next/link";
import { Clock, Calendar, ArrowUpRight, User } from "lucide-react";
import { Article } from "@/types";

interface ArticleCardProps {
  article: Article;
  featured?: boolean;
}

export default function ArticleCard({ article, featured = false }: ArticleCardProps) {
  // Category badge colors mapping
  const categoryStyles: Record<string, string> = {
    React: "bg-blue-50 text-brand-primary border-blue-200",
    "QA & Testing": "bg-emerald-50 text-emerald-600 border-emerald-200",
    API: "bg-orange-50 text-orange-600 border-orange-200",
    DevOps: "bg-purple-50 text-brand-secondary border-purple-200",
    Linux: "bg-amber-50 text-amber-700 border-amber-200",
    SEO: "bg-teal-50 text-teal-600 border-teal-200",
  };

  const badgeClass =
    categoryStyles[article.category] || "bg-slate-100 text-slate-700 border-slate-200";

  return (
    <article className="group bg-white rounded-2xl border border-slate-200/80 shadow-xs hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col overflow-hidden">
      
      {/* Featured Image Banner */}
      <Link
        href={`/blog/${article.slug}`}
        className="relative aspect-[16/10] overflow-hidden bg-slate-100 block"
        tabIndex={-1}
      >
        <img
          src={article.featuredImage}
          alt={article.imageAlt || article.title}
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
        />
        
        {/* Category Pill Tag Overlay */}
        <div className="absolute top-3 left-3">
          <span
            className={`inline-block px-3 py-1 rounded-full text-xs font-bold border tracking-wide uppercase shadow-xs ${badgeClass}`}
          >
            {article.category}
          </span>
        </div>
      </Link>

      {/* Card Content Area */}
      <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between space-y-4">
        
        <div className="space-y-2.5">
          {/* Article Title */}
          <h3 className="text-lg sm:text-xl font-bold text-slate-900 group-hover:text-brand-primary transition-colors leading-snug line-clamp-2">
            <Link href={`/blog/${article.slug}`}>
              {article.title}
            </Link>
          </h3>

          {/* Excerpt */}
          <p className="text-sm text-slate-600 line-clamp-2 leading-relaxed">
            {article.excerpt}
          </p>
        </div>

        {/* Metadata Footer */}
        <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
          
          {/* Date & Read Time */}
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-slate-400" />
              <span>{article.publishedAt}</span>
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-slate-400" />
              <span>{article.readingTime}</span>
            </span>
          </div>

          {/* Arrow Icon */}
          <span className="text-slate-400 group-hover:text-brand-primary group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform">
            <ArrowUpRight className="w-4 h-4" />
          </span>
        </div>

      </div>
    </article>
  );
}
