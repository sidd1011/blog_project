/**
 * =====================================================================
 * /api/articles/[id] Route Handler
 * ---------------------------------------------------------------------
 * PURPOSE:
 * REST API for individual article operations:
 * - GET: Fetch article by ID
 * - PUT: Update article content, metadata, or SEO settings
 * - DELETE: Remove article from database
 * =====================================================================
 */

import { NextResponse } from "next/server";
import { getArticleById, saveArticle, deleteArticle } from "@/lib/db";
import { slugify, calculateReadingTime, extractHeadings } from "@/lib/utils";

interface Params {
  params: { id: string };
}

export async function GET(request: Request, { params }: Params) {
  const article = getArticleById(params.id);
  if (!article) {
    return NextResponse.json({ error: "Article not found" }, { status: 404 });
  }
  return NextResponse.json(article);
}

export async function PUT(request: Request, { params }: Params) {
  try {
    const existing = getArticleById(params.id);
    if (!existing) {
      return NextResponse.json({ error: "Article not found" }, { status: 404 });
    }

    const data = await request.json();

    const slug = data.slug ? slugify(data.slug) : existing.slug;
    const readingTime = data.content
      ? calculateReadingTime(data.content)
      : existing.readingTime;
    const toc = data.content ? extractHeadings(data.content) : existing.tableOfContents;

    const updated = {
      ...existing,
      ...data,
      slug,
      readingTime,
      tableOfContents: toc,
      updatedAt: new Date().toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      }),
      seo: {
        ...existing.seo,
        ...data.seo,
        canonicalUrl:
          data.seo?.canonicalUrl ||
          `https://devlearn.in/blog/${slug}`,
      },
    };

    saveArticle(updated);
    return NextResponse.json(updated);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: Params) {
  const success = deleteArticle(params.id);
  if (!success) {
    return NextResponse.json({ error: "Article not found" }, { status: 404 });
  }
  return NextResponse.json({ message: "Article deleted successfully" });
}
