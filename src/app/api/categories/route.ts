/**
 * =====================================================================
 * /api/categories Route Handler
 * ---------------------------------------------------------------------
 * PURPOSE:
 * API for retrieving and adding categories.
 * =====================================================================
 */

import { NextResponse } from "next/server";
import { getCategories, saveCategory } from "@/lib/db";
import { slugify } from "@/lib/utils";

export async function GET() {
  const categories = getCategories();
  return NextResponse.json(categories);
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    if (!data.name) {
      return NextResponse.json({ error: "Name is required." }, { status: 400 });
    }

    const newCategory = {
      id: `cat-${Date.now()}`,
      name: data.name,
      slug: slugify(data.slug || data.name),
      description: data.description || "",
      icon: data.icon || "Layers",
      color: data.color || "#3062F6",
      count: 0,
    };

    saveCategory(newCategory);
    return NextResponse.json(newCategory, { status: 201 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
