/**
 * =====================================================================
 * SchemaBreadcrumb Component (BreadcrumbList Structured Data)
 * ---------------------------------------------------------------------
 * PURPOSE:
 * Outputs Schema.org BreadcrumbList JSON-LD to help search engines display
 * hierarchical breadcrumbs directly inside the search result SERP snippet
 * (e.g. devlearn.in > Web Dev > React > React Website Deploy Kaise Karein).
 * =====================================================================
 */

import React from "react";

export interface BreadcrumbItem {
  name: string;
  url: string;
}

interface SchemaBreadcrumbProps {
  items: BreadcrumbItem[];
}

export default function SchemaBreadcrumb({ items }: SchemaBreadcrumbProps) {
  const breadcrumbData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbData) }}
    />
  );
}
