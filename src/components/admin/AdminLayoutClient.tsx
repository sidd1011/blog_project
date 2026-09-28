"use client";

/**
 * =====================================================================
 * Admin Layout Client Container (AdminLayoutClient.tsx)
 * ---------------------------------------------------------------------
 * PURPOSE:
 * Wraps admin pages. Automatically hides dashboard navigation and headers
 * when on the login route (/admin/login).
 * Embeds the AdminSidebar, top bar with user profile & instant logout.
 * =====================================================================
 */

import React, { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import AdminSidebar from "./AdminSidebar";
import { LogOut, Shield } from "lucide-react";

export default function AdminLayoutClient({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  // If viewing the login page, render clean full-screen content without sidebar/header
  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      await fetch("/api/auth/logout", { method: "POST" });
    } catch (e) {
      console.error("Logout failed:", e);
    } finally {
      router.push("/admin/login");
      router.refresh();
    }
  };

  return (
    <div className="flex min-h-screen bg-slate-100 text-slate-900 font-sans">
      {/* Fixed Admin Sidebar */}
      <AdminSidebar onLogout={handleLogout} />

      {/* Main Admin Workspace Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        {/* Top Minimal Admin Header */}
        <header className="h-16 bg-white border-b border-slate-200 px-6 sm:px-8 flex items-center justify-between sticky top-0 z-30 shadow-xs">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
              DevLearn CMS Dashboard
            </span>
          </div>

          <div className="flex items-center gap-4">
            {/* User Profile Card */}
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-slate-200 overflow-hidden border border-slate-300">
                <img
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80"
                  alt="Siddhartha Kumar"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="text-left hidden sm:block">
                <p className="text-xs font-bold text-slate-800 leading-tight">
                  Siddhartha Kumar
                </p>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <span className="text-[10px] text-brand-primary font-semibold flex items-center gap-0.5">
                    <Shield className="w-2.5 h-2.5" /> Super Admin
                  </span>
                  <span className="text-[10px] text-slate-400 font-mono">
                    (Sidd@gmail.com)
                  </span>
                </div>
              </div>
            </div>

            {/* Logout Action */}
            <button
              onClick={handleLogout}
              disabled={isLoggingOut}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-rose-600 hover:text-white bg-rose-50 hover:bg-rose-600 border border-rose-200/80 rounded-xl transition-all cursor-pointer disabled:opacity-50"
              title="Sign out of Admin Dashboard"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden md:inline">
                {isLoggingOut ? "Signing out..." : "Logout"}
              </span>
            </button>
          </div>
        </header>

        {/* Dashboard Pages Content */}
        <main className="p-6 sm:p-8 flex-1">{children}</main>
      </div>
    </div>
  );
}
