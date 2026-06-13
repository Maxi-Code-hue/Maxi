# ☕ Maxi Coffee

A specialty-coffee web app with **passwordless magic-link authentication** and a
per-user **brew journal**. Built with Next.js (App Router) + TypeScript.

## Features

- Landing page showcasing single-origin roasts
- Passwordless login: enter your email → receive a one-time magic link
- Protected `/dashboard` with a personal brew journal (log bean, origin, method,
  rating, tasting notes)
- Secure session handling (HTTP-only, SameSite cookies; single-use, hashed,
  short-lived tokens; rate limiting; no account enumeration)

## Quick start

```bash
npm install
cp .env.example .env.local   # optional — sensible defaults work out of the box
npm run dev
```

Open http://localhost:3000.

### Signing in (dev mode)

No email provider is required for local development. When you request a magic
link, it is:

1. printed to the **server console**, and
2. shown directly in the UI (a "click here to sign in" link) so you can sign in
   without leaving the browser.

### Real email delivery

Set these in `.env.local` to send real emails via [Resend](https://resend.com):

```
RESEND_API_KEY=...
EMAIL_FROM=Maxi Coffee <login@yourdomain.com>
```

## How auth works

1. `POST /api/auth/request` — validates the email, rate-limits, generates a
   random token, stores only its SHA-256 hash, and emails a one-hop link.
2. `GET /auth/verify?token=…` — verifies the token (unexpired, unused, hash
   matches), marks it consumed, finds/creates the user, creates a session, sets
   the cookie, and redirects to `/dashboard`.
3. `middleware.ts` gates `/dashboard`; the page itself does authoritative
   session validation.
4. `POST /api/auth/logout` — destroys the session and clears the cookie.

## Data storage

For zero-setup running, data lives in a JSON file at `.data/db.json`
(git-ignored). For production, replace `lib/db.ts` with a real database
(e.g. Postgres + Prisma).

## Project structure

```
app/
  page.tsx                 Landing page
  login/page.tsx           Email / magic-link request form
  dashboard/               Protected dashboard + brew form
  auth/verify/route.ts     Magic-link verification
  api/auth/                request + logout endpoints
  api/brews/route.ts       Add brew entries
lib/
  auth.ts                  Tokens, sessions, cookies
  db.ts                    JSON-file data store
  email.ts                 Magic-link delivery (Resend or console)
middleware.ts              Route protection
```
