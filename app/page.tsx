import Link from "next/link";
import Reveal from "./components/Reveal";
import TiltCard from "./components/TiltCard";
import Parallax from "./components/Parallax";
import ScrollProgress from "./components/ScrollProgress";

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

// The "from cherry to cup" story — the journey behind every bag.
const journey = [
  {
    art: "🌱",
    num: "01 · Cultivation",
    title: "Grown high, ripened slow",
    text: "Our lots sit between 1,600 and 2,200 metres. Thin mountain air slows the cherries down, letting sugars and acids build the complexity you taste in the cup.",
  },
  {
    art: "🍒",
    num: "02 · Harvest",
    title: "Picked red, by hand",
    text: "Selective hand-picking means only the ripest cherries make the lot. One tree is walked many times across a season — patience you can taste.",
  },
  {
    art: "💧",
    num: "03 · Processing",
    title: "Washed, honey or natural",
    text: "How the fruit is removed shapes the flavour: washed for clarity, natural for fruit-forward intensity, honey for syrupy sweetness in between.",
  },
  {
    art: "🔥",
    num: "04 · Roasting",
    title: "Small batches, to order",
    text: "We roast the day we ship, chasing clarity and sweetness over char. Each origin gets its own profile, dialled in batch after batch.",
  },
  {
    art: "☕",
    num: "05 · Brewing",
    title: "The final four minutes",
    text: "Fresh grind, clean water near 94°C, a precise ratio. The last step is yours — and your journal remembers every great cup.",
  },
];

// "Kaffee wissen" — practical specialty-coffee knowledge.
const knowledge = [
  {
    k: "📐",
    ratio: "1:16",
    title: "Pour-over (V60)",
    text: "60 g of coffee per litre of water. Medium-fine grind, a 30-second bloom, total brew time around 2:30–3:00.",
  },
  {
    k: "⚡",
    ratio: "1:2",
    title: "Espresso",
    text: "Roughly 18 g in, 36 g out in 25–30 seconds at ~9 bar. The dense base for every milk drink.",
  },
  {
    k: "🫖",
    ratio: "1:15",
    title: "French press",
    text: "Coarse grind, four-minute steep, break the crust and press slow. Full-bodied with all the oils intact.",
  },
  {
    k: "🌡️",
    ratio: "92–96°C",
    title: "Water matters",
    text: "Filtered water just off the boil. Too hot scorches and adds bitterness; too cool brews flat and sour.",
  },
];

const origins = [
  "🇪🇹 Ethiopia",
  "🇨🇴 Colombia",
  "🇬🇹 Guatemala",
  "🇰🇪 Kenya",
  "🇧🇷 Brazil",
  "🇷🇼 Rwanda",
  "🇵🇪 Peru",
  "🇮🇩 Indonesia",
];

