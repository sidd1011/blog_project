"use client";

/**
 * =====================================================================
 * Navbar Component
 * ---------------------------------------------------------------------
 * PURPOSE:
 * The primary navigation header matching Screen 1 and Screen 8.
 * Features:
 * 1. Brand logo `</> DevLearn` with tagline `Code • Test • Grow`.
 * 2. Responsive desktop menu with active state indicators.
 * 3. Instant global search input that redirects on Enter or submit.
 * 4. Fast direct link to the Admin Dashboard (/admin).
 * 5. Mobile hamburger menu with smooth slide-in mobile navigation drawer.
 * =====================================================================
 */

import React, { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Code,
  Search,
  Menu,
  X,
} from "lucide-react";

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setMobileMenuOpen(false);
    }
  };

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Tutorials", href: "/blog" },
    { name: "Web Dev", href: "/blog?cat=react" },
    { name: "QA & Testing", href: "/blog?cat=qa-testing" },
    { name: "DevOps", href: "/blog?cat=devops" },
    { name: "Categories", href: "/categories" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-sm transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          
          {/* 1. BRAND LOGO */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-primary to-brand-secondary flex items-center justify-center text-white shadow-md shadow-brand-primary/25 group-hover:scale-105 transition-transform">
              <Code className="w-6 h-6 stroke-[2.5]" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl sm:text-2xl font-black tracking-tight text-slate-900 group-hover:text-brand-primary transition-colors">
                DevLearn
              </span>
              <span className="text-[10px] font-semibold tracking-wider uppercase text-slate-400 -mt-1 hidden sm:block">
                Code • Test • Grow
              </span>
            </div>
          </Link>

          {/* 2. DESKTOP NAVIGATION LINKS */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navLinks.map((link) => {
              const isActive =
                link.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(link.href.split("?")[0]) &&
                    (link.href.includes("?")
                      ? false
                      : true);

              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                    isActive
                      ? "text-brand-primary bg-blue-50/80 font-semibold"
                      : "text-slate-600 hover:text-slate-900 hover:bg-slate-100/80"
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>

          {/* 3. SEARCH BAR */}
          <div className="hidden sm:flex items-center gap-3">
            <form onSubmit={handleSearchSubmit} className="relative">
              <input
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-48 xl:w-60 pl-9 pr-4 py-2 text-sm bg-slate-100 hover:bg-slate-100/80 focus:bg-white border border-transparent focus:border-brand-primary/40 rounded-full focus:outline-none focus:ring-2 focus:ring-brand-primary/20 text-slate-800 placeholder-slate-400 transition-all"
              />
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            </form>
          </div>

          {/* 4. MOBILE HAMBURGER TOGGLE */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-700 hover:bg-slate-100 focus:outline-none"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* 5. MOBILE DRAWER MENU */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-slate-200 px-4 pt-3 pb-6 space-y-4 shadow-xl animate-in slide-in-from-top duration-200">
          <form onSubmit={handleSearchSubmit} className="relative">
            <input
              type="text"
              placeholder="Search tutorials, topics..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 text-sm bg-slate-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-primary/30"
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          </form>

          <div className="grid grid-cols-2 gap-1 pt-1">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2.5 rounded-lg text-sm font-medium text-slate-700 hover:bg-blue-50 hover:text-brand-primary"
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
