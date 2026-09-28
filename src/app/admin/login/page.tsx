"use client";

/**
 * =====================================================================
 * Admin Login Page (src/app/admin/login/page.tsx)
 * ---------------------------------------------------------------------
 * PURPOSE:
 * Secure authentication portal for DevLearn CMS administrator.
 * Allows login using Sidd@gmail.com / Sidd@123.
 * =====================================================================
 */

import React, { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import {
  Code,
  Lock,
  Mail,
  Eye,
  EyeOff,
  ArrowRight,
  ShieldCheck,
  AlertCircle,
  KeyRound,
  CheckCircle2,
  Sparkles,
} from "lucide-react";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const returnTo = searchParams.get("from") || "/admin";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  // Quick fill helper for the user's convenience
  const handleAutoFill = () => {
    setEmail("Sidd@gmail.com");
    setPassword("Sidd@123");
    setErrorMessage("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");

    if (!email.trim() || !password.trim()) {
      setErrorMessage("Please enter both email and password.");
      return;
    }

    setIsLoading(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim(), password: password.trim() }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        setErrorMessage(data.error || "Authentication failed. Check your credentials.");
        setIsLoading(false);
        return;
      }

      setIsSuccess(true);
      // Brief delay for visual feedback then redirect
      setTimeout(() => {
        router.push(returnTo);
        router.refresh();
      }, 500);
    } catch {
      setErrorMessage("Network error occurred. Please try again.");
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md">
      {/* Brand Header */}
      <div className="text-center mb-8">
        <Link href="/" className="inline-flex items-center gap-3 group mb-4">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-brand-primary to-brand-secondary flex items-center justify-center text-white shadow-lg shadow-brand-primary/30 group-hover:scale-105 transition-transform">
            <Code className="w-7 h-7 stroke-[2.5]" />
          </div>
          <div className="text-left">
            <h1 className="text-2xl font-black text-slate-900 tracking-tight">
              DevLearn
            </h1>
            <span className="text-[11px] font-bold text-brand-primary uppercase tracking-widest block -mt-1">
              CMS Admin Portal
            </span>
          </div>
        </Link>
        <h2 className="text-xl font-bold text-slate-900 mt-2">
          Administrator Sign In
        </h2>
        <p className="text-xs text-slate-500 mt-1">
          Enter your authorized credentials to access the management dashboard.
        </p>
      </div>

      {/* Main Login Card */}
      <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xl shadow-slate-200/50 p-6 sm:p-8">
        
        {/* Quick Credentials Info Box */}
        <div className="mb-6 p-3.5 bg-blue-50/70 border border-blue-200/80 rounded-2xl flex items-start justify-between gap-3 text-xs">
          <div className="space-y-1">
            <div className="flex items-center gap-1.5 font-bold text-brand-primary">
              <KeyRound className="w-3.5 h-3.5" />
              <span>Admin Credentials</span>
            </div>
            <div className="text-slate-600 font-mono text-[11px] space-y-0.5">
              <div>Email: <span className="font-semibold text-slate-900">Sidd@gmail.com</span></div>
              <div>Password: <span className="font-semibold text-slate-900">Sidd@123</span></div>
            </div>
          </div>
          <button
            type="button"
            onClick={handleAutoFill}
            className="shrink-0 inline-flex items-center gap-1 px-2.5 py-1.5 bg-white hover:bg-blue-100/70 text-brand-primary border border-blue-200 rounded-xl font-semibold text-[11px] shadow-xs transition-colors"
            title="Click to populate credentials"
          >
            <Sparkles className="w-3 h-3 text-amber-500" />
            <span>Auto-Fill</span>
          </button>
        </div>

        {/* Error Alert */}
        {errorMessage && (
          <div className="mb-6 p-3.5 bg-rose-50 border border-rose-200 text-rose-700 rounded-2xl flex items-center gap-2.5 text-xs animate-in fade-in slide-in-from-top-1 duration-200">
            <AlertCircle className="w-4 h-4 shrink-0 text-rose-500" />
            <p className="font-medium">{errorMessage}</p>
          </div>
        )}

        {/* Success Alert */}
        {isSuccess && (
          <div className="mb-6 p-3.5 bg-emerald-50 border border-emerald-200 text-emerald-700 rounded-2xl flex items-center gap-2.5 text-xs animate-in fade-in duration-200">
            <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-500" />
            <p className="font-semibold">Authentication approved! Redirecting...</p>
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Email Field */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
              Email Address
            </label>
            <div className="relative">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Sidd@gmail.com"
                className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 focus:border-brand-primary focus:bg-white rounded-xl text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-4 focus:ring-brand-primary/10 transition-all font-medium"
              />
              <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>

          {/* Password Field */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                Password
              </label>
            </div>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-10 pr-11 py-3 bg-slate-50 border border-slate-200 focus:border-brand-primary focus:bg-white rounded-xl text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-4 focus:ring-brand-primary/10 transition-all font-medium"
              />
              <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? (
                  <EyeOff className="w-4 h-4" />
                ) : (
                  <Eye className="w-4 h-4" />
                )}
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading || isSuccess}
            className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-brand-primary to-blue-600 hover:to-blue-700 text-white font-bold text-sm shadow-md shadow-brand-primary/25 hover:shadow-lg hover:shadow-brand-primary/30 flex items-center justify-center gap-2 transition-all disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer"
          >
            {isLoading ? (
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <>
                <span>Sign In to Dashboard</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        {/* Security Badge */}
        <div className="mt-6 pt-5 border-t border-slate-100 flex items-center justify-center gap-2 text-[11px] text-slate-400">
          <ShieldCheck className="w-4 h-4 text-emerald-500" />
          <span>Protected by Next.js Edge Session Authentication</span>
        </div>
      </div>

      {/* Return to Public Site */}
      <div className="text-center mt-6">
        <Link
          href="/"
          className="text-xs font-semibold text-slate-500 hover:text-brand-primary transition-colors"
        >
          ← Return to DevLearn Public Website
        </Link>
      </div>
    </div>
  );
}

export default function AdminLoginPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950 flex items-center justify-center p-4 sm:p-6">
      <Suspense fallback={
        <div className="text-white text-sm">Loading admin portal...</div>
      }>
        <LoginForm />
      </Suspense>
    </div>
  );
}
