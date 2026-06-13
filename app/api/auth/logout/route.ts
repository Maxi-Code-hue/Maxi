import { NextRequest, NextResponse } from "next/server";
import { logout } from "@/lib/auth";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  await logout();
  const base = process.env.APP_URL || req.nextUrl.origin;
  return NextResponse.redirect(new URL("/login", base), { status: 303 });
}
