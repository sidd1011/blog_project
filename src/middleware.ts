/**
 * =====================================================================
 * Next.js Edge Middleware (src/middleware.ts)
 * ---------------------------------------------------------------------
 * PURPOSE:
 * Guards all /admin routes against unauthorized visitors.
 * Redirects unauthenticated requests to /admin/login.
 * Redirects logged-in admins away from the login page back to /admin.
 * =====================================================================
 */

import { NextRequest, NextResponse } from "next/server";
import { ADMIN_AUTH_COOKIE, verifySessionToken } from "@/lib/auth";

export function middleware(req: NextRequest) {
  const { pathname, search } = req.nextUrl;

  // 1. Convenience redirect: /login -> /admin/login
  if (pathname === "/login") {
    return NextResponse.redirect(new URL("/admin/login", req.url));
  }

  // 2. Check Admin routes
  if (pathname.startsWith("/admin")) {
    const isLoginPage = pathname === "/admin/login";
    const token = req.cookies.get(ADMIN_AUTH_COOKIE)?.value;
    const isAuthenticated = verifySessionToken(token);

    // If user is already authenticated and visits /admin/login, redirect to /admin
    if (isLoginPage && isAuthenticated) {
      return NextResponse.redirect(new URL("/admin", req.url));
    }

    // If user is NOT authenticated and visits any admin page other than /admin/login
    if (!isLoginPage && !isAuthenticated) {
      const returnUrl = encodeURIComponent(`${pathname}${search}`);
      const loginUrl = new URL(`/admin/login?from=${returnUrl}`, req.url);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/admin/:path*",
    "/login",
  ],
};
