import { NextRequest, NextResponse } from "next/server";
import { redeemMagicToken } from "@/lib/auth";

export const runtime = "nodejs";

export async function GET(req: NextRequest) {
  const token = req.nextUrl.searchParams.get("token");
  const base = process.env.APP_URL || req.nextUrl.origin;

  if (!token) {
    return NextResponse.redirect(new URL("/login?error=missing", base));
  }

  const user = await redeemMagicToken(token);
  if (!user) {
    return NextResponse.redirect(new URL("/login?error=invalid", base));
  }

  return NextResponse.redirect(new URL("/dashboard", base));
}
