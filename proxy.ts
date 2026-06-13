import { NextRequest, NextResponse } from "next/server";
import { SESSION_COOKIE } from "@/lib/constants";

/**
 * Cheap edge-level gate: redirect to /login if the session cookie is absent.
 * Authoritative validation (session exists & not expired) happens in the
 * /dashboard server component via getCurrentUser().
 */
export function proxy(req: NextRequest) {
  const hasCookie = Boolean(req.cookies.get(SESSION_COOKIE)?.value);
  if (!hasCookie) {
    const url = new URL("/login", req.url);
    return NextResponse.redirect(url);
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*"],
};