export default function HomePage() {
  return (
    <>
      <ScrollProgress />

      <header className="hero">
        {/* Parallax floating beans behind the hero */}
        <Parallax speed={0.25} className="beans-bg">
          <span className="bean-float" style={{ top: "18%", left: "8%" }}>☕</span>
          <span className="bean-float" style={{ top: "62%", left: "16%", animationDelay: "1.5s" }}>🫘</span>
          <span className="bean-float" style={{ top: "30%", right: "12%", animationDelay: "0.8s" }}>🫘</span>
          <span className="bean-float" style={{ top: "72%", right: "8%", animationDelay: "2.2s" }}>☕</span>
          <span className="bean-float" style={{ top: "10%", left: "48%", animationDelay: "1.1s" }}>🌱</span>
        </Parallax>

        <div className="container">
          <nav className="nav">
            <Link href="/" className="brand">
              <span className="mark">☕</span> Maxi Coffee
            </Link>
            <div className="nav-links">
              <a href="#story">Story</a>
              <a href="#beans">Beans</a>
              <a href="#know">Brew guide</a>
              <Link href="/login">Sign in</Link>
              <Link href="/login" className="btn btn-primary">
                Get started
              </Link>
            </div>
          </nav>

          <div className="hero-grid">
            <Reveal variant="left">
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
                <a href="#story" className="btn btn-ghost">
                  Discover the story
                </a>
              </div>
            </Reveal>

            <Reveal variant="right" delay={120}>
              <TiltCard>
                <aside className="hero-card" aria-hidden="true">
                  <div className="cup-wrap">
                    <span className="steam" />
                    <span className="steam s2" />
                    <span className="steam s3" />
                    <div className="cup">☕</div>
                  </div>
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
              </TiltCard>
            </Reveal>
          </div>
        </div>
      </header>

      {/* Sliding marquee of origins */}
      <div className="marquee" aria-hidden="true">
        <div className="marquee-track">
          {[...origins, ...origins].map((o, i) => (
            <span key={i}>
              {o} <span style={{ opacity: 0.4 }}>•</span>
            </span>
          ))}
        </div>
      </div>

      <section className="block" id="why">
        <div className="container">
          <Reveal variant="up">
            <div className="section-head">
              <h2>Built for people who care about the cup</h2>
              <p>From the farm to your final pour-over, every detail is dialed in.</p>
            </div>
          </Reveal>
          <div className="features">
            {features.map((f, i) => (
              <Reveal variant="up" delay={i * 120} key={f.title}>
                <div className="feature">
                  <div className="ico">{f.ico}</div>
                  <h3>{f.title}</h3>
                  <p>{f.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Storytelling: from cherry to cup */}
      <section className="block story" id="story">
        <div className="container">
          <Reveal variant="up">
            <div className="section-head">
              <h2>From cherry to cup</h2>
              <p>Great coffee is a relay race across the world. Here&apos;s the journey behind every bag.</p>
            </div>
          </Reveal>
          <div className="journey">
            {journey.map((s, i) => (
              <div className="step" key={s.num}>
                <Reveal variant="zoom" className="art" delay={80}>
                  <div className="art-inner">{s.art}</div>
                </Reveal>
                <Reveal variant={i % 2 === 0 ? "right" : "left"} className="txt">
                  <div>
                    <span className="num">{s.num}</span>
                    <h3>{s.title}</h3>
                    <p>{s.text}</p>
                  </div>
                </Reveal>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Parallax quote */}
      <section className="quote">
        <Parallax speed={0.18}>
          <div className="ghost" aria-hidden="true">☕</div>
        </Parallax>
        <div className="container">
          <Reveal variant="zoom">
            <p className="big">
              &ldquo;Coffee is proof that the smallest details — altitude, ripeness,
              a few degrees of heat — add up to something worth slowing down for.&rdquo;
            </p>
            <p className="who">— The Maxi roasting team</p>
          </Reveal>
        </div>
      </section>

      <section className="block beans" id="beans">
        <div className="container">
          <Reveal variant="up">
            <div className="section-head">
              <h2>This month&apos;s roasts</h2>
              <p>A rotating selection of our favourite micro-lots.</p>
            </div>
          </Reveal>
          <div className="bean-grid">
            {beans.map((b, i) => (
              <Reveal variant="up" delay={i * 120} key={b.name}>
                <TiltCard max={10}>
                  <article className="bean">
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
                </TiltCard>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Kaffee wissen / brew guide */}
      <section className="block" id="know">
        <div className="container">
          <Reveal variant="up">
            <div className="section-head">
              <h2>Coffee, made simple</h2>
              <p>The handful of numbers that turn good beans into a great cup.</p>
            </div>
          </Reveal>
          <div className="know-grid">
            {knowledge.map((c, i) => (
              <Reveal variant={i % 2 === 0 ? "left" : "right"} delay={(i % 2) * 80} key={c.title}>
                <TiltCard max={8}>
                  <div className="know">
                    <div className="k">{c.k}</div>
                    <span className="ratio">{c.ratio}</span>
                    <h3>{c.title}</h3>
                    <p>{c.text}</p>
                  </div>
                </TiltCard>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="block">
        <div className="container">
          <Reveal variant="zoom">
            <div className="cta-strip">
              <h2>Ready to taste the difference?</h2>
              <p>Create your free account with just an email — no password required.</p>
              <Link href="/login" className="btn btn-primary">
                Sign in with email
              </Link>
            </div>
          </Reveal>
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
