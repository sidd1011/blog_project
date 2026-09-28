/**
 * =====================================================================
 * Privacy Policy Page (/privacy-policy)
 * ---------------------------------------------------------------------
 * PURPOSE:
 * Official Privacy Policy for DevLearn matching international GDPR,
 * CCPA, and search engine trust guidelines (E-E-A-T requirement).
 * Features:
 * 1. Single clear <h1> tag
 * 2. Structured <h2>/<h3> hierarchy
 * 3. Schema.org BreadcrumbList & WebPage JSON-LD
 * 4. Transparent explanations of cookies, analytics, and data rights
 * =====================================================================
 */

import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import { Shield, ChevronRight, Mail, Lock, Eye, FileText } from "lucide-react";
import SchemaBreadcrumb from "@/components/seo/SchemaBreadcrumb";

export const metadata: Metadata = {
  title: "Privacy Policy – DevLearn",
  description:
    "Learn how DevLearn collects, protects, and handles your data. Our Privacy Policy complies with international data protection standards.",
  alternates: {
    canonical: "https://devlearn.in/privacy-policy",
  },
};

export default function PrivacyPolicyPage() {
  const breadcrumbs = [
    { name: "Home", url: "https://devlearn.in" },
    { name: "Privacy Policy", url: "https://devlearn.in/privacy-policy" },
  ];

  return (
    <div className="bg-slate-50 min-h-screen py-10 sm:py-16">
      <SchemaBreadcrumb items={breadcrumbs} />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Breadcrumb Navigation */}
        <nav
          aria-label="Breadcrumb"
          className="flex items-center gap-2 text-xs sm:text-sm text-slate-500"
        >
          <Link href="/" className="hover:text-brand-primary transition-colors">
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <span className="text-slate-800 font-semibold">Privacy Policy</span>
        </nav>

        {/* Header Container */}
        <div className="bg-white p-8 sm:p-10 rounded-3xl border border-slate-200/80 shadow-xs space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-blue-50 text-brand-primary border border-blue-200">
            <Shield className="w-3.5 h-3.5" />
            <span>Data Protection & Privacy</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight">
            Privacy Policy
          </h1>

          <p className="text-xs sm:text-sm text-slate-500">
            Effective Date: September 20, 2026 • Last updated: September 27, 2026
          </p>

          <p className="text-sm sm:text-base text-slate-600 leading-relaxed pt-2">
            Welcome to DevLearn (&ldquo;we&rdquo;, &ldquo;our&rdquo;, or &ldquo;us&rdquo;). We respect your
            privacy and are committed to protecting any personal data you share with us.
            This Privacy Policy explains what information we collect, how it is used,
            and your rights regarding your information.
          </p>
        </div>

        {/* Detailed Sections */}
        <div className="bg-white p-8 sm:p-12 rounded-3xl border border-slate-200/80 shadow-xs space-y-10 text-slate-700 leading-relaxed text-sm sm:text-base">
          
          {/* Section 1 */}
          <section className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
              1. Information We Collect
            </h2>
            <p>
              We collect minimal information necessary to deliver high-quality technical
              articles and tutorials. The types of data collected include:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-slate-600">
              <li>
                <strong>Information you provide voluntarily</strong>: When you submit our
                contact form or subscribe to updates (such as your name and email address).
              </li>
              <li>
                <strong>Automated Log Data</strong>: When you visit our website, our servers
                may automatically log information such as your IP address, browser type,
                referring URL, pages visited, and timestamps.
              </li>
              <li>
                <strong>Technical Cookies</strong>: Minimal session cookies to remember
                reading preferences (such as code block themes or search history).
              </li>
            </ul>
          </section>

          {/* Section 2 */}
          <section className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
              2. How We Use Your Information
            </h2>
            <p>We use the collected information for the following legitimate purposes:</p>
            <ul className="list-disc pl-6 space-y-2 text-slate-600">
              <li>To provide, maintain, and improve our developer guides and tutorials.</li>
              <li>To respond directly to comments, inquiries, and collaboration requests.</li>
              <li>To monitor website speed, Core Web Vitals, and prevent security exploits.</li>
              <li>To analyze anonymized aggregated traffic trends.</li>
            </ul>
          </section>

          {/* Section 3 */}
          <section className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
              3. Cookies and Analytics
            </h2>
            <p>
              DevLearn uses privacy-respecting analytics and standard browser cookies to
              understand how users engage with our guides. You can choose to disable cookies
              through your individual browser settings without affecting your ability to
              read our technical articles.
            </p>
          </section>

          {/* Section 4 */}
          <section className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
              4. Third-Party Services
            </h2>
            <p>
              We do not sell, trade, or rent your personal identification information to
              third parties. We may use trusted third-party cloud infrastructure (such as
              Vercel for hosting, GitHub for open-source repositories, and Unsplash for
              cover imagery) that adhere to rigorous international security certifications.
            </p>
          </section>

          {/* Section 5 */}
          <section className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
              5. Your Data Protection Rights (GDPR & CCPA)
            </h2>
            <p>
              Depending on your location, you have certain rights under data protection
              laws:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-slate-600">
              <li><strong>Right to Access</strong>: Request copies of any personal data we hold.</li>
              <li><strong>Right to Rectification</strong>: Request correction of inaccurate info.</li>
              <li><strong>Right to Erasure</strong>: Request deletion of your personal data.</li>
            </ul>
          </section>

          {/* Section 6 */}
          <section className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
              6. Contact Us Regarding Privacy
            </h2>
            <p>
              If you have any questions, concerns, or requests regarding this Privacy
              Policy or our data handling practices, please contact our Data Protection
              team:
            </p>
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 text-xs sm:text-sm space-y-1">
              <p><strong>Email</strong>: <a href="mailto:privacy@devlearn.in" className="text-brand-primary hover:underline">privacy@devlearn.in</a></p>
              <p><strong>Location</strong>: DevLearn Media, India</p>
            </div>
          </section>

        </div>

      </div>
    </div>
  );
}
