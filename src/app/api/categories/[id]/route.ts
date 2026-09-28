/**
 * =====================================================================
 * /api/categories/[id] Route Handler
 * ---------------------------------------------------------------------
 * PURPOSE:
 * DELETE category by ID.
 * =====================================================================
 */

import { NextResponse } from "next/server";
import { deleteCategory } from "@/lib/db";

interface Params {
  params: { id: string };
}

export async function DELETE(request: Request, { params }: Params) {
  const success = deleteCategory(params.id);
  if (!success) {
    return NextResponse.json({ error: "Category not found" }, { status: 404 });
  }
  return NextResponse.json({ message: "Category deleted successfully" });
}
