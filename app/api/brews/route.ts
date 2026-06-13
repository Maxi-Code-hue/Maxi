import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";
import { addBrew } from "@/lib/db";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ error: "Not authenticated." }, { status: 401 });
  }

  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const bean = String(body.bean ?? "").trim();
  const origin = String(body.origin ?? "").trim();
  const method = String(body.method ?? "").trim();
  const notes = String(body.notes ?? "").trim();
  const rating = Math.max(1, Math.min(5, Number(body.rating) || 0));

  if (!bean) {
    return NextResponse.json({ error: "Bean name is required." }, { status: 400 });
  }

  const brew = addBrew({ userId: user.id, bean, origin, method, rating, notes });
  return NextResponse.json({ ok: true, brew }, { status: 201 });
}
