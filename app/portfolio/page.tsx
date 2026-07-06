import type { Metadata } from "next";
import Link from "next/link";
import "./portfolio.css";
import PrintButton from "./PrintButton";
import PhotoOrPoster from "./PhotoOrPoster";
import Mindmap from "./Mindmap";

export const metadata: Metadata = {
  title: "Portfolio „Glück” — Maxi",
  description:
    "Portfolio zum Thema Glück: sieben Zitate, sieben Statements und meine Gedanken.",
};

type Quote = {
  id: string;
  n: number;
  short: string;
  title: string;
  source: string;
  image: string | null;
  theme: string;
  alt: string;
  caption: string;
  personal?: boolean;
  statement: string;
};

const quotes: Quote[] = [
  {
    id: "zitat-1",
    n: 1,
    short: "Nicht gleich Glück",
    title: "„Glück ist nicht gleich Glück!”",
    source: "Buch S. 98",
    image: "/portfolio/berge.jpg",
    theme: "path",
    alt: "Schneebedeckte Gipfel unter einem Sternenhimmel",
    caption: "Glück haben – oder glücklich sein?",
    statement:
      "Im Deutschen benutzen wir das Wort „Glück” für zwei komplett verschiedene Dinge: für Zufallsglück und für das Gefühl, glücklich zu sein. Andere Sprachen trennen das viel klarer, zum Beispiel Englisch mit „luck” und „happiness” oder Latein mit „fortuna” und „felicitas”. Ich finde diese Trennung eigentlich logischer, weil die beiden Arten von Glück oft gar nichts miteinander zu tun haben. Zufallsglück kann nämlich niemand beeinflussen – ob am Wandertag die Sonne scheint oder ob man im Los eine Niete zieht, entscheidet allein der Zufall. Ob ich mich glücklich fühle, hängt dagegen viel stärker von mir selbst ab. Eine gute Note nach wochenlangem Lernen ist zum Beispiel kein Zufall, sondern das Ergebnis von Arbeit – und macht trotzdem glücklich. Mir persönlich ist das empfundene Glück deutlich wichtiger als das Zufallsglück, weil es das ist, was man wirklich im Alltag spürt. Vielleicht wäre unsere Sprache also ehrlicher, wenn sie wie andere Sprachen zwei getrennte Wörter dafür hätte.",
  },
  {
    id: "zitat-2",
    n: 2,
    short: "Entscheidung",
    title: "„Glück ist eine Entscheidung!”",
    source: "Buch S. 99",
    image: "/portfolio/decision.jpg",
    theme: "path",
    alt: "Maxi beim Zeitfahren auf der Radrennbahn",
    caption: "Ich beim Zeitfahren – zurück nach der Pause",
    statement:
      "Im Märchen „Hans im Glück” tauscht Hans seinen Goldklumpen Schritt für Schritt gegen immer „wertlosere” Dinge, bis er am Ende gar nichts mehr besitzt. Wirtschaftlich gesehen ist das komplett unvernünftig – aber Hans wird mit jedem Tausch zufriedener und kommt am Ende frei und glücklich zu Hause an. Das zeigt für mich, dass Glück weniger von Besitz abhängt als von der eigenen Bewertung der Situation. Derselbe Umstand kann Pech oder Glück sein, je nachdem, wie man ihn betrachtet. Das habe ich selbst bei meiner Verletzungspause gemerkt: Erst fühlte sich das wie eine Katastrophe an, weil das Training monatelang wegfiel. Mit etwas Abstand habe ich die Pause aber auch als Chance gesehen, andere Dinge aufzubauen und den Körper in Ruhe stark zu machen. Natürlich kann man sich nicht alles „schönreden” – manche Situationen sind objektiv einfach schlecht. Aber die Haltung, mit der man auf Dinge reagiert, kann man tatsächlich selbst entscheiden – und genau darin steckt für mich der wahre Kern des Zitats.",
  },
  {
    id: "zitat-3",
    n: 3,
    short: "Kindsein",
    title: "„Kindsein heißt glücklich sein!”",
    source: "Buch S. 100",
    image: "/portfolio/childhood.jpg",
    theme: "childhood",
    alt: "Kanufahrt auf einem stillen Bergsee in der Abenddämmerung",
    caption: "Einfach im Moment sein – wie als Kind",
    statement:
      "Der Text von Eda Muthsbas beschreibt, wie Kinder komplett im Moment leben: Sie spüren den Wind, staunen über Kleinigkeiten und brauchen dafür kein Smartphone. Erwachsene und auch wir Jugendliche denken dagegen ständig an die Zukunft, an Leistung und daran, wie wir auf andere wirken. Ich glaube, Kinder sind vor allem deshalb glücklicher, weil sie sich weniger vergleichen und keinen Druck spüren. Als Kind spielt man einfach, weil es Spaß macht – später steckt hinter fast allem ein Plan und ein Ziel. Trotzdem finde ich es zu einfach zu sagen, dass nur Kinder glücklich sein können. Man kann sich die kindliche Art der Wahrnehmung nämlich zurückholen, indem man bewusst im Moment bleibt – zum Beispiel, wenn man ganz in einer Sache versinkt und alles andere kurz egal ist. Kindsein ist also kein Alter, sondern eher eine Fähigkeit – und die kann man auch als Jugendlicher oder Erwachsener behalten.",
  },
  {
    id: "zitat-4",
    n: 4,
    short: "Messbar?",
    title: "„Glück – eine messbare Größe?”",
    source: "Buch S. 102",
    image: "/portfolio/nordic.jpg",
    theme: "path",
    alt: "Weites Bergtal mit Nadelwald – nordische Stimmung",
    caption: "Finnland – Platz 1 im Glücksbericht",
    statement:
      "Der World Happiness Report der UN versucht jedes Jahr, das Glück ganzer Länder in Zahlen zu fassen – Finnland liegt dabei auf Platz 1, Deutschland nur auf Platz 17. Gemessen werden aber vor allem Rahmenbedingungen wie Einkommen, Gesundheit, soziale Absicherung und Freiheit. Das ist meiner Meinung nach das Hauptproblem: Man misst die Voraussetzungen für Glück, nicht das Gefühl selbst. Interessant finde ich auch die biologische Seite – laut Forschung ist etwa die Hälfte unseres Glücksempfindens genetisch veranlagt. Das heißt aber auch: Die andere Hälfte können wir selbst beeinflussen, was eigentlich eine gute Nachricht ist. Dass ein reiches Land wie Deutschland nur auf Platz 17 landet, zeigt außerdem, dass Geld allein offensichtlich nicht reicht. Die „Glücksformel” Haben + Lieben + Sein aus dem Buch fasst das gut zusammen: Materielles ist nur ein Drittel davon. Ich denke deshalb: Messbar sind höchstens die Umstände – das Glück selbst bleibt individuell und lässt sich in keiner Statistik komplett abbilden.",
  },
  {
    id: "zitat-5",
    n: 5,
    short: "Lernbar?",
    title: "„Ist Glücklichsein lernbar?”",
    source: "Buch S. 103",
    image: "/portfolio/lernbar.jpg",
    theme: "path",
    alt: "Wanderer auf einem verschneiten Berggrat mit Blick auf die Gipfel",
    caption: "Schritt für Schritt – Glück lässt sich üben",
    statement:
      "Der Glücksforscher Karlheinz Ruckriegel sagt klar: Ja, Glück ist zu einem großen Teil trainierbar. Seine Strategien klingen erst mal nach typischem Ratgeber – Dankbarkeit üben, realistische Ziele setzen, soziale Kontakte pflegen, Vergleiche vermeiden. An mehreren Punkten ist aber wirklich etwas dran. Wer sich ständig mit denen vergleicht, die schon perfekt sind, ist am Ende nur frustriert. Sobald man stattdessen auf den eigenen Fortschritt schaut und sich auch Pausen gönnt, werden die Ergebnisse besser – und man ist zufriedener. Auch der Punkt „für den Körper sorgen” stimmt: Nach Bewegung ist die Stimmung fast immer besser als davor. Glücklichsein funktioniert also wie ein Muskel – durch Wiederholung wird man besser darin. Nicht alles ist lernbar, weil Gene und Umstände mitspielen, aber deutlich mehr, als die meisten denken.",
  },
  {
    id: "zitat-6",
    n: 6,
    short: "Teilen",
    title: "„Glück ist nur dann real, wenn man es teilt!”",
    source: "Buch S. 104",
    image: "/portfolio/teilen.jpg",
    theme: "friends",
    alt: "Türkisfarbener Bergsee in der Abenddämmerung",
    caption: "Manche Momente will man einfach teilen",
    statement:
      "Auf Social Media wird fast nur die glückliche Fassade gepostet – der Text nennt das treffend „Happy-Life-Konzept”. In den Umfrage-Zitaten geben sogar Jugendliche zu, dass sie auf Selfies lächeln, obwohl es ihnen gerade schlecht geht. Diesen Druck kennt fast jeder: Man wählt natürlich das beste Bild aus, nicht das ehrlichste. Trotzdem glaube ich, dass am Zitat etwas Wahres dran ist – nur eben anders, als Instagram es vormacht. Echtes Teilen bedeutet, einen Moment gemeinsam mit anderen zu erleben, nicht ihn für Fremde zu inszenieren. Ein gelungener Tag mit Freunden fühlt sich intensiver an als jede Zahl an Likes. Das Posten an sich ist nicht das Problem – problematisch wird es, wenn man den Moment nur noch für das Foto erlebt. Glück wird also durch Menschen realer, nicht durch Reichweite – und diese Grenze muss jeder für sich selbst ziehen.",
  },
  {
    id: "zitat-7",
    n: 7,
    short: "Unglücklich sein",
    title: "„Auch unglücklich sein kann Glück bedeuten!”",
    source: "Buch S. 105",
    image: "/portfolio/moody.jpg",
    theme: "moody",
    alt: "Nachdenkliches Schwarz-Weiß-Porträt mit Haaren im Wind",
    caption: "Melancholie – „tristitia sublima“",
    statement:
      "Auf den ersten Blick klingt das Zitat widersprüchlich – wie soll Unglücklichsein bitte Glück bedeuten? Der Text von Wilhelm Schmid zeigt aber, dass Melancholie („tristitia sublima”) eine wertvolle Seite hat: Sie macht sensibel, nachdenklich und oft kreativ. Viele der größten Kunstwerke, etwa von Beethoven, sind gerade nicht aus purer Zufriedenheit entstanden. Ich verstehe das so: Ohne Tiefpunkte könnte man Höhepunkte gar nicht als solche erkennen. Frust nach einem Misserfolg ist unangenehm – aber genau dieser Frust kann einen motivieren, es beim nächsten Mal besser zu machen. Wer dagegen krampfhaft versucht, immer glücklich zu sein, setzt sich nur unter Druck und scheitert daran erst recht. Traurige Phasen gehören zum Leben dazu und sind kein Zeichen von Versagen. Dauerglück wäre am Ende sogar langweilig – erst der Kontrast macht die glücklichen Momente wertvoll.",
  },
];

