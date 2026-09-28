/**
 * =====================================================================
 * Dynamic Robots.txt Generator (robots.ts -> /robots.txt)
 * ---------------------------------------------------------------------
 * PURPOSE:
 * Tells web crawlers (Googlebot, Bingbot, Slurp, etc.) which paths
 * are allowed to be indexed, disallows private admin CMS routes,
 * and specifies the exact location of the XML sitemap.
 * =====================================================================
 */

import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = "https://devlearn.in";

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/admin/", "/api/"],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
