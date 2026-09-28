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
import AdminLayoutClient from "@/components/admin/AdminLayoutClient";

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
  return <AdminLayoutClient>{children}</AdminLayoutClient>;
}
