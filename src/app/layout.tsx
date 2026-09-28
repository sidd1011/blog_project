/**
 * =====================================================================
 * Root Layout (layout.tsx)
 * ---------------------------------------------------------------------
 * PURPOSE:
 * Base HTML document layout for the entire DevLearn platform.
 * Provides:
 * - Default global SEO metadata, title template, and descriptions
 * - Open Graph & Twitter Card defaults
 * - Canonical root link
 * - Viewport configuration for mobile responsiveness
 * - Global Navbar & Footer inclusion
 * =====================================================================
 */

import type { Metadata, Viewport } from "next";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#3062F6",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://devlearn.in"),
  title: {
    default: "DevLearn – Learn. Build. Grow. | Modern Tech Tutorials",
    template: "%s | DevLearn",
  },
  description:
    "Practical guides, tutorials and real-world examples for Web Development, QA Testing, DevOps and more.",
  keywords: [
    "Web Development",
    "React tutorials",
    "Cypress QA Testing",
    "Postman API",
    "Docker DevOps",
    "Linux Commands",
    "Technical SEO",
  ],
  authors: [{ name: "Siddhartha Kumar", url: "https://devlearn.in" }],
  creator: "DevLearn",
  publisher: "DevLearn Media",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://devlearn.in",
    siteName: "DevLearn",
    title: "DevLearn – Learn. Build. Grow. | Modern Tech Tutorials",
    description:
      "Practical guides, tutorials and real-world examples for Web Development, QA Testing, DevOps and more.",
    images: [
      {
        url: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&w=1200&q=80",
        width: 1200,
        height: 630,
        alt: "DevLearn Modern Tech Blog",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "DevLearn – Learn. Build. Grow. | Modern Tech Tutorials",
    description:
      "Practical guides, tutorials and real-world examples for Web Development, QA Testing, DevOps and more.",
    creator: "@devlearn",
    images: [
      "https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&w=1200&q=80",
    ],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body className="min-h-screen flex flex-col bg-slate-50 text-slate-800 antialiased selection:bg-brand-primary selection:text-white">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
