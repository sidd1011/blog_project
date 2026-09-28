"use client";

/**
 * =====================================================================
 * New Article Editor Page (/admin/articles/new)
 * ---------------------------------------------------------------------
 * PURPOSE:
 * Full-featured publishing interface with comprehensive SEO management.
 * Features:
 * 1. Title, Slug auto-generation, Category, Author, Cover image + Alt text.
 * 2. Content editor with Markdown/HTML formatting support.
 * 3. Deep International SEO Suite:
 *    - Meta Title with character length indicators
 *    - Meta Description with character length indicators
 *    - Focus Keyword targeting
 *    - Canonical URL configuration
 *    - Schema.org Type selector (Article, TechArticle, BlogPosting)
 *    - Live Google SERP snippet preview
 *    - Real-time automated SEO checklist & score
 * =====================================================================
 */

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  Save,
  Globe,
  Sparkles,
  FileText,
  Image as ImageIcon,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
import SeoPreviewModal from "@/components/admin/SeoPreviewModal";
import { slugify } from "@/lib/utils";
import { Category, DashboardUser } from "@/types";

export default function NewArticlePage() {
  const router = useRouter();

  // Form State
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [isSlugManual, setIsSlugManual] = useState(false);
  const [excerpt, setExcerpt] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("React");
  const [tags, setTags] = useState("React, WebDev, Tutorial");
  const [authorId, setAuthorId] = useState("usr-siddhartha");
  const [featuredImage, setFeaturedImage] = useState(
    "https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&w=1200&q=80"
  );
  const [imageAlt, setImageAlt] = useState("");
  const [status, setStatus] = useState<"published" | "draft">("published");

  // SEO Fields
  const [metaTitle, setMetaTitle] = useState("");
  const [metaDescription, setMetaDescription] = useState("");
  const [canonicalUrl, setCanonicalUrl] = useState("");
  const [focusKeyword, setFocusKeyword] = useState("");
  const [schemaType, setSchemaType] = useState<"Article" | "TechArticle" | "BlogPosting">("TechArticle");

  // Remote data
  const [categories, setCategories] = useState<Category[]>([]);
  const [users, setUsers] = useState<DashboardUser[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadMeta() {
      try {
        const [cRes, uRes] = await Promise.all([
          fetch("/api/categories"),
          fetch("/api/users"),
        ]);
        const cData = await cRes.json();
        const uData = await uRes.json();
        setCategories(cData);
        setUsers(uData);
        if (cData.length > 0) setCategory(cData[0].name);
        if (uData.length > 0) setAuthorId(uData[0].id);
      } catch (err) {
        console.error(err);
      }
    }
    loadMeta();
  }, []);

  // Auto-generate slug and meta title from title if not manually edited
  const handleTitleChange = (val: string) => {
    setTitle(val);
    if (!isSlugManual) {
      setSlug(slugify(val));
    }
    if (!metaTitle) {
      setMetaTitle(val);
    }
    if (!imageAlt) {
      setImageAlt(`${val} Cover Tutorial`);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !content) {
      setError("Please provide both Title and Content.");
      return;
    }

    setSubmitting(true);
    setError("");

    const selectedAuthor = users.find((u) => u.id === authorId) || {
      id: "usr-siddhartha",
      name: "Siddhartha Kumar",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
      role: "Senior Technical Writer" as const,
      bio: "Full Stack Engineer & Tech Writer.",
    };

    const payload = {
      title,
      slug: slug || slugify(title),
      excerpt: excerpt || content.slice(0, 150) + "...",
      content,
      category,
      categorySlug: slugify(category),
      tags: tags.split(",").map((t) => t.trim()).filter(Boolean),
      author: selectedAuthor,
      featuredImage,
      imageAlt: imageAlt || title,
      status,
      seo: {
        metaTitle: metaTitle || title,
        metaDescription: metaDescription || excerpt,
        canonicalUrl: canonicalUrl || `https://devlearn.in/blog/${slug || slugify(title)}`,
        focusKeyword,
        ogImage: featuredImage,
        schemaType,
      },
    };

    try {
      const res = await fetch("/api/articles", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        throw new Error("Failed to create article.");
      }

      router.push("/admin/articles");
    } catch (err: any) {
      setError(err.message || "An error occurred.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8 max-w-7xl mx-auto pb-16">
      
      {/* Top Header & Save Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div className="flex items-center gap-3">
          <Link
            href="/admin/articles"
            className="p-2 rounded-xl bg-white border border-slate-200 text-slate-600 hover:text-slate-900 shadow-xs"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div>
            <h1 className="text-2xl font-black text-slate-900 tracking-tight">
              Create New Article
            </h1>
            <p className="text-xs text-slate-500">
              Draft comprehensive tutorials with automated international SEO scoring.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value as any)}
            className="px-3 py-2 bg-white border border-slate-300 rounded-xl text-xs font-semibold text-slate-700 shadow-xs focus:ring-2 focus:ring-brand-primary"
          >
            <option value="published">Status: Published</option>
            <option value="draft">Status: Draft</option>
          </select>

          <button
            type="submit"
            disabled={submitting}
            className="px-6 py-2.5 bg-brand-primary hover:bg-blue-600 disabled:bg-slate-300 text-white font-bold text-xs sm:text-sm rounded-xl shadow-md shadow-brand-primary/25 transition-all flex items-center gap-2"
          >
            <Save className="w-4 h-4" />
            <span>{submitting ? "Publishing..." : "Save Article"}</span>
          </button>
        </div>
      </div>

      {error && (
        <div className="p-4 rounded-2xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Main 2-Column Editor Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* LEFT COLUMN: Main Content Fields (8 cols) */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* Article Title (H1) */}
          <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Article Title (Primary H1) *
              </label>
              <input
                type="text"
                placeholder="e.g. React Website Deploy Kaise Karein – Step by Step Guide"
                value={title}
                onChange={(e) => handleTitleChange(e.target.value)}
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-base font-bold text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-primary"
                required
              />
            </div>

            {/* URL Slug */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Descriptive URL Slug (e.g. site.com/blog/react-deploy-guide)
              </label>
              <div className="flex items-center">
                <span className="px-3 py-3 bg-slate-100 border border-r-0 border-slate-200 rounded-l-xl text-xs text-slate-500 font-mono">
                  https://devlearn.in/blog/
                </span>
                <input
                  type="text"
                  placeholder="react-website-deploy-kaise-karein"
                  value={slug}
                  onChange={(e) => {
                    setIsSlugManual(true);
                    setSlug(e.target.value);
                  }}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-r-xl text-xs font-mono text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-primary"
                />
              </div>
            </div>

            {/* Excerpt */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Excerpt / Summary (for Search & Social Cards)
              </label>
              <textarea
                rows={2}
                placeholder="Brief 1-2 sentence preview..."
                value={excerpt}
                onChange={(e) => setExcerpt(e.target.value)}
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-primary"
              />
            </div>
          </div>

          {/* Rich Content Editor */}
          <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                Article Body (Markdown Supported) *
              </label>
              <span className="text-[11px] text-slate-400">
                Use ## for H2, ### for H3 headings, ``` for code blocks
              </span>
            </div>

            <textarea
              rows={16}
              placeholder={`## 1. Introduction\n\nWrite short, readable paragraphs here...\n\n## 2. What You Need\n\n- [x] Node.js installed\n- [x] GitHub account\n\n## 3. Step 1: Project Setup\n\n\`\`\`bash\nnode -v\nnpm create vite@latest my-app\n\`\`\``}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm font-mono text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-primary leading-relaxed"
              required
            />
          </div>

          {/* Featured Image & Alt Text */}
          <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs space-y-4">
            <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-2">
              <ImageIcon className="w-4 h-4 text-brand-primary" />
              <span>Cover Image & Accessibility Alt Text</span>
            </h3>

            <div className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">
                  Image URL
                </label>
                <input
                  type="text"
                  value={featuredImage}
                  onChange={(e) => setFeaturedImage(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:bg-white focus:ring-2 focus:ring-brand-primary"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">
                  Image Alt Text (Crucial for SEO image indexing)
                </label>
                <input
                  type="text"
                  placeholder="e.g. React Website Deploy Kaise Karein Step by Step Guide"
                  value={imageAlt}
                  onChange={(e) => setImageAlt(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:bg-white focus:ring-2 focus:ring-brand-primary"
                />
              </div>
            </div>
          </div>

        </div>

        {/* RIGHT COLUMN: Settings, Taxonomy & SEO Suite (4 cols) */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* Metadata & Taxonomy Card */}
          <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs space-y-4">
            <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
              Category & Author Settings
            </h3>

            {/* Category */}
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">
                Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 focus:ring-2 focus:ring-brand-primary"
              >
                {categories.map((c) => (
                  <option key={c.id} value={c.name}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Author */}
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">
                Author
              </label>
              <select
                value={authorId}
                onChange={(e) => setAuthorId(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 focus:ring-2 focus:ring-brand-primary"
              >
                {users.map((u) => (
                  <option key={u.id} value={u.id}>
                    {u.name} ({u.role})
                  </option>
                ))}
              </select>
            </div>

            {/* Tags */}
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">
                Tags (Comma separated)
              </label>
              <input
                type="text"
                placeholder="React, Vercel, Deployment"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:ring-2 focus:ring-brand-primary"
              />
            </div>
          </div>

          {/* DEEP SEO SETTINGS PANEL */}
          <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs space-y-4">
            <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
              <Globe className="w-4 h-4 text-brand-primary" />
              <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                International SEO Configuration
              </h3>
            </div>

            {/* Focus Keyword */}
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">
                Focus Keyword (Target Query)
              </label>
              <input
                type="text"
                placeholder="e.g. React website deploy"
                value={focusKeyword}
                onChange={(e) => setFocusKeyword(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:ring-2 focus:ring-brand-primary"
              />
            </div>

            {/* Meta Title */}
            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="text-xs font-semibold text-slate-600">
                  Unique Meta Title
                </label>
                <span
                  className={`text-[10px] font-bold ${
                    metaTitle.length >= 35 && metaTitle.length <= 65
                      ? "text-emerald-600"
                      : "text-amber-500"
                  }`}
                >
                  {metaTitle.length} / 60 chars
                </span>
              </div>
              <input
                type="text"
                placeholder="Custom meta title for Google..."
                value={metaTitle}
                onChange={(e) => setMetaTitle(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:ring-2 focus:ring-brand-primary"
              />
            </div>

            {/* Meta Description */}
            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="text-xs font-semibold text-slate-600">
                  Unique Meta Description
                </label>
                <span
                  className={`text-[10px] font-bold ${
                    metaDescription.length >= 120 && metaDescription.length <= 165
                      ? "text-emerald-600"
                      : "text-amber-500"
                  }`}
                >
                  {metaDescription.length} / 160 chars
                </span>
              </div>
              <textarea
                rows={3}
                placeholder="Concise summary for search snippet..."
                value={metaDescription}
                onChange={(e) => setMetaDescription(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:ring-2 focus:ring-brand-primary"
              />
            </div>

            {/* Canonical URL Override */}
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">
                Canonical URL Override (Optional)
              </label>
              <input
                type="text"
                placeholder="https://devlearn.in/blog/..."
                value={canonicalUrl}
                onChange={(e) => setCanonicalUrl(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:ring-2 focus:ring-brand-primary"
              />
            </div>

            {/* Schema Type */}
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">
                Schema.org Structured Data Type
              </label>
              <select
                value={schemaType}
                onChange={(e) => setSchemaType(e.target.value as any)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 focus:ring-2 focus:ring-brand-primary"
              >
                <option value="TechArticle">TechArticle (Technical Guides)</option>
                <option value="Article">Article (Standard Blog Post)</option>
                <option value="BlogPosting">BlogPosting (Quick Update)</option>
              </select>
            </div>

          </div>

          {/* GOOGLE SERP PREVIEW & AUDIT METER */}
          <SeoPreviewModal
            title={title}
            slug={slug}
            metaTitle={metaTitle}
            metaDescription={metaDescription}
            focusKeyword={focusKeyword}
            featuredImage={featuredImage}
            imageAlt={imageAlt}
            content={content}
          />

        </div>

      </div>

    </form>
  );
}
