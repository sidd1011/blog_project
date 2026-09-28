/**
 * =====================================================================
 * Admin Overview Dashboard (Screen 9 / Backend CMS)
 * ---------------------------------------------------------------------
 * PURPOSE:
 * Central overview of DevLearn publishing platform.
 * Displays real-time metrics, SEO audit health status, recent posts,
 * and quick actions to create new content or manage authors.
 * =====================================================================
 */

import React from "react";
import Link from "next/link";
import {
  FileText,
  Users,
  Layers,
  Eye,
  PlusCircle,
  ExternalLink,
  Edit3,
  TrendingUp,
  Sparkles,
  ShieldCheck,
} from "lucide-react";
import { getArticles, getCategories, getUsers } from "@/lib/db";
import { calculateSeoScore } from "@/lib/utils";

export const revalidate = 0;

export default function AdminOverviewPage() {
  const articles = getArticles();
  const categories = getCategories();
  const users = getUsers();

  const totalViews = articles.reduce((acc, a) => acc + (a.views || 0), 0);
  const publishedCount = articles.filter((a) => a.status === "published").length;
  const draftCount = articles.filter((a) => a.status === "draft").length;

  // Calculate average SEO score across all articles
  const avgSeoScore = Math.round(
    articles.reduce((acc, a) => {
      const audit = calculateSeoScore({
        title: a.title,
        slug: a.slug,
        content: a.content,
        featuredImage: a.featuredImage,
        imageAlt: a.imageAlt,
        seo: a.seo,
      });
      return acc + audit.score;
    }, 0) / (articles.length || 1)
  );

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      
      {/* Top Banner / Welcome */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Dashboard Overview
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Manage your articles, categories, SEO parameters, and author accounts.
          </p>
        </div>

        <Link
          href="/admin/articles/new"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-brand-primary hover:bg-blue-600 text-white font-bold text-sm shadow-md shadow-brand-primary/25 transition-all self-start sm:self-auto"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Write New Article</span>
        </Link>
      </div>

      {/* METRIC CARDS GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        
        {/* Metric 1: Articles */}
        <div className="p-6 bg-white rounded-3xl border border-slate-200/80 shadow-xs flex flex-col justify-between space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Total Articles
            </span>
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-brand-primary flex items-center justify-center">
              <FileText className="w-5 h-5" />
            </div>
          </div>
          <div>
            <span className="text-3xl font-black text-slate-900">
              {articles.length}
            </span>
            <p className="text-xs text-slate-500 mt-1">
              <span className="text-emerald-600 font-bold">{publishedCount} Published</span>{" "}
              • {draftCount} Drafts
            </p>
          </div>
        </div>

        {/* Metric 2: Views */}
        <div className="p-6 bg-white rounded-3xl border border-slate-200/80 shadow-xs flex flex-col justify-between space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Total Readers / Views
            </span>
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <Eye className="w-5 h-5" />
            </div>
          </div>
          <div>
            <span className="text-3xl font-black text-slate-900">
              {totalViews.toLocaleString()}
            </span>
            <p className="text-xs text-emerald-600 font-semibold mt-1 flex items-center gap-1">
              <TrendingUp className="w-3.5 h-3.5" />
              <span>Organic Search Growth</span>
            </p>
          </div>
        </div>

        {/* Metric 3: Authors & Users */}
        <div className="p-6 bg-white rounded-3xl border border-slate-200/80 shadow-xs flex flex-col justify-between space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Authors & Users
            </span>
            <div className="w-10 h-10 rounded-xl bg-purple-50 text-brand-secondary flex items-center justify-center">
              <Users className="w-5 h-5" />
            </div>
          </div>
          <div>
            <span className="text-3xl font-black text-slate-900">
              {users.length}
            </span>
            <p className="text-xs text-slate-500 mt-1">
              Active Content Creators
            </p>
          </div>
        </div>

        {/* Metric 4: SEO Health Score */}
        <div className="p-6 bg-white rounded-3xl border border-slate-200/80 shadow-xs flex flex-col justify-between space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Avg SEO Score
            </span>
            <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center">
              <ShieldCheck className="w-5 h-5" />
            </div>
          </div>
          <div>
            <span className="text-3xl font-black text-slate-900">
              {avgSeoScore}%
            </span>
            <p className="text-xs text-teal-600 font-semibold mt-1">
              Optimized for Google & Bing
            </p>
          </div>
        </div>

      </div>

      {/* RECENT ARTICLES MANAGEMENT TABLE */}
      <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xs overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex items-center justify-between">
          <h2 className="text-lg font-bold text-slate-900 tracking-tight">
            Recent Articles
          </h2>
          <Link
            href="/admin/articles"
            className="text-xs font-bold text-brand-primary hover:underline"
          >
            View All ({articles.length})
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 text-slate-500 text-xs uppercase font-semibold border-b border-slate-100">
              <tr>
                <th className="px-6 py-4">Title & Slug</th>
                <th className="px-6 py-4">Category</th>
                <th className="px-6 py-4">Author</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Views</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {articles.slice(0, 5).map((article) => (
                <tr key={article.id} className="hover:bg-slate-50/60 transition-colors">
                  
                  {/* Title & Slug */}
                  <td className="px-6 py-4">
                    <p className="font-bold text-slate-900 line-clamp-1">
                      {article.title}
                    </p>
                    <p className="text-xs text-slate-400 font-mono mt-0.5">
                      /blog/{article.slug}
                    </p>
                  </td>

                  {/* Category */}
                  <td className="px-6 py-4">
                    <span className="inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold bg-slate-100 text-slate-700">
                      {article.category}
                    </span>
                  </td>

                  {/* Author */}
                  <td className="px-6 py-4 text-xs font-medium text-slate-700">
                    {article.author.name}
                  </td>

                  {/* Status */}
                  <td className="px-6 py-4">
                    <span
                      className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-bold ${
                        article.status === "published"
                          ? "bg-emerald-50 text-emerald-600 border border-emerald-200"
                          : "bg-amber-50 text-amber-600 border border-amber-200"
                      }`}
                    >
                      {article.status}
                    </span>
                  </td>

                  {/* Views */}
                  <td className="px-6 py-4 text-xs text-slate-600 font-semibold">
                    {article.views.toLocaleString()}
                  </td>

                  {/* Actions */}
                  <td className="px-6 py-4 text-right space-x-2">
                    <Link
                      href={`/blog/${article.slug}`}
                      target="_blank"
                      className="p-1.5 rounded-lg text-slate-400 hover:text-brand-primary inline-flex hover:bg-slate-100"
                      title="View Live Article"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </Link>
                    <Link
                      href={`/admin/articles/edit/${article.id}`}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-brand-primary inline-flex hover:bg-slate-100"
                      title="Edit Article"
                    >
                      <Edit3 className="w-4 h-4" />
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
