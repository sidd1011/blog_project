"use client";

/**
 * =====================================================================
 * CategorySidebar Component
 * ---------------------------------------------------------------------
 * PURPOSE:
 * Displays the categories filter sidebar on the Blog & Tutorials listing
 * page matching Screen 2.
 * Includes dynamic counts for each category (e.g. All, React, QA & Testing,
 * API, DevOps, Linux, SEO, Tools).
 * =====================================================================
 */

import React from "react";
import Link from "next/link";
import {
  Layers,
  Code2,
  FileCode,
  CheckCircle2,
  Network,
  Server,
  Terminal,
  Search,
  Wrench,
} from "lucide-react";
import { Category } from "@/types";

interface CategorySidebarProps {
  categories: Category[];
  activeCategory: string;
  totalArticlesCount: number;
}

export default function CategorySidebar({
  categories,
  activeCategory,
  totalArticlesCount,
}: CategorySidebarProps) {
  // Helper to map icon names to Lucide icons
  const renderIcon = (iconName: string, className = "w-4 h-4") => {
    switch (iconName) {
      case "Code2":
        return <Code2 className={className} />;
      case "FileCode":
        return <FileCode className={className} />;
      case "CheckCircle2":
        return <CheckCircle2 className={className} />;
      case "Network":
        return <Network className={className} />;
      case "Server":
        return <Server className={className} />;
      case "Terminal":
        return <Terminal className={className} />;
      case "Search":
        return <Search className={className} />;
      case "Wrench":
        return <Wrench className={className} />;
      default:
        return <Layers className={className} />;
    }
  };

  return (
    <aside className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs space-y-4">
      <h3 className="text-base font-bold text-slate-900 tracking-tight pb-3 border-b border-slate-100 flex items-center gap-2">
        <Layers className="w-4 h-4 text-brand-primary" />
        <span>Categories</span>
      </h3>

      <div className="space-y-1">
        {/* ALL ARTICLES ITEM */}
        <Link
          href="/blog"
          className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all ${
            activeCategory === "all" || !activeCategory
              ? "bg-brand-primary text-white font-semibold shadow-xs"
              : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
          }`}
        >
          <span className="flex items-center gap-2.5">
            <Layers className="w-4 h-4" />
            <span>All</span>
          </span>
          <span
            className={`text-xs px-2 py-0.5 rounded-full font-semibold ${
              activeCategory === "all" || !activeCategory
                ? "bg-white/20 text-white"
                : "bg-slate-100 text-slate-500"
            }`}
          >
            {totalArticlesCount}
          </span>
        </Link>

        {/* INDIVIDUAL CATEGORIES */}
        {categories.map((cat) => {
          const isActive = activeCategory.toLowerCase() === cat.slug.toLowerCase();

          return (
            <Link
              key={cat.id}
              href={`/blog?cat=${cat.slug}`}
              className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all ${
                isActive
                  ? "bg-brand-primary text-white font-semibold shadow-xs"
                  : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
              }`}
            >
              <span className="flex items-center gap-2.5">
                {renderIcon(cat.icon)}
                <span>{cat.name}</span>
              </span>
              <span
                className={`text-xs px-2 py-0.5 rounded-full font-semibold ${
                  isActive
                    ? "bg-white/20 text-white"
                    : "bg-slate-100 text-slate-500"
                }`}
              >
                {cat.count}
              </span>
            </Link>
          );
        })}
      </div>
    </aside>
  );
}
