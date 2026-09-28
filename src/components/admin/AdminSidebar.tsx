"use client";

/**
 * =====================================================================
 * AdminSidebar Component
 * ---------------------------------------------------------------------
 * PURPOSE:
 * Navigation sidebar for the DevLearn Admin Dashboard.
 * Includes links to:
 * - Overview (/admin)
 * - Articles (/admin/articles)
 * - Create Article (/admin/articles/new)
 * - Categories (/admin/categories)
 * - Users & Authors (/admin/users)
 * - Technical SEO Manager (/admin/seo)
 * - Public Site Exit Link
 * =====================================================================
 */

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  FileText,
  PlusCircle,
  Layers,
  Users,
  Search,
  ExternalLink,
  Code,
  ShieldCheck,
  LogOut,
} from "lucide-react";

interface AdminSidebarProps {
  onLogout?: () => void;
}

export default function AdminSidebar({ onLogout }: AdminSidebarProps = {}) {
  const pathname = usePathname();

  const menuItems = [
    {
      name: "Overview",
      href: "/admin",
      icon: LayoutDashboard,
      exact: true,
    },
    {
      name: "All Articles",
      href: "/admin/articles",
      icon: FileText,
      exact: true,
    },
    {
      name: "New Article",
      href: "/admin/articles/new",
      icon: PlusCircle,
      exact: true,
    },
    {
      name: "Categories",
      href: "/admin/categories",
      icon: Layers,
      exact: true,
    },
    {
      name: "Users & Authors",
      href: "/admin/users",
      icon: Users,
      exact: true,
    },
    {
      name: "SEO Suite & Sitemaps",
      href: "/admin/seo",
      icon: Search,
      exact: true,
    },
  ];

  return (
    <aside className="w-64 bg-slate-900 text-slate-300 min-h-screen border-r border-slate-800 flex flex-col justify-between p-4 shrink-0">
      
      {/* Brand Header */}
      <div className="space-y-6">
        <Link href="/" className="flex items-center gap-3 px-2 py-2">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-brand-primary to-brand-secondary flex items-center justify-center text-white shadow-md">
            <Code className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg font-black text-white leading-tight">DevLearn</h2>
            <span className="text-[10px] font-semibold text-brand-accent tracking-wider uppercase">
              Admin & CMS
            </span>
          </div>
        </Link>

        {/* Menu Items */}
        <nav className="space-y-1">
          {menuItems.map((item) => {
            const isActive = item.exact
              ? pathname === item.href
              : pathname.startsWith(item.href);

            const Icon = item.icon;

            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  isActive
                    ? "bg-brand-primary text-white font-semibold shadow-sm"
                    : "text-slate-400 hover:text-white hover:bg-slate-800/80"
                }`}
              >
                <Icon className="w-4 h-4 shrink-0" />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Footer Exit Link */}
      <div className="pt-4 border-t border-slate-800 space-y-2">
        <Link
          href="/"
          target="_blank"
          className="flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
        >
          <span>View Public Site</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </Link>

        {/* Logout Button */}
        <button
          type="button"
          onClick={async () => {
            if (onLogout) {
              onLogout();
            } else {
              try {
                await fetch("/api/auth/logout", { method: "POST" });
              } finally {
                window.location.href = "/admin/login";
              }
            }
          }}
          className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold text-rose-400 hover:text-rose-200 hover:bg-rose-950/40 border border-transparent hover:border-rose-900/50 transition-colors text-left cursor-pointer"
        >
          <span className="flex items-center gap-2">
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out</span>
          </span>
          <span className="text-[10px] text-slate-500 font-mono">Exit</span>
        </button>

        <div className="p-3 bg-slate-950 rounded-xl border border-slate-800/80 text-[11px] text-slate-400 flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>SEO Engine v2.4 Active</span>
        </div>
      </div>

    </aside>
  );
}
