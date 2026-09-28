/**
 * =====================================================================
 * Admin Layout (src/app/admin/layout.tsx)
 * ---------------------------------------------------------------------
 * PURPOSE:
 * Specialized layout container for the DevLearn CMS Admin Dashboard.
 * Embeds the persistent AdminSidebar, header bar, and main workspace.
 * =====================================================================
 */

import React from "react";
import AdminSidebar from "@/components/admin/AdminSidebar";

export const metadata = {
  title: "Admin Dashboard | DevLearn CMS",
  robots: {
    index: false,
    follow: false,
  },
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-slate-100 text-slate-900 font-sans">
      {/* Fixed Admin Sidebar */}
      <AdminSidebar />

      {/* Main Admin Workspace Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        {/* Top Minimal Admin Header */}
        <header className="h-16 bg-white border-b border-slate-200 px-6 sm:px-8 flex items-center justify-between sticky top-0 z-30 shadow-xs">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
              DevLearn CMS Dashboard
            </span>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-slate-200 overflow-hidden border border-slate-300">
              <img
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80"
                alt="Siddhartha"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="text-left hidden sm:block">
              <p className="text-xs font-bold text-slate-800 leading-tight">
                Siddhartha Kumar
              </p>
              <p className="text-[10px] text-brand-primary font-semibold">
                Super Admin
              </p>
            </div>
          </div>
        </header>

        {/* Dashboard Pages Content */}
        <main className="p-6 sm:p-8 flex-1">{children}</main>
      </div>
    </div>
  );
}
