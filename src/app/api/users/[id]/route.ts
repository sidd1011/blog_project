/**
 * =====================================================================
 * /api/users/[id] Route Handler
 * ---------------------------------------------------------------------
 * PURPOSE:
 * Update or delete a user/author by ID.
 * =====================================================================
 */

import { NextResponse } from "next/server";
import { getUsers, saveUser, deleteUser } from "@/lib/db";

interface Params {
  params: { id: string };
}

export async function PUT(request: Request, { params }: Params) {
  try {
    const users = getUsers();
    const existing = users.find((u) => u.id === params.id);
    if (!existing) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const data = await request.json();
    const updated = { ...existing, ...data };
    saveUser(updated);

    return NextResponse.json(updated);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: Params) {
  const success = deleteUser(params.id);
  if (!success) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }
  return NextResponse.json({ message: "User deleted successfully" });
}
