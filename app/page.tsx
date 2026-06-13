import Link from "next/link";

const beans = [
  {
    emoji: "🇪🇹",
    name: "Yirgacheffe",
    origin: "Ethiopia · Washed",
    notes: "Jasmine, bergamot, and bright lemon acidity. A delicate, floral filter coffee.",
    price: "€16",
    tag: "Filter",
  },
  {
    emoji: "🇨🇴",
    name: "Huila Reserve",
    origin: "Colombia · Honey",
    notes: "Red apple, caramel, and milk chocolate. Balanced and sweet — a crowd pleaser.",
    price: "€15",
    tag: "Omni",
  },
  {
    emoji: "🇬🇹",
    name: "Antigua Volcán",
    origin: "Guatemala · Natural",
    notes: "Dark cherry, cocoa nib, and brown sugar. Bold and syrupy for espresso.",
    price: "€17",
    tag: "Espresso",
  },
];

const features = [
  {
    ico: "🔥",
    title: "Roasted to order",
    text: "Every bag is roasted the day it ships — never sitting on a shelf for weeks.",
  },
  {
    ico: "🌍",
    title: "Single origin & traceable",
    text: "Direct-trade lots with farm, altitude, and process on every label.",
  },
  {
    ico: "📓",
    title: "Your brew journal",
    text: "Log every cup, rate your dial-in, and remember what actually tasted great.",
  },
];

export default function HomePage() {
  return (
    <>
      <header className="hero">
        <div className="container">
          <nav className="nav">
            <Link href="/" className="brand">
              <span className="mark">☕</span> Maxi Coffee
            </Link>
            <div className="nav-links">
              <a href="#beans">Beans</a>
              <a href="#why">Why us</a>
              <Link href="/login">Sign in</Link>
              <Link href="/login" className="btn btn-primary">
                Get started
              </Link>
            </div>
          </nav>

          <div className="hero-grid">
            <div>
              <span className="eyebrow">Freshly roasted · Specialty grade</span>
              <h1>
                Specialty coffee,
                <br />
                <span className="accent">brewed your way.</span>
              </h1>
              <p className="lead">
                Hand-picked single-origin beans, roasted to order and shipped within 24
                hours. Sign in to track your brews and build your tasting journal.
              </p>
              <div className="cta-row">
                <Link href="/login" className="btn btn-primary">
                  Start your journal →
                </Link>
                <a href="#beans" className="btn btn-ghost">
                  Explore beans
                </a>
              </div>
            </div>

            <aside className="hero-card" aria-hidden="true">
              <div className="cup">☕</div>
              <div className="row">
                <span>Today&apos;s pour</span>
                <span>Yirgacheffe</span>
              </div>
              <div className="row">
                <span>Method</span>
                <span>V60 · 1:16</span>
              </div>
              <div className="row">
                <span>Grind</span>
                <span>Medium-fine</span>
              </div>
              <div className="row">
                <span>Rating</span>
                <span>★★★★★</span>
              </div>
            </aside>
          </div>
        </div>
      </header>

      <section className="block" id="why">
        <div className="container">
          <div className="section-head">
            <h2>Built for people who care about the cup</h2>
            <p>From the farm to your final pour-over, every detail is dialed in.</p>
          </div>
          <div className="features">
            {features.map((f) => (
              <div className="feature" key={f.title}>
                <div className="ico">{f.ico}</div>
                <h3>{f.title}</h3>
                <p>{f.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="block beans" id="beans">
        <div className="container">
          <div className="section-head">
            <h2>This month&apos;s roasts</h2>
            <p>A rotating selection of our favourite micro-lots.</p>
          </div>
          <div className="bean-grid">
            {beans.map((b) => (
              <article className="bean" key={b.name}>
                <div className="top">
                  <div className="emoji">{b.emoji}</div>
                  <h3>{b.name}</h3>
                  <div className="origin">{b.origin}</div>
                </div>
                <div className="body">
                  <p className="notes">{b.notes}</p>
                  <div className="meta">
                    <span className="tag">{b.tag}</span>
                    <span className="price">{b.price}</span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="block">
        <div className="container">
          <div className="cta-strip">
            <h2>Ready to taste the difference?</h2>
            <p>Create your free account with just an email — no password required.</p>
            <Link href="/login" className="btn btn-primary">
              Sign in with email
            </Link>
          </div>
        </div>
      </section>

      <footer>
        <div className="container footer">
          <span>☕ Maxi Coffee — roasted with care.</span>
          <span>© {new Date().getFullYear()} Maxi Coffee</span>
        </div>
      </footer>
    </>
  );
}
