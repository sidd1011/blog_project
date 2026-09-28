"use client";

/**
 * =====================================================================
 * ShareButtons Component
 * ---------------------------------------------------------------------
 * PURPOSE:
 * Provides social sharing widgets matching Screen 3.
 * Supports:
 * - X (Twitter)
 * - Facebook
 * - LinkedIn
 * - WhatsApp
 * - 1-Click Copy Link with confirmation toast/tooltip
 * =====================================================================
 */

import React, { useState } from "react";
import { Share2, Link2, Check, Twitter, Facebook, Linkedin } from "lucide-react";

interface ShareButtonsProps {
  title: string;
  url: string;
}

export default function ShareButtons({ title, url }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false);

  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  const handleCopy = () => {
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs space-y-3">
      <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
        <Share2 className="w-4 h-4 text-brand-primary" />
        <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
          Share This Article
        </h4>
      </div>

      <div className="flex items-center gap-2">
        {/* X / Twitter */}
        <a
          href={`https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Share on X"
          className="w-10 h-10 rounded-xl bg-slate-100 hover:bg-slate-900 hover:text-white flex items-center justify-center text-slate-700 transition-colors"
        >
          <Twitter className="w-4 h-4" />
        </a>

        {/* Facebook */}
        <a
          href={`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Share on Facebook"
          className="w-10 h-10 rounded-xl bg-slate-100 hover:bg-blue-600 hover:text-white flex items-center justify-center text-slate-700 transition-colors"
        >
          <Facebook className="w-4 h-4" />
        </a>

        {/* LinkedIn */}
        <a
          href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Share on LinkedIn"
          className="w-10 h-10 rounded-xl bg-slate-100 hover:bg-blue-700 hover:text-white flex items-center justify-center text-slate-700 transition-colors"
        >
          <Linkedin className="w-4 h-4" />
        </a>

        {/* WhatsApp */}
        <a
          href={`https://api.whatsapp.com/send?text=${encodedTitle}%20${encodedUrl}`}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Share on WhatsApp"
          className="w-10 h-10 rounded-xl bg-slate-100 hover:bg-emerald-600 hover:text-white flex items-center justify-center text-slate-700 transition-colors"
        >
          <span className="text-base font-bold">W</span>
        </a>

        {/* Copy Link Button */}
        <button
          onClick={handleCopy}
          aria-label="Copy Link"
          className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors ${
            copied
              ? "bg-emerald-500 text-white"
              : "bg-slate-100 hover:bg-slate-200 text-slate-700"
          }`}
          title={copied ? "Link Copied!" : "Copy Link"}
        >
          {copied ? <Check className="w-4 h-4" /> : <Link2 className="w-4 h-4" />}
        </button>
      </div>
      {copied && (
        <p className="text-[11px] font-semibold text-emerald-600 animate-in fade-in duration-200">
          ✓ Link copied to clipboard!
        </p>
      )}
    </div>
  );
}
