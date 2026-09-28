"use client";

/**
 * =====================================================================
 * Search Results Page (Screen 5)
 * ---------------------------------------------------------------------
 * PURPOSE:
 * Instant search and discovery page matching Screen 5.
 * Features:
 * 1. Live search input with immediate reactive filtering.
 * 2. "Showing results for '[query]'" counter header.
 * 3. Left category filter facets with match counts.
 * 4. Right side matched article cards.
 * Wrapped in Suspense boundary for Next.js App Router CSR compliance.
 * =====================================================================
 */

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { Search, Filter, BookOpen, Layers } from "lucide-react";
import ArticleCard from "@/components/blog/ArticleCard";
import { Article, Category } from "@/types";

function SearchContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const initialQuery = searchParams.get("q") || "";

  const [query, setQuery] = useState(initialQuery);
  const [activeCategory, setActiveCategory] = useState("all");
  const [articles, setArticles] = useState<Article[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const [artRes, catRes] = await Promise.all([
          fetch("/api/articles"),
          fetch("/api/categories"),
        ]);
        const artData = await artRes.json();
        const catData = await catRes.json();
        setArticles(artData);
        setCategories(catData);
      } catch (err) {
        console.error("Error fetching data:", err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.push(`/search?q=${encodeURIComponent(query.trim())}`);
  };

  // Filter matching articles based on search query and category
  const filteredArticles = articles.filter((article) => {
    const q = query.toLowerCase().trim();
    const matchesQuery =
      !q ||
      article.title.toLowerCase().includes(q) ||
      article.excerpt.toLowerCase().includes(q) ||
      article.content.toLowerCase().includes(q) ||
      article.tags.some((t) => t.toLowerCase().includes(q));

    const matchesCat =
      activeCategory === "all" ||
      article.categorySlug.toLowerCase() === activeCategory.toLowerCase();

    return matchesQuery && matchesCat;
  });

  return (
    <div className="space-y-8">
      {/* Top Header & Search Bar (Screen 5) */}
      <div className="space-y-4">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">
            Search Results
          </h1>
          <p className="text-sm text-slate-600 mt-1">
            {query ? (
              <>
                Showing results for{" "}
                <span className="font-bold text-brand-primary">&ldquo;{query}&rdquo;</span>
              </>
            ) : (
              "Search our complete library of technical tutorials and guides."
            )}
          </p>
        </div>

        <form onSubmit={handleSearchSubmit} className="max-w-xl flex items-center gap-2">
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="Search tutorials by keyword..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-3 bg-white border border-slate-300 rounded-xl shadow-xs focus:ring-2 focus:ring-brand-primary focus:outline-none text-slate-800"
            />
            <Search className="w-5 h-5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          </div>
          <button
            type="submit"
            className="px-6 py-3 bg-brand-primary hover:bg-blue-600 text-white font-semibold rounded-xl text-sm shadow-sm transition-all"
          >
            Search
          </button>
        </form>
      </div>

      {/* 2-Column Layout: Categories Facet Filter + Results (Screen 5) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* LEFT: Category Filters (Screen 5) */}
        <div className="lg:col-span-3">
          <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs space-y-3 sticky top-24">
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2 pb-2 border-b border-slate-100">
              <Filter className="w-4 h-4 text-brand-primary" />
              <span>Categories</span>
            </h3>

            <div className="space-y-1 text-xs sm:text-sm">
              <button
                onClick={() => setActiveCategory("all")}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-left transition-all ${
                  activeCategory === "all"
                    ? "bg-brand-primary text-white font-semibold"
                    : "text-slate-600 hover:bg-slate-50"
                }`}
              >
                <span>All</span>
                <span
                  className={`text-xs px-2 py-0.5 rounded-full ${
                    activeCategory === "all" ? "bg-white/20 text-white" : "bg-slate-100"
                  }`}
                >
                  {articles.length}
                </span>
              </button>

              {categories.map((cat) => {
                const countInSearch = articles.filter(
                  (a) => a.categorySlug.toLowerCase() === cat.slug.toLowerCase()
                ).length;

                return (
                  <button
                    key={cat.id}
                    onClick={() => setActiveCategory(cat.slug)}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-left transition-all ${
                      activeCategory === cat.slug
                        ? "bg-brand-primary text-white font-semibold"
                        : "text-slate-600 hover:bg-slate-50"
                    }`}
                  >
                    <span>{cat.name}</span>
                    <span
                      className={`text-xs px-2 py-0.5 rounded-full ${
                        activeCategory === cat.slug
                          ? "bg-white/20 text-white"
                          : "bg-slate-100 text-slate-500"
                      }`}
                    >
                      {countInSearch}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* RIGHT: Results Grid (Screen 5) */}
        <div className="lg:col-span-9 space-y-6">
          {loading ? (
            <div className="p-12 text-center text-slate-400">Loading tutorials...</div>
          ) : filteredArticles.length === 0 ? (
            <div className="p-12 text-center bg-white rounded-2xl border border-slate-200/80 space-y-4">
              <p className="text-slate-600 font-medium">
                No tutorials found matching your search.
              </p>
              <button
                onClick={() => {
                  setQuery("");
                  setActiveCategory("all");
                }}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-lg"
              >
                Clear Filters
              </button>
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
  );
}

export default function SearchResultsPage() {
  return (
    <div className="bg-slate-50 min-h-screen py-10 sm:py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Suspense
          fallback={
            <div className="p-12 text-center text-slate-400">
              Loading search results...
            </div>
          }
        >
          <SearchContent />
        </Suspense>
      </div>
    </div>
  );
}
