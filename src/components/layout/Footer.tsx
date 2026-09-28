/**
 * =====================================================================
 * Footer Component
 * ---------------------------------------------------------------------
 * PURPOSE:
 * Displays the global site footer matching Screen 1.
 * Provides internal SEO links (Google crawler link discovery),
 * social channels, copyright note, and technical sitemap links.
 * =====================================================================
 */

import React from "react";
import Link from "next/link";
import { Code, Github, Twitter, Youtube, Disc as Discord, Heart } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-slate-950 text-slate-400 border-t border-slate-900 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8">
          
          {/* Brand Info & Tagline */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="inline-flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-primary to-brand-secondary flex items-center justify-center text-white shadow-lg shadow-brand-primary/20">
                <Code className="w-6 h-6 stroke-[2.5]" />
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-black tracking-tight text-white">
                  DevLearn
                </span>
                <span className="text-xs font-semibold tracking-wider uppercase text-slate-400 -mt-1">
                  Code • Test • Grow
                </span>
              </div>
            </Link>

            <p className="text-sm text-slate-400 leading-relaxed max-w-sm">
              Empowering engineers worldwide with practical, in-depth guides for
              Full-Stack Web Development, QA Automation, DevOps pipelines, and Technical SEO.
            </p>

            {/* Social Links */}
            <div className="pt-2">
              <h4 className="text-xs font-semibold text-slate-300 uppercase tracking-wider mb-3">
                Follow Us
              </h4>
              <div className="flex items-center gap-3">
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub"
                  className="w-9 h-9 rounded-lg bg-slate-900 hover:bg-brand-primary hover:text-white flex items-center justify-center text-slate-400 transition-colors"
                >
                  <Github className="w-4 h-4" />
                </a>
                <a
                  href="https://discord.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Discord"
                  className="w-9 h-9 rounded-lg bg-slate-900 hover:bg-brand-primary hover:text-white flex items-center justify-center text-slate-400 transition-colors"
                >
                  <Discord className="w-4 h-4" />
                </a>
                <a
                  href="https://youtube.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="YouTube"
                  className="w-9 h-9 rounded-lg bg-slate-900 hover:bg-brand-primary hover:text-white flex items-center justify-center text-slate-400 transition-colors"
                >
                  <Youtube className="w-4 h-4" />
                </a>
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Twitter / X"
                  className="w-9 h-9 rounded-lg bg-slate-900 hover:bg-brand-primary hover:text-white flex items-center justify-center text-slate-400 transition-colors"
                >
                  <Twitter className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">
              Quick Links
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/" className="hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-white transition-colors">
                  Tutorials & Guides
                </Link>
              </li>
              <li>
                <Link href="/categories" className="hover:text-white transition-colors">
                  All Categories
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-white transition-colors">
                  About DevLearn
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/privacy-policy" className="hover:text-white transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-white transition-colors">
                  Terms & Conditions
                </Link>
              </li>
            </ul>
          </div>

          {/* Popular Categories */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">
              Top Topics
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/blog?cat=react" className="hover:text-white transition-colors">
                  React Development
                </Link>
              </li>
              <li>
                <Link href="/blog?cat=qa-testing" className="hover:text-white transition-colors">
                  QA & Cypress Testing
                </Link>
              </li>
              <li>
                <Link href="/blog?cat=api" className="hover:text-white transition-colors">
                  Postman & REST APIs
                </Link>
              </li>
              <li>
                <Link href="/blog?cat=devops" className="hover:text-white transition-colors">
                  DevOps & Monitoring
                </Link>
              </li>
              <li>
                <Link href="/blog?cat=linux" className="hover:text-white transition-colors">
                  Linux Terminal Cheats
                </Link>
              </li>
            </ul>
          </div>

          {/* Technical Resources */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">
              Technical Resources
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <a href="/sitemap.xml" target="_blank" className="hover:text-white transition-colors">
                  XML Sitemap
                </a>
              </li>
              <li>
                <a href="/robots.txt" target="_blank" className="hover:text-white transition-colors">
                  Robots.txt
                </a>
              </li>
              <li>
                <Link href="/about#mission" className="hover:text-white transition-colors">
                  Our Mission
                </Link>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar with Copyright */}
        <div className="border-t border-slate-900 mt-12 pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© 2026 DevLearn. All rights reserved.</p>
          <p className="flex items-center gap-1.5 text-slate-400">
            <span>Built with</span>
            <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500" />
            <span>for Developers</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
