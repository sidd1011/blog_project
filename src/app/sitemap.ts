/**
 * =====================================================================
 * Dynamic XML Sitemap Generator (sitemap.ts -> /sitemap.xml)
 * ---------------------------------------------------------------------
 * PURPOSE:
 * Automatically builds the XML sitemap for Google Search Console,
 * Bing Webmaster Tools, and global search engine crawlers.
 * Automatically appends newly created or edited articles.
 * =====================================================================
 */

import { MetadataRoute } from "next";
import { getArticles, getCategories } from "@/lib/db";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://devlearn.in";
  const articles = getArticles();
  const categories = getCategories();

  // Static core routes
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/categories`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${baseUrl}/privacy-policy`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.5,
    },
    {
      url: `${baseUrl}/terms`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.5,
    },
  ];

  // Dynamic category routes
  const categoryRoutes: MetadataRoute.Sitemap = categories.map((cat) => ({
    url: `${baseUrl}/blog?cat=${cat.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  // Dynamic individual article routes
  const articleRoutes: MetadataRoute.Sitemap = articles.map((article) => ({
    url: `${baseUrl}/blog/${article.slug}`,
    lastModified: new Date(article.updatedAt || article.publishedAt || Date.now()),
    changeFrequency: "weekly",
    priority: 0.85,
  }));

  return [...staticRoutes, ...categoryRoutes, ...articleRoutes];
}
