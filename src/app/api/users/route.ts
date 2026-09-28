/**
 * =====================================================================
 * /api/users Route Handler
 * ---------------------------------------------------------------------
 * PURPOSE:
 * API for managing authors and dashboard users.
 * Supports GET (list all) and POST (create author).
 * =====================================================================
 */

import { NextResponse } from "next/server";
import { getUsers, saveUser } from "@/lib/db";
import { DashboardUser } from "@/types";

export async function GET() {
  const users = getUsers();
  return NextResponse.json(users);
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    if (!data.name || !data.email) {
      return NextResponse.json(
        { error: "Name and Email are required." },
        { status: 400 }
      );
    }

    const newUser: DashboardUser = {
      id: `usr-${Date.now()}`,
      name: data.name,
      email: data.email,
      role: data.role || "author",
      avatar:
        data.avatar ||
        `https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80`,
      bio: data.bio || "Technical Contributor at DevLearn",
      articlesCount: 0,
      status: data.status || "active",
      joinedDate: new Date().toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      }),
    };

    saveUser(newUser);
    return NextResponse.json(newUser, { status: 201 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
