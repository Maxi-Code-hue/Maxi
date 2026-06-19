# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

Maxi Coffee — a specialty-coffee web app with passwordless magic-link
authentication and a per-user brew journal. Next.js 16 (App Router) + React 19 +
TypeScript (strict), zero runtime dependencies beyond Next/React.

## Commands

```bash
npm install
npm run dev      # next dev — http://localhost:3000 (alias: npm run dashboard)
npm run build    # next build (production)
npm run start    # next start (serve the build)
npm run lint     # next lint
```

There is **no test framework** configured — do not assume `npm test` exists.
Verify changes via `npm run build` (catches type/compile errors) and manual
testing in `npm run dev`. No `.env` is needed for local dev; sensible defaults
apply. To sign in locally, request a magic link on `/login` — the link is
printed to the server console *and* surfaced directly in the UI as a "click
here to sign in" link (dev convenience, gated to non-production).

## Architecture

Three layers, deliberately dependency-free so the app runs with no external
services:

- **`lib/db.ts`** — the entire data store is a single JSON file at
  `.data/db.json` (git-ignored, created on first write). Every read/write
  re-reads and rewrites the whole file synchronously via `fs`. It holds four
  collections: `users`, `tokens`, `sessions`, `brews`. This is the seam meant
  for production replacement (Postgres/Prisma); all persistence goes through
  this module's exported functions — nothing else touches the filesystem.
- **`lib/auth.ts`** — magic-link tokens and session cookies, built on `db.ts`.
  Tokens are random 32-byte values; only their **SHA-256 hash** is stored
  (`hashToken`), so a leaked DB never exposes usable links. Sessions are opaque
  UUIDs stored in the `maxi_session` HTTP-only cookie. Key functions:
  `issueMagicToken`, `redeemMagicToken`, `getCurrentUser`, `logout`.
- **`lib/email.ts`** — `sendMagicLink`. If `RESEND_API_KEY` is set it POSTs to
  the Resend HTTP API; otherwise it logs the link to the console.

### Auth flow

1. `POST /api/auth/request` — validates email, rate-limits (5 / 15 min per
   email+IP, in-memory so it resets on restart), issues a token, sends the link.
   Always returns a generic `{ ok: true }` to avoid account enumeration; only in
   dev (non-prod, no Resend key) does it also return `devLink`.
2. `GET /auth/verify?token=…` (`app/auth/verify/route.ts`) — redeems the token
   (single-use, unexpired, hash-matched), creates the session + cookie, redirects
   to `/dashboard`.
3. `app/dashboard/page.tsx` — a server component that calls `getCurrentUser()`
   and `redirect("/login")` if absent. **This is the authoritative auth gate.**
4. `POST /api/auth/logout` — destroys the session, clears the cookie.

### Conventions / gotchas

- **Route handlers that touch `lib/db.ts` must export `runtime = "nodejs"`**
  (db uses Node `fs`, unavailable on the Edge runtime). Existing handlers all do
  this — preserve it when adding new ones.
- **`lib/constants.ts`** exists solely to hold Edge-safe values (e.g.
  `SESSION_COOKIE`) that can be imported from any runtime without pulling in
  Node-only code. Put shared constants here, not in `lib/auth.ts`.
- **`@/*` path alias** maps to the project root (see `tsconfig.json`), so imports
  look like `@/lib/auth`, `@/lib/constants`.
- **`proxy.ts` is currently inert.** It exports a `proxy()` function with a
  `/dashboard/:path*` matcher intended as an edge-level cookie check, but Next.js
  only auto-loads middleware from a file named `middleware.ts` exporting
  `middleware`. As-is this file does nothing; the dashboard server component is
  what actually protects the route. The README still describes a `middleware.ts`
  that does not exist — if you wire up edge gating, rename/rework this file
  accordingly. The dashboard remains secure either way because it re-validates.
- **Client vs server components**: pages are server components by default;
  interactive forms (`app/login/page.tsx`, `app/dashboard/AddBrewForm.tsx`) are
  `"use client"` and POST to the API routes, then call `router.refresh()` to pull
  fresh server-rendered data.

### Environment variables

See `.env.example`. `APP_URL` (magic-link base), `AUTH_TOKEN_TTL_MINUTES`
(default 15), `SESSION_TTL_DAYS` (default 30), and optional `RESEND_API_KEY` /
`EMAIL_FROM` for real email delivery.
