/**
 * =====================================================================
 * Admin Logout API Route (src/app/api/auth/logout/route.ts)
 * ---------------------------------------------------------------------
 * PURPOSE:
 * Clears the admin session cookie and logs out the user.
 * =====================================================================
 */

import { NextResponse } from "next/server";
import { ADMIN_AUTH_COOKIE } from "@/lib/auth";

export async function POST() {
  const response = NextResponse.json({
    success: true,
    message: "Admin logged out successfully.",
  });

  response.cookies.set({
    name: ADMIN_AUTH_COOKIE,
    value: "",
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 0, // Immediately expire
  });

  return response;
}

export async function GET() {
  return POST();
}
