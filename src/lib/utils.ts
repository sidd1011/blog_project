/**
 * =====================================================================
 * DevLearn Utility Library
 * ---------------------------------------------------------------------
 * Helper functions for SEO formatting, slug generation, reading time,
 * Table of Contents extraction, and real-time SEO score calculation.
 * =====================================================================
 */

import { TocItem, SeoAuditScore } from "@/types";

/**
 * Combines conditional CSS classes cleanly
 */
export function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(" ");
}

/**
 * Converts any title or string into an SEO-friendly URL slug
 * Example: "React Website Deploy Kaise Karein!" -> "react-website-deploy-kaise-karein"
 */
export function slugify(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")        // Replace spaces with -
    .replace(/[^\w\-]+/g, "")    // Remove all non-word chars
    .replace(/\-\-+/g, "-")      // Replace multiple - with single -
    .replace(/^-+/, "")          // Trim - from start of text
    .replace(/-+$/, "");         // Trim - from end of text
}

/**
 * Calculates estimated reading time based on standard 200 words/minute
 */
export function calculateReadingTime(text: string): string {
  const wordsPerMinute = 200;
  const words = text.trim().split(/\s+/).length;
  const minutes = Math.ceil(words / wordsPerMinute);
  return `${minutes} min read`;
}

/**
 * Parses markdown/plain text to extract H2 and H3 headings for the Table of Contents
 */
export function extractHeadings(content: string): TocItem[] {
  const headingRegex = /^(#{2,3})\s+(.+)$/gm;
  const headings: TocItem[] = [];
  let match;

  while ((match = headingRegex.exec(content)) !== null) {
    const level = match[1].length as 2 | 3;
    const text = match[2].trim();
    const id = slugify(text.replace(/^\d+[\.\)]\s*/, "")); // Clean numeric prefix for clean id anchor
    headings.push({ id, text, level });
  }

  return headings;
}

/**
 * Calculates an SEO Score (0-100) and provides actionable recommendations
 * for optimizing articles for international search engines (Google, Bing).
 */
export function calculateSeoScore(article: {
  title?: string;
  slug?: string;
  excerpt?: string;
  content?: string;
  featuredImage?: string;
  imageAlt?: string;
  seo?: {
    metaTitle?: string;
    metaDescription?: string;
    focusKeyword?: string;
  };
}): SeoAuditScore {
  const checks: SeoAuditScore["checks"] = [];
  let score = 0;

  const focusKeyword = (article.seo?.focusKeyword || "").toLowerCase().trim();
  const title = (article.title || "").toLowerCase();
  const slug = (article.slug || "").toLowerCase();
  const metaTitle = (article.seo?.metaTitle || "").toLowerCase();
  const metaDesc = (article.seo?.metaDescription || "").toLowerCase();
  const content = (article.content || "").toLowerCase();
  const altText = (article.imageAlt || "").toLowerCase();

  // 1. Focus Keyword Provided
  if (focusKeyword.length > 2) {
    score += 15;
    checks.push({
      label: "Focus Keyword Defined",
      passed: true,
      recommendation: `Target keyword: "${focusKeyword}"`,
    });
  } else {
    checks.push({
      label: "Focus Keyword Missing",
      passed: false,
      recommendation: "Provide a target focus keyword to optimize your article.",
    });
  }

  // 2. Keyword in H1 / Title
  if (focusKeyword && title.includes(focusKeyword)) {
    score += 15;
    checks.push({
      label: "Keyword in Title (H1)",
      passed: true,
      recommendation: "Title contains the primary target keyword.",
    });
  } else {
    checks.push({
      label: "Keyword in Title",
      passed: false,
      recommendation: "Include the target keyword near the start of your title.",
    });
  }

  // 3. SEO Friendly Slug
  if (slug && (!focusKeyword || slug.includes(slugify(focusKeyword).slice(0, 15)))) {
    score += 15;
    checks.push({
      label: "Descriptive URL Slug",
      passed: true,
      recommendation: `Clean URL: /blog/${slug}`,
    });
  } else {
    checks.push({
      label: "URL Slug Optimization",
      passed: false,
      recommendation: "Ensure slug is concise and contains the target keyword.",
    });
  }

  // 4. Meta Title Length (Recommended 45 - 65 chars)
  const metaTitleLen = article.seo?.metaTitle?.length || 0;
  if (metaTitleLen >= 30 && metaTitleLen <= 70) {
    score += 15;
    checks.push({
      label: "Meta Title Length Optimal",
      passed: true,
      recommendation: `Meta title is ${metaTitleLen} characters (Ideal: 45-65).`,
    });
  } else {
    checks.push({
      label: "Meta Title Length",
      passed: false,
      recommendation: `Current length is ${metaTitleLen}. Adjust between 45-65 characters.`,
    });
  }

  // 5. Meta Description Length (Recommended 120 - 160 chars)
  const metaDescLen = article.seo?.metaDescription?.length || 0;
  if (metaDescLen >= 80 && metaDescLen <= 170) {
    score += 15;
    checks.push({
      label: "Meta Description Length Optimal",
      passed: true,
      recommendation: `Meta description is ${metaDescLen} characters (Ideal: 120-160).`,
    });
  } else {
    checks.push({
      label: "Meta Description Length",
      passed: false,
      recommendation: `Current length is ${metaDescLen}. Aim for 120-160 characters.`,
    });
  }

  // 6. Image Alt Text for Accessibility & Image Search
  if (article.featuredImage && altText.length >= 10) {
    score += 15;
    checks.push({
      label: "Image Alt Text Present",
      passed: true,
      recommendation: "Featured image has descriptive alt text for search crawlers.",
    });
  } else {
    checks.push({
      label: "Image Alt Text Missing",
      passed: false,
      recommendation: "Add descriptive alt text to your cover image for better indexing.",
    });
  }

  // 7. Content Length & Headings
  const wordCount = (article.content || "").trim().split(/\s+/).length;
  if (wordCount >= 300) {
    score += 10;
    checks.push({
      label: "Comprehensive Content Depth",
      passed: true,
      recommendation: `Article has ${wordCount} words and structured H2/H3 subheadings.`,
    });
  } else {
    checks.push({
      label: "Short Content Warning",
      passed: false,
      recommendation: "Search engines favor in-depth guides with at least 400+ words.",
    });
  }

  return { score, checks };
}
