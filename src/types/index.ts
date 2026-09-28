/**
 * =====================================================================
 * DevLearn Platform - TypeScript Definitions
 * ---------------------------------------------------------------------
 * This file contains all the core interfaces used across the public blog,
 * single post pages, categories, search, and the Admin CMS dashboard.
 * Designed for strong typing, SEO field tracking, and modular expansion.
 * =====================================================================
 */

/**
 * Table of contents item extracted from article headings for navigation & SEO
 */
export interface TocItem {
  id: string;      // Anchor id (e.g., 'step-1-project-setup')
  text: string;    // Display title
  level: 2 | 3;    // H2 or H3
}

/**
 * Complete SEO metadata structure for international Google/Bing crawling
 */
export interface ArticleSeo {
  metaTitle: string;          // Page <title> (50-60 characters recommended)
  metaDescription: string;    // Meta description snippet (150-160 chars)
  canonicalUrl?: string;      // Custom canonical URL or defaults to full page URL
  focusKeyword: string;       // Target primary keyword for audit scoring
  ogImage: string;            // Social sharing preview card image (1200x630px)
  schemaType: "Article" | "BlogPosting" | "TechArticle"; // Schema.org specification
}

/**
 * Author / User profile associated with articles
 */
export interface Author {
  id: string;
  name: string;
  avatar: string;
  role: "Admin" | "Senior Technical Writer" | "QA Engineer" | "DevOps Architect" | "Contributor";
  bio: string;
}

/**
 * Article / Blog post model
 */
export interface Article {
  id: string;
  slug: string;                 // URL friendly slug (e.g. 'react-website-deploy-kaise-karein')
  title: string;                // Primary H1 title
  excerpt: string;              // 1-2 sentence preview for cards and search
  content: string;              // Rich markdown/HTML body with sections, code blocks, checklists
  category: string;             // Category name (e.g., 'React', 'QA & Testing')
  categorySlug: string;         // Category URL slug (e.g., 'react', 'qa-testing')
  tags: string[];               // Keyword tags (e.g., ['React', 'Vercel', 'Deployment'])
  author: Author;               // Author details
  publishedAt: string;          // ISO date or formatted (e.g. 'Sep 20, 2026')
  updatedAt?: string;           // Optional update date for freshness signals
  readingTime: string;          // e.g. '8 min read'
  featuredImage: string;        // Visual cover banner image
  imageAlt: string;             // Crucial SEO image alt tag
  isFeatured?: boolean;         // Featured on homepage banner / top slot
  status: "published" | "draft";// Publication state
  views: number;                // View count metric
  tableOfContents: TocItem[];   // Structured TOC
  seo: ArticleSeo;              // Deep SEO configuration
}

/**
 * Category model for topic pages and sidebar filtering
 */
export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  icon: string;       // Lucide icon identifier
  color: string;      // Hex or Tailwind color class
  count: number;      // Total published articles
}

/**
 * Dashboard & System User model
 */
export interface DashboardUser {
  id: string;
  name: string;
  email: string;
  role: "admin" | "editor" | "author";
  avatar: string;
  bio: string;
  articlesCount: number;
  status: "active" | "inactive";
  joinedDate: string;
}

/**
 * Contact Form Message model
 */
export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  message: string;
  createdAt: string;
  isRead: boolean;
}

/**
 * SEO Audit Result calculated in the admin CMS
 */
export interface SeoAuditScore {
  score: number; // 0 - 100
  checks: {
    label: string;
    passed: boolean;
    recommendation: string;
  }[];
}
