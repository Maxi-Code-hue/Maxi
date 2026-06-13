import Link from "next/link";
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { listBrews } from "@/lib/db";
import AddBrewForm from "./AddBrewForm";

export const dynamic = "force-dynamic";

function stars(n: number): string {
  return "★★★★★".slice(0, n) + "☆☆☆☆☆".slice(0, 5 - n);
}

export default async function DashboardPage() {
  const user = await getCurrentUser();
  if (!user) redirect("/login");

  const brews = listBrews(user.id);

  return (
    <div className="dash">
      <header className="dash-head">
        <div className="container">
          <nav className="nav">
            <Link href="/" className="brand">
              <span className="mark">☕</span> Maxi Coffee
            </Link>
            <form action="/api/auth/logout" method="post">
              <button type="submit" className="btn btn-ghost" style={{ color: "#fff", borderColor: "rgba(255,255,255,0.3)" }}>
                Sign out
              </button>
            </form>
          </nav>
        </div>
      </header>

      <main className="dash-main">
        <div className="container">
          <div className="welcome">
            <div>
              <h1>Your brew journal</h1>
              <p>Signed in as {user.email}</p>
            </div>
            <div className="tag">{brews.length} brew{brews.length === 1 ? "" : "s"} logged</div>
          </div>

          <div className="dash-grid">
            <section className="panel">
              <h2>Log a brew</h2>
              <AddBrewForm />
            </section>

            <section className="panel">
              <h2>Recent brews</h2>
              {brews.length === 0 ? (
                <div className="empty">
                  No brews yet ☕<br />
                  Log your first cup to start your journal.
                </div>
              ) : (
                <ul className="brew-list">
                  {brews.map((b) => (
                    <li className="brew-item" key={b.id}>
                      <div className="top">
                        <strong>{b.bean}</strong>
                        <span className="stars">{stars(b.rating)}</span>
                      </div>
                      <div className="sub">
                        {[b.origin, b.method].filter(Boolean).join(" · ")}
                        {" — "}
                        {new Date(b.createdAt).toLocaleDateString()}
                      </div>
                      {b.notes && <p style={{ margin: "8px 0 0", fontSize: 14 }}>{b.notes}</p>}
                    </li>
                  ))}
                </ul>
              )}
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}
