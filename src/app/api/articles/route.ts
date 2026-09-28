/**
 * =====================================================================
 * /api/articles Route Handler
 * ---------------------------------------------------------------------
 * PURPOSE:
 * REST API for fetching all articles or creating a new blog post.
 * Includes validation for SEO fields, slug uniqueness, and TOC generation.
 * =====================================================================
 */

import { NextResponse } from "next/server";
import { getArticles, saveArticle } from "@/lib/db";
import { slugify, calculateReadingTime, extractHeadings } from "@/lib/utils";
import { Article } from "@/types";

export async function GET() {
  const articles = getArticles();
  return NextResponse.json(articles);
}

export async function POST(request: Request) {
  try {
    const data = await request.json();

    if (!data.title || !data.content) {
      return NextResponse.json(
        { error: "Title and Content are required fields." },
        { status: 400 }
      );
    }

    const slug = slugify(data.slug || data.title);
    const readingTime = calculateReadingTime(data.content);
    const toc = extractHeadings(data.content);

    const newArticle: Article = {
      id: `art-${Date.now()}`,
      slug,
      title: data.title,
      excerpt: data.excerpt || data.content.slice(0, 150) + "...",
      content: data.content,
      category: data.category || "General",
      categorySlug: slugify(data.category || "general"),
      tags: Array.isArray(data.tags) ? data.tags : ["Tutorial"],
      author: data.author || {
        id: "usr-siddhartha",
        name: "Siddhartha Kumar",
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
        role: "Senior Technical Writer",
        bio: "Full Stack Engineer & Tech Writer.",
      },
      publishedAt: data.publishedAt || new Date().toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      }),
      readingTime,
      featuredImage:
        data.featuredImage ||
        "https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&w=1200&q=80",
      imageAlt: data.imageAlt || data.title,
      isFeatured: Boolean(data.isFeatured),
      status: data.status || "published",
      views: 0,
      tableOfContents: toc,
      seo: {
        metaTitle: data.seo?.metaTitle || data.title,
        metaDescription: data.seo?.metaDescription || data.excerpt,
        canonicalUrl: data.seo?.canonicalUrl || `https://devlearn.in/blog/${slug}`,
        focusKeyword: data.seo?.focusKeyword || "",
        ogImage: data.seo?.ogImage || data.featuredImage,
        schemaType: data.seo?.schemaType || "Article",
      },
    };

    saveArticle(newArticle);
    return NextResponse.json(newArticle, { status: 201 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
