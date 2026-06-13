/**
 * Auth helpers: magic-link token generation/verification, session cookies.
 */
import crypto from "crypto";
import { cookies } from "next/headers";
import {
  createSession,
  createToken,
  consumeToken,
  deleteSession,
  findOrCreateUser,
  getSession,
  getUser,
  type User,
} from "@/lib/db";
import { SESSION_COOKIE } from "@/lib/constants";

export { SESSION_COOKIE };

const TOKEN_TTL_MS =
  (Number(process.env.AUTH_TOKEN_TTL_MINUTES) || 15) * 60 * 1000;
const SESSION_TTL_MS =
  (Number(process.env.SESSION_TTL_DAYS) || 30) * 24 * 60 * 60 * 1000;

function hashToken(raw: string): string {
  return crypto.createHash("sha256").update(raw).digest("hex");
}

/**
 * Create a single-use magic-link token for an email and return the RAW token.
 * Only the SHA-256 hash is stored, so a leaked DB never exposes usable links.
 */
export function issueMagicToken(email: string): string {
  const raw = crypto.randomBytes(32).toString("base64url");
  createToken({
    id: crypto.randomUUID(),
    tokenHash: hashToken(raw),
    email: email.trim().toLowerCase(),
    expiresAt: Date.now() + TOKEN_TTL_MS,
    consumedAt: null,
  });
  return raw;
}

/**
 * Validate a raw magic token. On success: marks it consumed, finds/creates the
 * user, creates a session, and sets the session cookie. Returns the user or null.
 */
export async function redeemMagicToken(raw: string): Promise<User | null> {
  const token = consumeToken(hashToken(raw));
  if (!token) return null;

  const user = findOrCreateUser(token.email);
  const session = createSession(user.id, SESSION_TTL_MS);

  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE, session.id, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: Math.floor(SESSION_TTL_MS / 1000),
  });

  return user;
}

/** Return the currently authenticated user, or null. */
export async function getCurrentUser(): Promise<User | null> {
  const cookieStore = await cookies();
  const sessionId = cookieStore.get(SESSION_COOKIE)?.value;
  if (!sessionId) return null;
  const session = getSession(sessionId);
  if (!session) return null;
  return getUser(session.userId) ?? null;
}

/** Destroy the current session and clear the cookie. */
export async function logout(): Promise<void> {
  const cookieStore = await cookies();
  const sessionId = cookieStore.get(SESSION_COOKIE)?.value;
  if (sessionId) deleteSession(sessionId);
  cookieStore.delete(SESSION_COOKIE);
}
