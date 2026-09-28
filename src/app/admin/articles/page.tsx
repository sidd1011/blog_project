"use client";

/**
 * =====================================================================
 * Admin All Articles List Page (/admin/articles)
 * ---------------------------------------------------------------------
 * PURPOSE:
 * Manage, filter, search, edit, and delete articles in the DevLearn CMS.
 * =====================================================================
 */

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  FileText,
  PlusCircle,
  Search,
  ExternalLink,
  Edit3,
  Trash2,
  AlertCircle,
} from "lucide-react";
import { Article } from "@/types";

export default function AdminArticlesListPage() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [loading, setLoading] = useState(true);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  useEffect(() => {
    fetchArticles();
  }, []);

  const fetchArticles = async () => {
    try {
      const res = await fetch("/api/articles");
      const data = await res.json();
      setArticles(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const res = await fetch(`/api/articles/${id}`, { method: "DELETE" });
      if (res.ok) {
        setArticles(articles.filter((a) => a.id !== id));
        setDeleteConfirmId(null);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const filtered = articles.filter((a) => {
    const matchesSearch =
      a.title.toLowerCase().includes(search.toLowerCase()) ||
      a.slug.toLowerCase().includes(search.toLowerCase());
    const matchesCategory =
      categoryFilter === "all" ||
      a.categorySlug.toLowerCase() === categoryFilter.toLowerCase();
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            All Articles ({articles.length})
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Search, edit, or manage published and draft tutorials.
          </p>
        </div>

        <Link
          href="/admin/articles/new"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-brand-primary hover:bg-blue-600 text-white font-bold text-sm shadow-md transition-all self-start sm:self-auto"
        >
          <PlusCircle className="w-4 h-4" />
          <span>New Article</span>
        </Link>
      </div>

      {/* Filters Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col sm:flex-row items-center gap-4 justify-between">
        <div className="relative w-full sm:w-80">
          <input
            type="text"
            placeholder="Search by title or slug..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-primary"
          />
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <label className="text-xs font-semibold text-slate-500 whitespace-nowrap">
            Category:
          </label>
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-brand-primary"
          >
            <option value="all">All Categories</option>
            <option value="react">React</option>
            <option value="qa-testing">QA & Testing</option>
            <option value="api">API</option>
            <option value="devops">DevOps</option>
            <option value="linux">Linux</option>
            <option value="seo">SEO</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xs overflow-hidden">
        {loading ? (
          <div className="p-12 text-center text-slate-400">Loading articles...</div>
        ) : filtered.length === 0 ? (
          <div className="p-12 text-center text-slate-500">
            No articles found matching your criteria.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-50 text-slate-500 text-xs uppercase font-semibold border-b border-slate-100">
                <tr>
                  <th className="px-6 py-4">Title & Slug</th>
                  <th className="px-6 py-4">Category</th>
                  <th className="px-6 py-4">Author</th>
                  <th className="px-6 py-4">Date</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filtered.map((article) => (
                  <tr key={article.id} className="hover:bg-slate-50/60 transition-colors">
                    <td className="px-6 py-4">
                      <p className="font-bold text-slate-900 line-clamp-1">
                        {article.title}
                      </p>
                      <p className="text-xs text-slate-400 font-mono mt-0.5">
                        /blog/{article.slug}
                      </p>
                    </td>

                    <td className="px-6 py-4">
                      <span className="inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold bg-slate-100 text-slate-700">
                        {article.category}
                      </span>
                    </td>

                    <td className="px-6 py-4 text-xs font-medium text-slate-700">
                      {article.author.name}
                    </td>

                    <td className="px-6 py-4 text-xs text-slate-500">
                      {article.publishedAt}
                    </td>

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
                        title="Edit Article & SEO"
                      >
                        <Edit3 className="w-4 h-4" />
                      </Link>

                      {deleteConfirmId === article.id ? (
                        <div className="inline-flex items-center gap-1">
                          <button
                            onClick={() => handleDelete(article.id)}
                            className="px-2 py-1 bg-red-600 text-white text-xs font-bold rounded"
                          >
                            Confirm
                          </button>
                          <button
                            onClick={() => setDeleteConfirmId(null)}
                            className="px-2 py-1 bg-slate-200 text-slate-700 text-xs rounded"
                          >
                            Cancel
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => setDeleteConfirmId(article.id)}
                          className="p-1.5 rounded-lg text-slate-400 hover:text-red-600 inline-flex hover:bg-slate-100"
                          title="Delete Article"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
