"use client";

/**
 * =====================================================================
 * Admin Categories Management Page (/admin/categories)
 * ---------------------------------------------------------------------
 * PURPOSE:
 * Manage site topics and taxonomy:
 * - List all categories with article counts
 * - Create new categories
 * - Delete unused categories
 * =====================================================================
 */

import React, { useState, useEffect } from "react";
import { Layers, Plus, Trash2, CheckCircle2, AlertCircle } from "lucide-react";
import { Category } from "@/types";
import { slugify } from "@/lib/utils";

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  // Form state
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [description, setDescription] = useState("");
  const [icon, setIcon] = useState("Layers");
  const [color, setColor] = useState("#3062F6");

  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const res = await fetch("/api/categories");
      const data = await res.json();
      setCategories(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleNameChange = (val: string) => {
    setName(val);
    setSlug(slugify(val));
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name) {
      setError("Category Name is required.");
      return;
    }

    setSubmitting(true);
    setError("");
    setMessage("");

    try {
      const res = await fetch("/api/categories", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          slug: slug || slugify(name),
          description,
          icon,
          color,
        }),
      });

      if (!res.ok) throw new Error("Failed to add category.");

      const newCat = await res.json();
      setCategories([...categories, newCat]);
      setName("");
      setSlug("");
      setDescription("");
      setMessage("Category added successfully!");
      setTimeout(() => setMessage(""), 3000);
    } catch (err: any) {
      setError(err.message || "An error occurred.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const res = await fetch(`/api/categories/${id}`, { method: "DELETE" });
      if (res.ok) {
        setCategories(categories.filter((c) => c.id !== id));
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Categories & Taxonomy
        </h1>
        <p className="text-sm text-slate-500 mt-1">
          Organize guides into clear learning tracks to boost SEO topic clusters.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* LEFT: Add Category Form (5 cols) */}
        <div className="lg:col-span-5 bg-white rounded-3xl border border-slate-200/80 p-6 shadow-xs space-y-4">
          <h2 className="text-base font-bold text-slate-900 flex items-center gap-2 pb-2 border-b border-slate-100">
            <Plus className="w-4 h-4 text-brand-primary" />
            <span>Add New Category</span>
          </h2>

          {message && (
            <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4" />
              <span>{message}</span>
            </div>
          )}

          {error && (
            <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleCreate} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">
                Category Name *
              </label>
              <input
                type="text"
                placeholder="e.g. Next.js"
                value={name}
                onChange={(e) => handleNameChange(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 focus:bg-white focus:ring-2 focus:ring-brand-primary"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">
                URL Slug
              </label>
              <input
                type="text"
                placeholder="e.g. nextjs"
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono text-slate-800 focus:bg-white focus:ring-2 focus:ring-brand-primary"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">
                Description
              </label>
              <textarea
                rows={2}
                placeholder="Brief summary for category cards..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:bg-white focus:ring-2 focus:ring-brand-primary"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">
                Icon Identifier
              </label>
              <select
                value={icon}
                onChange={(e) => setIcon(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 focus:ring-2 focus:ring-brand-primary"
              >
                <option value="Layers">Layers</option>
                <option value="Code2">Code2</option>
                <option value="FileCode">FileCode</option>
                <option value="CheckCircle2">CheckCircle2</option>
                <option value="Network">Network</option>
                <option value="Server">Server</option>
                <option value="Terminal">Terminal</option>
                <option value="Search">Search</option>
                <option value="Wrench">Wrench</option>
              </select>
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full py-2.5 bg-brand-primary hover:bg-blue-600 disabled:bg-slate-300 text-white font-bold text-xs rounded-xl shadow-md transition-all"
            >
              {submitting ? "Saving..." : "Create Category"}
            </button>
          </form>
        </div>

        {/* RIGHT: Categories List (7 cols) */}
        <div className="lg:col-span-7 bg-white rounded-3xl border border-slate-200/80 shadow-xs overflow-hidden">
          <div className="p-6 border-b border-slate-100">
            <h2 className="text-base font-bold text-slate-900">
              Active Categories ({categories.length})
            </h2>
          </div>

          <div className="divide-y divide-slate-100">
            {categories.map((cat) => (
              <div
                key={cat.id}
                className="p-4 sm:p-5 flex items-center justify-between hover:bg-slate-50/60 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 text-brand-primary flex items-center justify-center font-bold text-xs">
                    {cat.name.slice(0, 2).toUpperCase()}
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-900">
                      {cat.name}
                    </h3>
                    <p className="text-xs text-slate-500 line-clamp-1">
                      {cat.description || "No description provided."}
                    </p>
                    <span className="text-[10px] text-slate-400 font-mono">
                      Slug: {cat.slug} • Articles: {cat.count}
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => handleDelete(cat.id)}
                  className="p-2 text-slate-400 hover:text-red-600 hover:bg-slate-100 rounded-lg transition-colors"
                  title="Delete category"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
