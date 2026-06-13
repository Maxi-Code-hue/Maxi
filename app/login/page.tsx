"use client";

import Link from "next/link";
import { useState } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "sent" | "error">("idle");
  const [message, setMessage] = useState("");
  const [devLink, setDevLink] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setMessage("");
    setDevLink(null);

    try {
      const res = await fetch("/api/auth/request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();

      if (!res.ok) {
        setStatus("error");
        setMessage(data?.error ?? "Something went wrong.");
        return;
      }

      setStatus("sent");
      setMessage("Check your inbox — we sent you a sign-in link.");
      if (data?.devLink) setDevLink(data.devLink);
    } catch {
      setStatus("error");
      setMessage("Network error. Please try again.");
    }
  }

  return (
    <main className="auth-wrap">
      <div className="auth-card">
        <div className="mark">☕</div>
        <h1>Sign in to Maxi Coffee</h1>
        <p className="sub">No password needed — we&apos;ll email you a magic link.</p>

        {status === "sent" && (
          <div className="notice ok">
            {message}
            {devLink && (
              <div style={{ marginTop: 10 }}>
                <strong>Dev mode:</strong>{" "}
                <a className="devlink" href={devLink}>
                  click here to sign in
                </a>
              </div>
            )}
          </div>
        )}
        {status === "error" && <div className="notice err">{message}</div>}

        <form onSubmit={onSubmit}>
          <div className="field">
            <label htmlFor="email">Email address</label>
            <input
              id="email"
              className="input"
              type="email"
              required
              autoComplete="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={status === "loading"}
            />
          </div>
          <button
            type="submit"
            className="btn btn-primary full"
            disabled={status === "loading"}
          >
            {status === "loading" ? "Sending…" : "Send magic link"}
          </button>
        </form>

        <p style={{ textAlign: "center", marginTop: 22, fontSize: 14 }}>
          <Link href="/">← Back home</Link>
        </p>
      </div>
    </main>
  );
}
