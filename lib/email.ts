/**
 * Magic-link delivery.
 *
 * If RESEND_API_KEY is set, sends a real email via the Resend HTTP API.
 * Otherwise (dev/demo), logs the link to the server console. The caller may
 * also surface the link in the UI when not in production.
 */
const FROM = process.env.EMAIL_FROM || "Maxi Coffee <login@example.com>";

export async function sendMagicLink(email: string, link: string): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY;

  if (!apiKey) {
    // Dev fallback: no provider configured.
    console.log("\n☕  Magic link for %s:\n   %s\n", email, link);
    return;
  }

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: FROM,
      to: email,
      subject: "Your Maxi Coffee sign-in link",
      html: `
        <div style="font-family:system-ui,sans-serif;max-width:480px;margin:auto">
          <h2 style="color:#6f4e37">☕ Sign in to Maxi Coffee</h2>
          <p>Click the button below to sign in. This link expires shortly and can be used once.</p>
          <p style="margin:28px 0">
            <a href="${link}" style="background:#6f4e37;color:#fff;padding:12px 22px;border-radius:8px;text-decoration:none">
              Sign in
            </a>
          </p>
          <p style="color:#888;font-size:13px">If you didn't request this, you can ignore this email.</p>
        </div>`,
    }),
  });

  if (!res.ok) {
    const detail = await res.text();
    throw new Error(`Failed to send email: ${res.status} ${detail}`);
  }
}
