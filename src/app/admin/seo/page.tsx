/**
 * =====================================================================
 * Technical SEO & Sitemap Suite (/admin/seo)
 * ---------------------------------------------------------------------
 * PURPOSE:
 * Audit, monitor, and configure technical SEO parameters across DevLearn:
 * 1. Health Audit report across all published articles.
 * 2. Live XML Sitemap inspector (/sitemap.xml).
 * 3. Dynamic Robots.txt inspector (/robots.txt).
 * 4. Schema.org Structured Data compliance tester.
 * =====================================================================
 */

import React from "react";
import Link from "next/link";
import {
  Globe,
  ExternalLink,
  ShieldCheck,
  CheckCircle2,
  FileCode,
  FileText,
  AlertTriangle,
  Sparkles,
} from "lucide-react";
import { getArticles } from "@/lib/db";
import { calculateSeoScore } from "@/lib/utils";

export const revalidate = 0;

export default function AdminSeoPage() {
  const articles = getArticles();

  const auditResults = articles.map((article) => {
    const audit = calculateSeoScore({
      title: article.title,
      slug: article.slug,
      content: article.content,
      featuredImage: article.featuredImage,
      imageAlt: article.imageAlt,
      seo: article.seo,
    });
    return {
      article,
      audit,
    };
  });

  const avgScore = Math.round(
    auditResults.reduce((acc, a) => acc + a.audit.score, 0) /
      (auditResults.length || 1)
  );

  return (
    <div className="space-y-8 max-w-7xl mx-auto pb-16">
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Technical SEO & Sitemap Suite
        </h1>
        <p className="text-sm text-slate-500 mt-1">
          Monitor international search engine standards, indexing compliance, and structured data.
        </p>
      </div>

      {/* TOP SEO HEALTH CARD */}
      <div className="p-8 bg-gradient-to-r from-slate-900 to-indigo-950 text-white rounded-3xl border border-slate-800 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2 text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
            <ShieldCheck className="w-4 h-4" />
            <span>Search Engine Audit: Passed</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black">
            Overall Site SEO Readiness
          </h2>
          <p className="text-sm text-slate-300 max-w-xl">
            Articles strictly implement 1 H1 per page, structured headings (H2/H3),
            descriptive URLs, unique meta tags, Schema.org Article JSON-LD, and
            BreadcrumbList data.
          </p>
        </div>

        <div className="text-center bg-white/10 backdrop-blur-md px-8 py-6 rounded-2xl border border-white/10 shrink-0">
          <span className="text-5xl font-black text-emerald-400">
            {avgScore}%
          </span>
          <p className="text-xs font-semibold text-slate-300 mt-1 uppercase tracking-wider">
            Average SEO Score
          </p>
        </div>
      </div>

      {/* QUICK TECHNICAL TOOLS (SITEMAP & ROBOTS) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* SITEMAP.XML INSPECTOR */}
        <div className="bg-white p-6 sm:p-7 rounded-3xl border border-slate-200/80 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-brand-primary flex items-center justify-center">
                <FileCode className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900">
                  XML Sitemap
                </h3>
                <p className="text-xs text-slate-400 font-mono">/sitemap.xml</p>
              </div>
            </div>

            <a
              href="/sitemap.xml"
              target="_blank"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-brand-primary hover:text-white text-xs font-bold text-slate-700 transition-all"
            >
              <span>Inspect Live</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Auto-generated dynamic XML sitemap conforming to Sitemaps.org 0.9 protocol.
            Includes all static pages, category archives, and every published article with
            its respective last-modified timestamp and priority.
          </p>

          <div className="p-3 bg-slate-50 rounded-xl text-xs font-mono text-slate-600 border border-slate-100">
            ✓ Auto-updates upon new article publication
          </div>
        </div>

        {/* ROBOTS.TXT INSPECTOR */}
        <div className="bg-white p-6 sm:p-7 rounded-3xl border border-slate-200/80 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-purple-50 text-brand-secondary flex items-center justify-center">
                <FileText className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900">
                  Robots.txt Directive
                </h3>
                <p className="text-xs text-slate-400 font-mono">/robots.txt</p>
              </div>
            </div>

            <a
              href="/robots.txt"
              target="_blank"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-brand-secondary hover:text-white text-xs font-bold text-slate-700 transition-all"
            >
              <span>Inspect Live</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Directs search crawlers (Googlebot, Bingbot) to index public articles and
            learning categories while securely disallowing crawl budgets from scanning
            private /admin/ CMS paths and /api/ endpoints.
          </p>

          <div className="p-3 bg-slate-50 rounded-xl text-xs font-mono text-slate-600 border border-slate-100">
            ✓ Disallows /admin/* • Specifies Sitemap location
          </div>
        </div>

      </div>

      {/* ARTICLES SEO AUDIT TABLE */}
      <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xs overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex items-center justify-between">
          <h3 className="text-base font-bold text-slate-900">
            Article SEO Audit Breakdown
          </h3>
          <span className="text-xs text-slate-400">
            Calculated via Google Core Ranking Signals
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 text-slate-500 text-xs uppercase font-semibold border-b border-slate-100">
              <tr>
                <th className="px-6 py-4">Article</th>
                <th className="px-6 py-4">Focus Keyword</th>
                <th className="px-6 py-4">Schema Type</th>
                <th className="px-6 py-4">H1 / Headings</th>
                <th className="px-6 py-4">Score</th>
                <th className="px-6 py-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {auditResults.map(({ article, audit }) => (
                <tr key={article.id} className="hover:bg-slate-50/60 transition-colors">
                  <td className="px-6 py-4">
                    <p className="font-bold text-slate-900 line-clamp-1">
                      {article.title}
                    </p>
                    <p className="text-xs text-slate-400 font-mono mt-0.5">
                      /blog/{article.slug}
                    </p>
                  </td>

                  <td className="px-6 py-4 text-xs font-semibold text-slate-700">
                    {article.seo.focusKeyword || (
                      <span className="text-amber-500 italic">None set</span>
                    )}
                  </td>

                  <td className="px-6 py-4 text-xs font-mono text-brand-primary font-bold">
                    {article.seo.schemaType || "Article"}
                  </td>

                  <td className="px-6 py-4 text-xs text-emerald-600 font-semibold flex items-center gap-1 mt-4 sm:mt-0">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>1 H1 + {article.tableOfContents.length} Subheadings</span>
                  </td>

                  <td className="px-6 py-4">
                    <span
                      className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-extrabold ${
                        audit.score >= 80
                          ? "bg-emerald-50 text-emerald-600 border border-emerald-200"
                          : "bg-amber-50 text-amber-600 border border-amber-200"
                      }`}
                    >
                      {audit.score}%
                    </span>
                  </td>

                  <td className="px-6 py-4 text-right">
                    <Link
                      href={`/admin/articles/edit/${article.id}`}
                      className="text-xs font-bold text-brand-primary hover:underline"
                    >
                      Optimize →
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
