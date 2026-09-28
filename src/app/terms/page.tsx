/**
 * =====================================================================
 * Terms and Conditions Page (/terms)
 * ---------------------------------------------------------------------
 * PURPOSE:
 * Terms of Service and Conditions governing the use of DevLearn
 * educational tutorials, code snippets, and platform services.
 * Features:
 * 1. Single clear <h1> tag
 * 2. Structured <h2>/<h3> hierarchy
 * 3. Open-source code snippet reuse permissions (MIT-style fair use)
 * 4. Disclaimer of warranties & acceptable use guidelines
 * =====================================================================
 */

import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import { FileCheck, ChevronRight, Scale, AlertCircle, BookOpen } from "lucide-react";
import SchemaBreadcrumb from "@/components/seo/SchemaBreadcrumb";

export const metadata: Metadata = {
  title: "Terms and Conditions – DevLearn",
  description:
    "Read the terms, conditions, and code usage guidelines for accessing DevLearn tutorials and software development guides.",
  alternates: {
    canonical: "https://devlearn.in/terms",
  },
};

export default function TermsPage() {
  const breadcrumbs = [
    { name: "Home", url: "https://devlearn.in" },
    { name: "Terms & Conditions", url: "https://devlearn.in/terms" },
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
          <span className="text-slate-800 font-semibold">Terms and Conditions</span>
        </nav>

        {/* Header Container */}
        <div className="bg-white p-8 sm:p-10 rounded-3xl border border-slate-200/80 shadow-xs space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-purple-50 text-brand-secondary border border-purple-200">
            <Scale className="w-3.5 h-3.5" />
            <span>Legal Agreement</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight">
            Terms and Conditions
          </h1>

          <p className="text-xs sm:text-sm text-slate-500">
            Effective Date: September 20, 2026 • Last updated: September 27, 2026
          </p>

          <p className="text-sm sm:text-base text-slate-600 leading-relaxed pt-2">
            Please read these Terms and Conditions (&ldquo;Terms&rdquo;) carefully before using the
            DevLearn website and learning resources operated by DevLearn Media.
          </p>
        </div>

        {/* Detailed Sections */}
        <div className="bg-white p-8 sm:p-12 rounded-3xl border border-slate-200/80 shadow-xs space-y-10 text-slate-700 leading-relaxed text-sm sm:text-base">
          
          {/* Section 1 */}
          <section className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
              1. Acceptance of Terms
            </h2>
            <p>
              By accessing and reading DevLearn tutorials, you agree to be bound by these
              Terms. If you disagree with any part of these terms, you may not access our
              services.
            </p>
          </section>

          {/* Section 2 */}
          <section className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
              2. Code Snippet License & Permissions
            </h2>
            <p>
              We believe in open learning. All educational code snippets, configuration
              examples (such as Docker Compose files, Cypress test scripts, and React
              boilerplate code) published on DevLearn are made available for you to use,
              copy, modify, and integrate into your personal and commercial projects
              without requiring royalty payments.
            </p>
            <p className="text-slate-600 text-xs sm:text-sm bg-slate-50 p-4 rounded-xl border border-slate-100">
              <strong>Fair Use Note:</strong> You may not copy, scrape, or republish
              entire articles or substantial written editorial content onto another
              website without prior written attribution and canonical link back to DevLearn.
            </p>
          </section>

          {/* Section 3 */}
          <section className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
              3. Disclaimer of Warranties
            </h2>
            <p>
              Our guides are provided on an &ldquo;AS IS&rdquo; and &ldquo;AS AVAILABLE&rdquo; basis. While we
              strive to verify all commands, dependencies, and code samples with current
              versions, software frameworks evolve rapidly. DevLearn makes no warranties
              that the code will be error-free or uninterrupted in every individual server
              environment.
            </p>
          </section>

          {/* Section 4 */}
          <section className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
              4. External Links
            </h2>
            <p>
              Our tutorials may contain links to external third-party tools, documentation,
              or GitHub repositories that are not owned or controlled by DevLearn. We have
              no control over and assume no responsibility for the content, privacy
              policies, or practices of any third-party websites.
            </p>
          </section>

          {/* Section 5 */}
          <section className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
              5. Changes to These Terms
            </h2>
            <p>
              We reserve the right to modify or replace these Terms at any time. Material
              revisions will be noted with an updated effective date at the top of this
              page.
            </p>
          </section>

          {/* Section 6 */}
          <section className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
              6. Contact Information
            </h2>
            <p>
              For legal inquiries, copyright notices, or questions about these Terms,
              please contact:
            </p>
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 text-xs sm:text-sm space-y-1">
              <p><strong>Email</strong>: <a href="mailto:legal@devlearn.in" className="text-brand-primary hover:underline">legal@devlearn.in</a></p>
              <p><strong>Address</strong>: DevLearn Media, India</p>
            </div>
          </section>

        </div>

      </div>
    </div>
  );
}
