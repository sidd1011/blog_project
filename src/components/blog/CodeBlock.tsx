"use client";

/**
 * =====================================================================
 * CodeBlock Component
 * ---------------------------------------------------------------------
 * PURPOSE:
 * Displays code blocks with syntax styling and a 1-click Copy button.
 * Used for technical command execution and code guides.
 * =====================================================================
 */

import React, { useState } from "react";
import { Check, Copy, Terminal } from "lucide-react";

interface CodeBlockProps {
  code: string;
  language?: string;
}

export default function CodeBlock({ code, language = "bash" }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative my-6 rounded-2xl bg-slate-950 text-slate-200 border border-slate-800 shadow-xl overflow-hidden font-mono text-xs sm:text-sm">
      {/* Code Header Bar */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-slate-900/90 border-b border-slate-800 text-xs text-slate-400">
        <div className="flex items-center gap-2">
          <Terminal className="w-3.5 h-3.5 text-brand-primary" />
          <span className="uppercase tracking-wider font-semibold text-[11px]">
            {language}
          </span>
        </div>

        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-all text-xs"
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5 text-emerald-400" />
              <span className="text-emerald-400 font-semibold">Copied!</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5" />
              <span>Copy</span>
            </>
          )}
        </button>
      </div>

      {/* Code Content */}
      <pre className="p-4 sm:p-5 overflow-x-auto leading-relaxed text-slate-200">
        <code>{code}</code>
      </pre>
    </div>
  );
}
