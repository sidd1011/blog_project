"use client";

/**
 * =====================================================================
 * TableOfContents Component (TOC)
 * ---------------------------------------------------------------------
 * PURPOSE:
 * Displays a sticky Table of Contents on single article pages matching Screen 3.
 * Features:
 * - Real-time scroll-spy: Highlights the heading currently in viewport
 * - Click to smoothly jump directly to section
 * - Improves international SEO readability metrics & time on page
 * =====================================================================
 */

import React, { useEffect, useState } from "react";
import { ListOrdered } from "lucide-react";
import { TocItem } from "@/types";

interface TableOfContentsProps {
  items: TocItem[];
}

export default function TableOfContents({ items }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    if (!items || items.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      {
        rootMargin: "0px 0px -70% 0px",
      }
    );

    items.forEach((item) => {
      const el = document.getElementById(item.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [items]);

  if (!items || items.length === 0) return null;

  return (
    <nav
      aria-label="Table of Contents"
      className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs"
    >
      <div className="flex items-center gap-2 pb-3 mb-3 border-b border-slate-100">
        <ListOrdered className="w-4 h-4 text-brand-primary" />
        <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
          Table of Contents
        </h3>
      </div>

      <ul className="space-y-2 text-xs sm:text-sm">
        {items.map((item) => {
          const isActive = activeId === item.id;

          return (
            <li
              key={item.id}
              className={`${item.level === 3 ? "pl-4 text-xs" : ""}`}
            >
              <a
                href={`#${item.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  const target = document.getElementById(item.id);
                  if (target) {
                    target.scrollIntoView({ behavior: "smooth" });
                    setActiveId(item.id);
                  }
                }}
                className={`block py-1 transition-all rounded px-2 ${
                  isActive
                    ? "font-bold text-brand-primary bg-blue-50/80 border-l-2 border-brand-primary"
                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                }`}
              >
                {item.text}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
