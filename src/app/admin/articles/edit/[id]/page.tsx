"use client";

/**
 * =====================================================================
 * Edit Article Page (/admin/articles/edit/[id])
 * ---------------------------------------------------------------------
 * PURPOSE:
 * Edit existing articles and re-calibrate SEO parameters.
 * Automatically loads article by ID from the API and saves updates.
 * =====================================================================
 */

import React, { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  Save,
  Globe,
  Image as ImageIcon,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
} from "lucide-react";
import SeoPreviewModal from "@/components/admin/SeoPreviewModal";
import { Category, DashboardUser, Article } from "@/types";

export default function EditArticlePage() {
  const router = useRouter();
  const params = useParams();
  const articleId = params.id as string;

  // Form State
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("React");
  const [tags, setTags] = useState("");
  const [authorId, setAuthorId] = useState("");
  const [featuredImage, setFeaturedImage] = useState("");
  const [imageAlt, setImageAlt] = useState("");
  const [status, setStatus] = useState<"published" | "draft">("published");

  // SEO Fields
  const [metaTitle, setMetaTitle] = useState("");
  const [metaDescription, setMetaDescription] = useState("");
  const [canonicalUrl, setCanonicalUrl] = useState("");
  const [focusKeyword, setFocusKeyword] = useState("");
  const [schemaType, setSchemaType] = useState<"Article" | "TechArticle" | "BlogPosting">("TechArticle");

  const [categories, setCategories] = useState<Category[]>([]);
  const [users, setUsers] = useState<DashboardUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [savedSuccess, setSavedSuccess] = useState(false);

  useEffect(() => {
    async function loadData() {
      try {
        const [aRes, cRes, uRes] = await Promise.all([
          fetch(`/api/articles/${articleId}`),
          fetch("/api/categories"),
          fetch("/api/users"),
        ]);

        if (!aRes.ok) throw new Error("Article not found.");

        const aData: Article = await aRes.json();
        const cData = await cRes.json();
        const uData = await uRes.json();

        setTitle(aData.title);
        setSlug(aData.slug);
        setExcerpt(aData.excerpt);
        setContent(aData.content);
        setCategory(aData.category);
        setTags(aData.tags?.join(", ") || "");
        setAuthorId(aData.author?.id || "");
        setFeaturedImage(aData.featuredImage);
        setImageAlt(aData.imageAlt || "");
        setStatus(aData.status);

        setMetaTitle(aData.seo?.metaTitle || "");
        setMetaDescription(aData.seo?.metaDescription || "");
        setCanonicalUrl(aData.seo?.canonicalUrl || "");
        setFocusKeyword(aData.seo?.focusKeyword || "");
        setSchemaType(aData.seo?.schemaType || "TechArticle");

        setCategories(cData);
        setUsers(uData);
      } catch (err: any) {
        setError(err.message || "Failed to load article.");
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, [articleId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !content) {
      setError("Title and Content are required.");
      return;
    }

    setSubmitting(true);
    setError("");
    setSavedSuccess(false);

    const selectedAuthor = users.find((u) => u.id === authorId) || {
      id: "usr-siddhartha",
      name: "Siddhartha Kumar",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
      role: "Senior Technical Writer" as const,
      bio: "Full Stack Engineer & Tech Writer.",
    };

    const payload = {
      title,
      slug,
      excerpt,
      content,
      category,
      tags: tags.split(",").map((t) => t.trim()).filter(Boolean),
      author: selectedAuthor,
      featuredImage,
      imageAlt,
      status,
      seo: {
        metaTitle,
        metaDescription,
        canonicalUrl,
        focusKeyword,
        ogImage: featuredImage,
        schemaType,
      },
    };

    try {
      const res = await fetch(`/api/articles/${articleId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("Failed to update article.");

      setSavedSuccess(true);
      setTimeout(() => setSavedSuccess(false), 3000);
    } catch (err: any) {
      setError(err.message || "An error occurred.");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return <div className="p-12 text-center text-slate-400">Loading article...</div>;
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8 max-w-7xl mx-auto pb-16">
      
      {/* Top Header */}
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
              Edit Article: {title}
            </h1>
            <p className="text-xs text-slate-500 font-mono mt-0.5">
              /blog/{slug}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href={`/blog/${slug}`}
            target="_blank"
            className="px-4 py-2 rounded-xl bg-white border border-slate-200 text-slate-700 hover:text-brand-primary text-xs font-semibold flex items-center gap-1.5 shadow-xs"
          >
            <span>View Live</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </Link>

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
            className="px-6 py-2 bg-brand-primary hover:bg-blue-600 disabled:bg-slate-300 text-white font-bold text-xs sm:text-sm rounded-xl shadow-md transition-all flex items-center gap-2"
          >
            <Save className="w-4 h-4" />
            <span>{submitting ? "Saving..." : "Save Changes"}</span>
          </button>
        </div>
      </div>

      {savedSuccess && (
        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 shrink-0" />
          <span>Article updated successfully and SEO cache revalidated!</span>
        </div>
      )}

      {error && (
        <div className="p-4 rounded-2xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* 2-Column Editor Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* LEFT COLUMN: Main Content Fields */}
        <div className="lg:col-span-8 space-y-6">
          <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Article Title (H1) *
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-base font-bold text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-primary"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Descriptive URL Slug
              </label>
              <div className="flex items-center">
                <span className="px-3 py-3 bg-slate-100 border border-r-0 border-slate-200 rounded-l-xl text-xs text-slate-500 font-mono">
                  https://devlearn.in/blog/
                </span>
                <input
                  type="text"
                  value={slug}
                  onChange={(e) => setSlug(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-r-xl text-xs font-mono text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-primary"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Excerpt
              </label>
              <textarea
                rows={2}
                value={excerpt}
                onChange={(e) => setExcerpt(e.target.value)}
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-primary"
              />
            </div>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs space-y-4">
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
              Article Body *
            </label>
            <textarea
              rows={16}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm font-mono text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-primary leading-relaxed"
              required
            />
          </div>

          <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs space-y-4">
            <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-2">
              <ImageIcon className="w-4 h-4 text-brand-primary" />
              <span>Cover Image & Alt Text</span>
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
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:ring-2 focus:ring-brand-primary"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">
                  Image Alt Text (SEO)
                </label>
                <input
                  type="text"
                  value={imageAlt}
                  onChange={(e) => setImageAlt(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:ring-2 focus:ring-brand-primary"
                />
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Settings & SEO Suite */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs space-y-4">
            <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
              Category & Author
            </h3>

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

            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">
                Tags
              </label>
              <input
                type="text"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:ring-2 focus:ring-brand-primary"
              />
            </div>
          </div>

          {/* SEO SETTINGS */}
          <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs space-y-4">
            <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
              <Globe className="w-4 h-4 text-brand-primary" />
              <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                SEO Parameters
              </h3>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">
                Focus Keyword
              </label>
              <input
                type="text"
                value={focusKeyword}
                onChange={(e) => setFocusKeyword(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:ring-2 focus:ring-brand-primary"
              />
            </div>

            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="text-xs font-semibold text-slate-600">
                  Meta Title
                </label>
                <span className="text-[10px] text-slate-400">
                  {metaTitle.length} chars
                </span>
              </div>
              <input
                type="text"
                value={metaTitle}
                onChange={(e) => setMetaTitle(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:ring-2 focus:ring-brand-primary"
              />
            </div>

            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="text-xs font-semibold text-slate-600">
                  Meta Description
                </label>
                <span className="text-[10px] text-slate-400">
                  {metaDescription.length} chars
                </span>
              </div>
              <textarea
                rows={3}
                value={metaDescription}
                onChange={(e) => setMetaDescription(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:ring-2 focus:ring-brand-primary"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">
                Canonical URL
              </label>
              <input
                type="text"
                value={canonicalUrl}
                onChange={(e) => setCanonicalUrl(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:ring-2 focus:ring-brand-primary"
              />
            </div>
          </div>

          {/* SERP PREVIEW & SCORE */}
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
