/**
 * =====================================================================
 * Single Article Page (Screen 3)
 * ---------------------------------------------------------------------
 * PURPOSE:
 * Displays single article reading experience matching Screen 3.
 *
 * INTERNATIONAL SEO CHECKLIST IMPLEMENTATION:
 * 1. Exactly ONE clear <h1> tag containing the focus keyword
 * 2. Proper <h2> and <h3> heading hierarchy
 * 3. Short, highly readable paragraphs
 * 4. Interactive sticky Table of Contents with scroll-spy
 * 5. Clean, descriptive URL slug: /blog/[slug]
 * 6. Dynamic unique <title> and <meta name="description"> via generateMetadata
 * 7. Open Graph (og:title, og:description, og:image, og:url, og:type) & Twitter card
 * 8. Canonical URL tag
 * 9. Schema.org Article / TechArticle JSON-LD structured data
 * 10. Schema.org BreadcrumbList JSON-LD structured data
 * 11. Internal links connecting to related tutorials
 * 12. Optimized cover image with mandatory alt text
 * 13. Prev & Next article navigation cards
 * 14. Social share buttons
 * =====================================================================
 */

import React from "react";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import Link from "next/link";
import {
  Calendar,
  Clock,
  User,
  ChevronRight,
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Share2,
  Sparkles,
} from "lucide-react";
import { getArticleBySlug, getArticles } from "@/lib/db";
import TableOfContents from "@/components/blog/TableOfContents";
import ShareButtons from "@/components/blog/ShareButtons";
import CodeBlock from "@/components/blog/CodeBlock";
import SchemaArticle from "@/components/seo/SchemaArticle";
import SchemaBreadcrumb from "@/components/seo/SchemaBreadcrumb";

interface ArticlePageProps {
  params: {
    slug: string;
  };
}

export const revalidate = 0;

/**
 * Generates dynamic SEO metadata for search crawlers & social sharing cards
 */
