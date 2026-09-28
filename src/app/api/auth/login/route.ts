/**
 * =====================================================================
 * Admin Login API Route (src/app/api/auth/login/route.ts)
 * ---------------------------------------------------------------------
 * PURPOSE:
 * Authenticates admin credentials (Sidd@gmail.com / Sidd@123).
 * Issues a secure HTTP-only cookie with a signed session token.
 * =====================================================================
 */

import { NextRequest, NextResponse } from "next/server";
import { ADMIN_CREDENTIALS, ADMIN_AUTH_COOKIE, createSessionToken } from "@/lib/auth";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json(
        { success: false, error: "Email and password are required." },
        { status: 400 }
      );
    }

    const trimmedEmail = String(email).trim().toLowerCase();
    const trimmedPass = String(password).trim();

    // Verify against configured credentials
    if (
      trimmedEmail !== ADMIN_CREDENTIALS.email.toLowerCase() ||
      trimmedPass !== ADMIN_CREDENTIALS.password
    ) {
      return NextResponse.json(
        { success: false, error: "Invalid email or password." },
        { status: 401 }
      );
    }

    // Generate signed session token
    const token = createSessionToken(ADMIN_CREDENTIALS.email);

    // Create successful response and attach secure HTTP-only cookie
    const response = NextResponse.json({
      success: true,
      message: "Admin authentication successful.",
      user: ADMIN_CREDENTIALS.user,
    });

    response.cookies.set({
      name: ADMIN_AUTH_COOKIE,
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 7 * 24 * 60 * 60, // 7 days in seconds
    });

    return response;
  } catch (error) {
    console.error("Login route error:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error during authentication." },
      { status: 500 }
    );
  }
}
