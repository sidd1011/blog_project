/**
 * =====================================================================
 * Blog & Tutorials Listing Page (Screen 2)
 * ---------------------------------------------------------------------
 * PURPOSE:
 * Displays the complete tutorials catalog matching Screen 2.
 * Features:
 * 1. Dark indigo gradient banner with title and tech illustration.
 * 2. Left CategorySidebar with active filter and live counts.
 * 3. Right main article feed with sorting and category filtering.
 * =====================================================================
 */

import React from "react";
import { Metadata } from "next";
import { getArticles, getCategories } from "@/lib/db";
import CategorySidebar from "@/components/blog/CategorySidebar";
import ArticleCard from "@/components/blog/ArticleCard";
import { BookOpen, Sparkles, Filter, Code } from "lucide-react";

export const metadata: Metadata = {
  title: "Blog & Tutorials – Web Development, QA Testing & DevOps",
  description:
    "Explore our complete collection of technical guides, hands-on tutorials, and articles on React, Cypress, Postman, Linux, and Cloud DevOps.",
  alternates: {
    canonical: "https://devlearn.in/blog",
  },
};

export const revalidate = 0;

interface BlogPageProps {
  searchParams?: {
    cat?: string;
    sort?: string;
  };
}

export default function BlogListingPage({ searchParams }: BlogPageProps) {
  const activeCategory = searchParams?.cat || "all";
  const sortBy = searchParams?.sort || "latest";

  const allArticles = getArticles();
  const categories = getCategories();

  // Filter articles by category if not 'all'
  let filteredArticles = allArticles;
  if (activeCategory && activeCategory !== "all") {
    filteredArticles = allArticles.filter(
      (art) =>
        art.categorySlug.toLowerCase() === activeCategory.toLowerCase() ||
        art.category.toLowerCase() === activeCategory.toLowerCase()
    );
  }

  // Sort articles
  if (sortBy === "popular") {
    filteredArticles = [...filteredArticles].sort((a, b) => b.views - a.views);
  } else {
    // Default latest
    filteredArticles = [...filteredArticles];
  }

  const activeCategoryObj = categories.find(
    (c) => c.slug.toLowerCase() === activeCategory.toLowerCase()
  );

  return (
    <div className="min-h-screen bg-slate-50">
      
      {/* 1. TOP HERO BANNER (Screen 2 Dark Header) */}
      <section className="bg-gradient-to-r from-slate-950 via-slate-900 to-indigo-950 text-white py-14 lg:py-20 border-b border-slate-800 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-brand-primary/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-3 max-w-2xl text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-white/10 text-blue-300 backdrop-blur-sm border border-white/10">
              <BookOpen className="w-3.5 h-3.5" />
              <span>DevLearn Learning Library</span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white">
              Blog & Tutorials
            </h1>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              Explore our latest articles, tutorials and guides on Web Development,
              QA, DevOps and more.
            </p>
          </div>

          {/* Banner Graphic Illustration */}
          <div className="hidden md:flex items-center gap-4 bg-white/5 border border-white/10 p-5 rounded-2xl backdrop-blur-md">
            <div className="w-12 h-12 rounded-xl bg-brand-primary/20 text-blue-400 flex items-center justify-center">
              <Code className="w-6 h-6" />
            </div>
            <div className="text-left text-xs">
              <p className="font-bold text-white text-sm">Real-World Code</p>
              <p className="text-slate-400">Step-by-step guides tested in production</p>
            </div>
          </div>
        </div>
      </section>

      {/* 2. MAIN CONTENT AREA (Screen 2: Sidebar + Feed) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT COLUMN: Categories Sidebar (Screen 2) */}
          <div className="lg:col-span-3">
            <div className="sticky top-24">
              <CategorySidebar
                categories={categories}
                activeCategory={activeCategory}
                totalArticlesCount={allArticles.length}
              />
            </div>
          </div>

          {/* RIGHT COLUMN: Articles Feed (Screen 2) */}
          <div className="lg:col-span-9 space-y-6">
            
            {/* Header with Title and Sorting */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-200 gap-4">
              <div>
                <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
                  {activeCategoryObj ? activeCategoryObj.name : "All Articles"}
                  <span className="ml-2 text-sm font-normal text-slate-500">
                    ({filteredArticles.length})
                  </span>
                </h2>
                {activeCategoryObj && (
                  <p className="text-xs text-slate-500 mt-0.5">
                    {activeCategoryObj.description}
                  </p>
                )}
              </div>

              {/* Sort Pill Dropdown */}
              <div className="flex items-center gap-2 text-xs">
                <span className="text-slate-500 font-medium">Sort by:</span>
                <a
                  href={`/blog?cat=${activeCategory}&sort=latest`}
                  className={`px-3 py-1.5 rounded-lg border font-semibold transition-all ${
                    sortBy === "latest"
                      ? "bg-white border-brand-primary text-brand-primary shadow-xs"
                      : "bg-slate-100 border-slate-200 text-slate-600 hover:bg-slate-200"
                  }`}
                >
                  Latest
                </a>
                <a
                  href={`/blog?cat=${activeCategory}&sort=popular`}
                  className={`px-3 py-1.5 rounded-lg border font-semibold transition-all ${
                    sortBy === "popular"
                      ? "bg-white border-brand-primary text-brand-primary shadow-xs"
                      : "bg-slate-100 border-slate-200 text-slate-600 hover:bg-slate-200"
                  }`}
                >
                  Most Popular
                </a>
              </div>
            </div>

            {/* Articles Grid */}
            {filteredArticles.length === 0 ? (
              <div className="p-12 text-center bg-white rounded-2xl border border-slate-200/80">
                <p className="text-slate-500 font-medium">
                  No articles found in this category yet.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredArticles.map((article) => (
                  <ArticleCard key={article.id} article={article} />
                ))}
              </div>
            )}

          </div>

        </div>
      </div>

    </div>
  );
}