const happiness = [
  { rank: 1, name: "Finnland", score: 7.809 },
  { rank: 2, name: "Dänemark", score: 7.646 },
  { rank: 3, name: "Schweiz", score: 7.56 },
  { rank: 13, name: "UK", score: 7.165 },
  { rank: 17, name: "Deutschland", score: 7.076, de: true },
  { rank: 18, name: "USA", score: 6.94 },
  { rank: 23, name: "Frankreich", score: 6.664 },
  { rank: 28, name: "Spanien", score: 6.401 },
  { rank: 30, name: "Italien", score: 6.387 },
];
const HAPPINESS_MAX = 8;

export default function PortfolioPage() {
  return (
    <main className="pf">
      <div className="pf-topbar">
        <div className="pf-wrap">
          <Link href="/" className="pf-home">
            ← Maxi
          </Link>
          <PrintButton />
        </div>
      </div>

      {/* Cover */}
      <header className="pf-cover">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          className="pf-cover-img"
          src="/portfolio/cover.jpg"
          alt="Person balanciert glücklich auf einem Felsen hoch über einem Fjord"
        />
        <div className="pf-cover-scrim" />
        <div className="pf-wrap pf-cover-body">
          <span className="pf-kicker">Portfolio · Deutsch · Klasse 10d</span>
          <h1 className="pf-title">
            Glück<span className="lich">(lich)</span>
          </h1>
          <p className="pf-subtitle">
            Sieben Zitate beleuchten jeweils eine andere Seite des Glücks –
            zusammen ergeben sie ein Gesamtbild.
          </p>
          <div className="pf-meta">
            <span>7 Zitate</span>
            <span>7 Statements</span>
            <span>Meine Gedanken zum Thema Glück</span>
          </div>
        </div>
      </header>

      <div className="pf-wrap">
        {/* Overview */}
        <section className="pf-overview" aria-label="Überblick">
          <h2>Was ist Glück? — Überblick</h2>
          <p className="pf-lede">
            Jedes Zitat beleuchtet eine andere Seite des Themas. Springe direkt
            zu dem Gedanken, der dich interessiert.
          </p>
          <Mindmap />
        </section>

        {/* Quotes */}
        {quotes.map((q) => (
          <article className="pf-quote" id={q.id} key={q.id}>
            <figure className="pf-figure">
              <PhotoOrPoster
                src={q.image}
                alt={q.alt}
                theme={q.theme}
              />
              <figcaption>{q.caption}</figcaption>
              {q.personal && (
                <span className="pf-swap">Hier dein eigenes Foto</span>
              )}
            </figure>

            <div className="pf-quote-head">
              <span className="pf-num">{q.n}</span>
              <div>
                <h2 className="pf-q">{q.title}</h2>
                <span className="pf-source">{q.source}</span>
              </div>
            </div>

            <p className="pf-statement-label">Mein Statement</p>
            <p className="pf-statement drop">{q.statement}</p>

            {/* Chart belongs to quote 4 */}
            {q.n === 4 && (
              <div className="pf-chart">
                <h3>World Happiness Report 2017–2019 (Auswahl)</h3>
                <p className="pf-chart-sub">
                  Durchschnittlicher Glückswert auf einer Skala von 0 bis 10.
                </p>
                <div className="pf-bars">
                  {happiness.map((c) => (
                    <div
                      className={`pf-bar-row${c.de ? " is-de" : ""}`}
                      key={c.name}
                    >
                      <span className="pf-label">
                        <span className="pf-rank">{c.rank}.</span>
                        {c.name}
                      </span>
                      <span className="pf-track">
                        <span
                          className="pf-fill"
                          style={{ width: `${(c.score / HAPPINESS_MAX) * 100}%` }}
                        />
                      </span>
                      <span className="pf-score">{c.score.toFixed(3)}</span>
                    </div>
                  ))}
                </div>
                <p className="pf-chart-note">
                  Quelle: World Happiness Report (UN). Deutschland (rot) landet
                  trotz Wohlstand nur auf Platz 17.
                </p>
              </div>
            )}
          </article>
        ))}

        <hr className="pf-rule" />

        {/* Fazit */}
        <section className="pf-fazit" aria-label="Fazit">
          <PhotoOrPoster
            src="/portfolio/fazit.jpg"
            alt="Person steht in der Morgensonne auf einem Felsbogen am Meer"
            theme="sunset-road"
          />
          <div className="pf-fazit-body">
            <span className="pf-eyebrow">Mein Fazit</span>
            <h2>Glück hat viele Gesichter.</h2>
            <p>
              Nach den sieben Zitaten ist mir klar geworden, dass Glück kein
              einzelnes Ding ist, sondern viele Gesichter hat: Zufall,
              Entscheidung, Wahrnehmung, Wissenschaft, Training, Gemeinschaft –
              und sogar Traurigkeit. Am meisten überzeugt mich der Gedanke, dass
              ein großer Teil des Glücks in der eigenen Haltung liegt. Man kann
              nicht kontrollieren, was passiert, aber ziemlich oft, wie man damit
              umgeht.
            </p>
          </div>
        </section>

        <p className="pf-foot">Portfolio Glück · Ende</p>
      </div>
    </main>
  );
}
