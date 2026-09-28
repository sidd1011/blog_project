/**
 * =====================================================================
 * /api/contact Route Handler
 * ---------------------------------------------------------------------
 * PURPOSE:
 * Receives submissions from the Contact form and persists them.
 * =====================================================================
 */

import { NextResponse } from "next/server";
import { saveContactMessage } from "@/lib/db";
import { ContactMessage } from "@/types";

export async function POST(request: Request) {
  try {
    const data = await request.json();

    if (!data.name || !data.email || !data.message) {
      return NextResponse.json(
        { error: "Name, Email and Message are all required." },
        { status: 400 }
      );
    }

    const newMessage: ContactMessage = {
      id: `msg-${Date.now()}`,
      name: data.name,
      email: data.email,
      message: data.message,
      createdAt: new Date().toISOString(),
      isRead: false,
    };

    saveContactMessage(newMessage);
    return NextResponse.json({ success: true, message: newMessage }, { status: 201 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
