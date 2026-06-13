import { NextRequest, NextResponse } from "next/server";
import { issueMagicToken } from "@/lib/auth";
import { sendMagicLink } from "@/lib/email";

export const runtime = "nodejs";

// Very small in-memory rate limiter (per email + IP). Resets on restart.
const hits = new Map<string, number[]>();
const WINDOW_MS = 15 * 60 * 1000;
const MAX_PER_WINDOW = 5;

function rateLimited(key: string): boolean {
  const now = Date.now();
  const recent = (hits.get(key) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(key, recent);
  return recent.length > MAX_PER_WINDOW;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: NextRequest) {
  let email = "";
  try {
    const body = await req.json();
    email = String(body?.email ?? "").trim().toLowerCase();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  if (!EMAIL_RE.test(email)) {
    return NextResponse.json({ error: "Please enter a valid email." }, { status: 400 });
  }

  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "local";
  if (rateLimited(`${email}|${ip}`)) {
    return NextResponse.json(
      { error: "Too many requests. Please wait a few minutes." },
      { status: 429 },
    );
  }

  const appUrl = process.env.APP_URL || req.nextUrl.origin;
  const rawToken = issueMagicToken(email);
  const link = `${appUrl}/auth/verify?token=${encodeURIComponent(rawToken)}`;

  try {
    await sendMagicLink(email, link);
  } catch (err) {
    console.error("sendMagicLink failed:", err);
    // Do not leak details; respond generically below.
  }

  // Always generic to avoid account enumeration.
  const payload: { ok: true; devLink?: string } = { ok: true };
  // Convenience for local dev only: surface the link so you can click it
  // without checking the server console. Never enabled in production.
  if (process.env.NODE_ENV !== "production" && !process.env.RESEND_API_KEY) {
    payload.devLink = link;
  }
  return NextResponse.json(payload);
}
