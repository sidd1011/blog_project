/**
 * =====================================================================
 * Admin Me API Route (src/app/api/auth/me/route.ts)
 * ---------------------------------------------------------------------
 * PURPOSE:
 * Checks if the current client holds a valid admin session.
 * Returns the current authenticated admin user object.
 * =====================================================================
 */

import { NextRequest, NextResponse } from "next/server";
import { ADMIN_AUTH_COOKIE, ADMIN_CREDENTIALS, verifySessionToken } from "@/lib/auth";

export async function GET(req: NextRequest) {
  const token = req.cookies.get(ADMIN_AUTH_COOKIE)?.value;

  if (!token || !verifySessionToken(token)) {
    return NextResponse.json(
      { authenticated: false, user: null },
      { status: 401 }
    );
  }

  return NextResponse.json({
    authenticated: true,
    user: ADMIN_CREDENTIALS.user,
  });
}
