/**
 * =====================================================================
 * SchemaArticle Component (JSON-LD Structured Data)
 * ---------------------------------------------------------------------
 * PURPOSE:
 * Generates Schema.org JSON-LD structured data for Google & Bing crawlers.
 * Informs search engines that this page is an authoritative Article or
 * TechArticle with author, publisher, datePublished, dateModified,
 * and high-resolution images.
 *
 * CRITICAL FOR SEO:
 * Qualifies the article for Google Search rich snippets, knowledge graph,
 * and Google Discover carousel appearance.
 * =====================================================================
 */

import React from "react";
import { Article } from "@/types";

interface SchemaArticleProps {
  article: Article;
  siteUrl?: string;
}

export default function SchemaArticle({
  article,
  siteUrl = "https://devlearn.in",
}: SchemaArticleProps) {
  const schemaData = {
    "@context": "https://schema.org",
    "@type": article.seo.schemaType || "TechArticle",
    headline: article.title,
    description: article.seo.metaDescription || article.excerpt,
    image: [article.featuredImage],
    datePublished: article.publishedAt,
    dateModified: article.updatedAt || article.publishedAt,
    author: {
      "@type": "Person",
      name: article.author.name,
      jobTitle: article.author.role,
      url: `${siteUrl}/author/${article.author.id}`,
    },
    publisher: {
      "@type": "Organization",
      name: "DevLearn",
      logo: {
        "@type": "ImageObject",
        url: `${siteUrl}/logo.png`,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${siteUrl}/blog/${article.slug}`,
    },
    keywords: article.tags.join(", "),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
    />
  );
}
