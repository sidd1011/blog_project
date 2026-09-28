"use client";

/**
 * =====================================================================
 * SeoPreviewModal Component
 * ---------------------------------------------------------------------
 * PURPOSE:
 * Displays a realistic Google Search Engine Results Page (SERP) preview
 * and an automated SEO quality audit checklist.
 * Allows authors to fine-tune meta titles, descriptions, focus keywords,
 * and URL slugs before publishing.
 * =====================================================================
 */

import React, { useState } from "react";
import {
  Globe,
  Smartphone,
  Monitor,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Sparkles,
} from "lucide-react";
import { calculateSeoScore } from "@/lib/utils";

interface SeoPreviewProps {
  title: string;
  slug: string;
  metaTitle: string;
  metaDescription: string;
  focusKeyword: string;
  featuredImage?: string;
  imageAlt?: string;
  content?: string;
}

export default function SeoPreviewModal({
  title,
  slug,
  metaTitle,
  metaDescription,
  focusKeyword,
  featuredImage,
  imageAlt,
  content,
}: SeoPreviewProps) {
  const [viewMode, setViewMode] = useState<"desktop" | "mobile">("desktop");

  const displayTitle = metaTitle || title || "Article Title | DevLearn";
  const displayUrl = `https://devlearn.in › blog › ${slug || "article-slug"}`;
  const displayDescription =
    metaDescription ||
    "Add a concise meta description between 120-160 characters to optimize your search click-through rate.";

  const audit = calculateSeoScore({
    title,
    slug,
    content,
    featuredImage,
    imageAlt,
    seo: {
      metaTitle,
      metaDescription,
      focusKeyword,
    },
  });

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-emerald-600 bg-emerald-50 border-emerald-200";
    if (score >= 50) return "text-amber-600 bg-amber-50 border-amber-200";
    return "text-red-600 bg-red-50 border-red-200";
  };

  return (
    <div className="bg-white rounded-3xl border border-slate-200/80 p-6 space-y-6 shadow-sm">
      
      {/* Header & Device Switcher */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <Globe className="w-4 h-4 text-brand-primary" />
          <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
            Google SERP Snippet Preview
          </h3>
        </div>

        <div className="flex items-center bg-slate-100 p-1 rounded-xl text-xs">
          <button
            type="button"
            onClick={() => setViewMode("desktop")}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-lg font-semibold transition-all ${
              viewMode === "desktop"
                ? "bg-white text-slate-900 shadow-xs"
                : "text-slate-500 hover:text-slate-800"
            }`}
          >
            <Monitor className="w-3.5 h-3.5" />
            <span>Desktop</span>
          </button>
          <button
            type="button"
            onClick={() => setViewMode("mobile")}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-lg font-semibold transition-all ${
              viewMode === "mobile"
                ? "bg-white text-slate-900 shadow-xs"
                : "text-slate-500 hover:text-slate-800"
            }`}
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span>Mobile</span>
          </button>
        </div>
      </div>

      {/* Google Search Mockup Box */}
      <div
        className={`bg-white p-5 rounded-2xl border border-slate-200 shadow-xs font-sans transition-all ${
          viewMode === "mobile" ? "max-w-sm mx-auto" : "w-full"
        }`}
      >
        <div className="flex items-center gap-2.5 mb-1.5">
          <div className="w-5 h-5 rounded-full bg-brand-primary text-white flex items-center justify-center text-[10px] font-bold">
            D
          </div>
          <div className="flex flex-col text-[11px] leading-tight text-slate-600 truncate">
            <span className="font-semibold text-slate-800">DevLearn</span>
            <span className="truncate">{displayUrl}</span>
          </div>
        </div>

        {/* Title link preview */}
        <h4 className="text-[#1a0dab] hover:underline text-base sm:text-lg font-medium leading-snug cursor-pointer line-clamp-2">
          {displayTitle}
        </h4>

        {/* Description snippet preview */}
        <p className="text-xs sm:text-sm text-[#4d5156] mt-1 leading-normal line-clamp-3">
          {displayDescription}
        </p>
      </div>

      {/* Real-time SEO Score & Checklist */}
      <div className="pt-4 border-t border-slate-100 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-brand-primary" />
            <h4 className="text-sm font-bold text-slate-900">
              Automated SEO Health Score
            </h4>
          </div>
          <span
            className={`px-3 py-1 rounded-full text-xs font-extrabold border ${getScoreColor(
              audit.score
            )}`}
          >
            {audit.score} / 100
          </span>
        </div>

        {/* Checklist */}
        <div className="space-y-2 text-xs">
          {audit.checks.map((chk, i) => (
            <div
              key={i}
              className="flex items-start gap-2.5 p-2 rounded-xl bg-slate-50 border border-slate-100"
            >
              {chk.passed ? (
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
              ) : (
                <XCircle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
              )}
              <div>
                <p className="font-bold text-slate-800">{chk.label}</p>
                <p className="text-slate-500">{chk.recommendation}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