export async function generateMetadata({
  params,
}: ArticlePageProps): Promise<Metadata> {
  const article = getArticleBySlug(params.slug);
  if (!article) {
    return { title: "Article Not Found | DevLearn" };
  }

  const siteUrl = "https://devlearn.in";
  const canonicalUrl = article.seo?.canonicalUrl || `${siteUrl}/blog/${article.slug}`;

  return {
    title: article.seo?.metaTitle || article.title,
    description: article.seo?.metaDescription || article.excerpt,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: article.seo?.metaTitle || article.title,
      description: article.seo?.metaDescription || article.excerpt,
      url: canonicalUrl,
      type: "article",
      publishedTime: article.publishedAt,
      modifiedTime: article.updatedAt || article.publishedAt,
      authors: [article.author.name],
      images: [
        {
          url: article.seo?.ogImage || article.featuredImage,
          width: 1200,
          height: 630,
          alt: article.imageAlt || article.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: article.seo?.metaTitle || article.title,
      description: article.seo?.metaDescription || article.excerpt,
      images: [article.seo?.ogImage || article.featuredImage],
    },
  };
}

export default function SingleArticlePage({ params }: ArticlePageProps) {
  const article = getArticleBySlug(params.slug);

  if (!article) {
    notFound();
  }

  const allArticles = getArticles();
  const currentIndex = allArticles.findIndex((a) => a.id === article.id);
  const prevArticle = currentIndex > 0 ? allArticles[currentIndex - 1] : null;
  const nextArticle =
    currentIndex < allArticles.length - 1 ? allArticles[currentIndex + 1] : null;

  // Filter related articles (same category or general)
  const relatedArticles = allArticles
    .filter((a) => a.id !== article.id)
    .slice(0, 3);

  const currentUrl = `https://devlearn.in/blog/${article.slug}`;

  // Breadcrumb items for structured data and visual bar
  const breadcrumbItems = [
    { name: "Home", url: "https://devlearn.in" },
    { name: "Tutorials", url: "https://devlearn.in/blog" },
    { name: article.category, url: `https://devlearn.in/blog?cat=${article.categorySlug}` },
    { name: article.title, url: currentUrl },
  ];

  return (
    <div className="bg-slate-50 min-h-screen py-8 sm:py-12">
      
      {/* 1. SCHEMA.ORG STRUCTURED DATA INJECTION */}
      <SchemaArticle article={article} siteUrl="https://devlearn.in" />
      <SchemaBreadcrumb items={breadcrumbItems} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* 2. VISUAL BREADCRUMBS NAVIGATION (Screen 3) */}
        <nav
          aria-label="Breadcrumbs"
          className="flex items-center gap-2 text-xs sm:text-sm text-slate-500 mb-6 overflow-x-auto whitespace-nowrap pb-1"
        >
          <Link href="/" className="hover:text-brand-primary transition-colors">
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
          <Link href="/blog" className="hover:text-brand-primary transition-colors">
            Web Dev
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
          <Link
            href={`/blog?cat=${article.categorySlug}`}
            className="hover:text-brand-primary transition-colors font-medium text-slate-700"
          >
            {article.category}
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
          <span className="text-slate-400 truncate max-w-[200px] sm:max-w-xs">
            {article.title}
          </span>
        </nav>

        {/* 3. MAIN ARTICLE GRID (Content + Sidebar) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* LEFT/CENTER: MAIN ARTICLE CONTENT (Screen 3) */}
          <article className="lg:col-span-8 bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-10 shadow-xs space-y-8">
            
            {/* Category Tag Badge */}
            <div>
              <span className="inline-block px-3.5 py-1 rounded-full text-xs font-bold bg-blue-50 text-brand-primary border border-blue-200 uppercase tracking-wide">
                {article.category}
              </span>
            </div>

            {/* Exactly ONE H1 Tag (SEO requirement) */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-[1.18]">
              {article.title}
            </h1>

            {/* Author, Date & Reading Time Meta Bar */}
            <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-xs sm:text-sm text-slate-500 pb-6 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <img
                  src={article.author.avatar}
                  alt={article.author.name}
                  className="w-7 h-7 rounded-full object-cover border border-slate-200"
                />
                <span className="font-semibold text-slate-800">
                  By {article.author.name}
                </span>
              </div>
              <span>•</span>
              <div className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-slate-400" />
                <span>{article.publishedAt}</span>
              </div>
              <span>•</span>
              <div className="flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-slate-400" />
                <span>{article.readingTime}</span>
              </div>
            </div>

            {/* Featured Image with SEO Alt Text */}
            <div className="rounded-2xl overflow-hidden shadow-md border border-slate-100 aspect-[16/9] bg-slate-100">
              <img
                src={article.featuredImage}
                alt={article.imageAlt || article.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Article Body Content */}
            <div className="prose prose-slate max-w-none space-y-6 text-slate-700 leading-relaxed text-base sm:text-lg">
              
              {/* 1. INTRODUCTION */}
              <section id="introduction">
                <h2 className="text-2xl font-bold text-slate-900 tracking-tight mb-3">
                  1. Introduction
                </h2>
                <p>
                  React ek popular JavaScript library hai jiska use karke hum fast aur
                  interactive web applications bana sakte hain. Is guide mein hum step by
                  step dekhenge ki React website ko free mein Vercel aur Netlify par kaise
                  deploy karein.
                </p>
                <p>
                  Modern cloud hosting platforms jaise Vercel direct GitHub integration
                  provide karte hain. Jaise hi aap naya code branch par push karenge,
                  continuous integration pipelines automatic build trigger karke aapki
                  site ko live kar deti hain.
                </p>
              </section>

              {/* 2. WHAT YOU NEED CHECKLIST */}
              <section id="what-you-need" className="bg-slate-50 p-6 rounded-2xl border border-slate-200/80">
                <h2 className="text-xl font-bold text-slate-900 tracking-tight mb-4">
                  2. What You Need
                </h2>
                <ul className="space-y-3">
                  <li className="flex items-center gap-3 text-sm sm:text-base font-medium text-slate-800">
                    <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
                    <span>Node.js installed on your system (v18 ya latest)</span>
                  </li>
                  <li className="flex items-center gap-3 text-sm sm:text-base font-medium text-slate-800">
                    <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
                    <span>GitHub account</span>
                  </li>
                  <li className="flex items-center gap-3 text-sm sm:text-base font-medium text-slate-800">
                    <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
                    <span>Vercel account (free tier)</span>
                  </li>
                  <li className="flex items-center gap-3 text-sm sm:text-base font-medium text-slate-800">
                    <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
                    <span>A React project (Vite ya Create React App)</span>
                  </li>
                </ul>
              </section>

              {/* 3. STEP 1: PROJECT SETUP & CODE BLOCK */}
              <section id="step-1-project-setup">
                <h2 className="text-2xl font-bold text-slate-900 tracking-tight mb-3">
                  3. Step 1: Project Setup
                </h2>
                <p>
                  Sabse pehle ek naya React project banayein ya existing project use karein.
                  Terminal mein check karein:
                </p>
                
                <CodeBlock
                  language="bash"
                  code={`# Check Node version\nnode -v\n\n# Install Vite (if not installed)\nnpm create vite@latest my-app\ncd my-app\nnpm install`}
                />
              </section>

              {/* 4. STEP 2: BUILD THE PROJECT */}
              <section id="step-2-build-the-project">
                <h2 className="text-2xl font-bold text-slate-900 tracking-tight mb-3">
                  4. Step 2: Build the Project
                </h2>
                <p>
                  Deploy karne se pehle local build verify karna zaroori hai taaki production
                  environment mein koi missing dependencies ya build syntax failure na aaye:
                </p>

                <CodeBlock
                  language="bash"
                  code={`npm run build`}
                />
              </section>

              {/* 5. STEP 3: DEPLOY TO VERCEL */}
              <section id="step-3-deploy-to-vercel">
                <h2 className="text-2xl font-bold text-slate-900 tracking-tight mb-3">
                  5. Step 3: Deploy to Vercel
                </h2>
                <p>
                  GitHub par repository create karke code push karein. Iske baad Vercel
                  dashboard mein jakar <strong>Import Git Repository</strong> select karein.
                  Build settings auto-detect ho jaati hain. Click <strong>Deploy</strong>!
                </p>
              </section>

              {/* 6. COMMON ISSUES */}
              <section id="common-issues">
                <h2 className="text-2xl font-bold text-slate-900 tracking-tight mb-3">
                  6. Common Issues & Routing Fix
                </h2>
                <p>
                  Agar client-side routing (React Router) mein page refresh karne par 404
                  error aaye, toh root directory mein ek `vercel.json` file create karein:
                </p>

                <CodeBlock
                  language="json"
                  code={`{\n  "rewrites": [\n    { "source": "/(.*)", "destination": "/index.html" }\n  ]\n}`}
                />
              </section>

              {/* 7. CONCLUSION */}
              <section id="conclusion">
                <h2 className="text-2xl font-bold text-slate-900 tracking-tight mb-3">
                  7. Conclusion
                </h2>
                <p>
                  Aapki React application safely live ho chuki hai. Vercel automatically SSL
                  certificate provide karta hai aur har pull request par preview URL
                  generate karta hai.
                </p>
              </section>

            </div>

            {/* Prev / Next Article Navigation Cards (Screen 3) */}
            <div className="pt-8 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {prevArticle ? (
                <Link
                  href={`/blog/${prevArticle.slug}`}
                  className="p-4 rounded-2xl border border-slate-200/80 bg-slate-50 hover:bg-white hover:border-brand-primary/40 hover:shadow-md transition-all group flex flex-col justify-between"
                >
                  <span className="text-xs font-semibold text-slate-400 group-hover:text-brand-primary flex items-center gap-1 mb-1">
                    <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
                    <span>Previous Article</span>
                  </span>
                  <span className="text-sm font-bold text-slate-800 line-clamp-1">
                    {prevArticle.title}
                  </span>
                </Link>
              ) : <div />}

              {nextArticle ? (
                <Link
                  href={`/blog/${nextArticle.slug}`}
                  className="p-4 rounded-2xl border border-slate-200/80 bg-slate-50 hover:bg-white hover:border-brand-primary/40 hover:shadow-md transition-all group flex flex-col justify-between text-right"
                >
                  <span className="text-xs font-semibold text-slate-400 group-hover:text-brand-primary flex items-center justify-end gap-1 mb-1">
                    <span>Next Article</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </span>
                  <span className="text-sm font-bold text-slate-800 line-clamp-1">
                    {nextArticle.title}
                  </span>
                </Link>
              ) : <div />}
            </div>

            {/* Author Bio Box */}
            <div className="mt-8 p-6 bg-slate-50 rounded-2xl border border-slate-200/80 flex items-start gap-4">
              <img
                src={article.author.avatar}
                alt={article.author.name}
                className="w-14 h-14 rounded-2xl object-cover border-2 border-white shadow-sm shrink-0"
              />
              <div className="space-y-1">
                <h4 className="text-base font-bold text-slate-900">
                  {article.author.name}
                </h4>
                <p className="text-xs font-semibold text-brand-primary">
                  {article.author.role}
                </p>
                <p className="text-xs text-slate-600 leading-relaxed pt-1">
                  {article.author.bio}
                </p>
              </div>
            </div>

          </article>

          {/* RIGHT COLUMN: STICKY TOC, SHARE & RELATED ARTICLES (Screen 3) */}
          <aside className="lg:col-span-4 space-y-6 lg:sticky lg:top-24">
            
            {/* 1. Table of Contents */}
            <TableOfContents items={article.tableOfContents} />

            {/* 2. Share This Article */}
            <ShareButtons title={article.title} url={currentUrl} />

            {/* 3. Related Articles Cards */}
            <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs space-y-4">
              <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider pb-2 border-b border-slate-100 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-brand-primary" />
                <span>Related Articles</span>
              </h4>

              <div className="space-y-3">
                {relatedArticles.map((rel) => (
                  <Link
                    key={rel.id}
                    href={`/blog/${rel.slug}`}
                    className="flex items-center gap-3 p-2 rounded-xl hover:bg-slate-50 group transition-all"
                  >
                    <img
                      src={rel.featuredImage}
                      alt={rel.title}
                      className="w-14 h-14 rounded-lg object-cover bg-slate-100 shrink-0 group-hover:scale-105 transition-transform"
                    />
                    <div className="space-y-0.5 flex-1 min-w-0">
                      <p className="text-xs font-bold text-slate-800 group-hover:text-brand-primary line-clamp-2 transition-colors">
                        {rel.title}
                      </p>
                      <p className="text-[11px] text-slate-400">
                        {rel.publishedAt}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

          </aside>

        </div>

      </div>
    </div>
  );
}
