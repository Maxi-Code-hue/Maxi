/* Hand-drawn SVG "poster" artwork, one per theme.
   Warm palette, editorial feel — used until a real photo is dropped in. */

type Props = { theme: string; label?: string };

const WARM = {
  sky1: "#fbe7c6",
  sky2: "#f3c98b",
  sun: "#e9a13b",
  hill1: "#c98a4e",
  hill2: "#9c6636",
  hill3: "#6f4327",
  espresso: "#3a2416",
  cream: "#fbf3e7",
};

function Frame({ children }: { children: React.ReactNode }) {
  return (
    <svg
      viewBox="0 0 960 540"
      preserveAspectRatio="xMidYMid slice"
      width="100%"
      height="100%"
      role="img"
      aria-hidden="true"
    >
      {children}
    </svg>
  );
}

export default function Poster({ theme, label }: Props) {
  switch (theme) {
    /* ---- Zitat 1: Espresso am Morgen ---- */
    case "espresso":
      return (
        <Frame>
          <defs>
            <radialGradient id="e-bg" cx="70%" cy="20%" r="90%">
              <stop offset="0%" stopColor="#f6d9a8" />
              <stop offset="100%" stopColor="#e7b06a" />
            </radialGradient>
          </defs>
          <rect width="960" height="540" fill="url(#e-bg)" />
          <circle cx="720" cy="120" r="70" fill="#f4c983" opacity="0.7" />
          {/* steam */}
          <g stroke="#fff7ea" strokeWidth="7" strokeLinecap="round" fill="none" opacity="0.75">
            <path d="M455 150 q-22 -34 0 -66 q22 -32 0 -64" />
            <path d="M505 150 q22 -34 0 -66 q-22 -32 0 -64" />
          </g>
          {/* saucer */}
          <ellipse cx="480" cy="440" rx="210" ry="34" fill={WARM.hill3} opacity="0.35" />
          {/* cup */}
          <path d="M330 300 h300 v40 a150 150 0 0 1 -300 0 z" fill={WARM.espresso} />
          <path d="M355 305 h250 v30 a125 125 0 0 1 -250 0 z" fill="#5a3a22" />
          <ellipse cx="480" cy="305" rx="125" ry="26" fill="#c98a4e" />
          <ellipse cx="480" cy="303" rx="118" ry="21" fill="#b5793f" />
          {/* handle */}
          <path d="M630 330 q70 4 70 60 q0 52 -66 56" fill="none" stroke={WARM.espresso} strokeWidth="26" />
        </Frame>
      );

    /* ---- Zitat 2: Entscheidung / Weg ---- */
    case "path":
      return (
        <Frame>
          <defs>
            <linearGradient id="p-sky" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#fbe7c6" />
              <stop offset="100%" stopColor="#f7d29a" />
            </linearGradient>
          </defs>
          <rect width="960" height="540" fill="url(#p-sky)" />
          <circle cx="480" cy="150" r="66" fill={WARM.sun} opacity="0.85" />
          <path d="M0 300 q240 -70 480 -20 q240 50 480 -30 v300 H0 z" fill={WARM.hill1} />
          <path d="M0 380 q260 -40 480 10 q240 50 480 0 v160 H0 z" fill={WARM.hill2} />
          <path d="M0 460 q260 -20 480 8 q220 26 480 -6 v90 H0 z" fill={WARM.hill3} />
          {/* winding road */}
          <path
            d="M470 540 C 470 470 560 450 540 400 C 520 355 420 350 440 305 C 456 268 512 262 500 232"
            fill="none"
            stroke={WARM.cream}
            strokeWidth="34"
            strokeLinecap="round"
            opacity="0.9"
          />
          <path
            d="M470 540 C 470 470 560 450 540 400 C 520 355 420 350 440 305 C 456 268 512 262 500 232"
            fill="none"
            stroke={WARM.sun}
            strokeWidth="4"
            strokeDasharray="14 20"
            strokeLinecap="round"
          />
        </Frame>
      );

    /* ---- Zitat 5: Latte Art (personal) ---- */
    case "latte":
      return (
        <Frame>
          <defs>
            <radialGradient id="l-bg" cx="50%" cy="35%" r="80%">
              <stop offset="0%" stopColor="#f6dcb2" />
              <stop offset="100%" stopColor="#d99b56" />
            </radialGradient>
          </defs>
          <rect width="960" height="540" fill="url(#l-bg)" />
          <ellipse cx="480" cy="285" rx="176" ry="168" fill={WARM.espresso} />
          <ellipse cx="480" cy="278" rx="160" ry="150" fill="#6b4326" />
          <ellipse cx="480" cy="272" rx="150" ry="140" fill="#a56a3a" />
          {/* rosetta leaf */}
          <g fill={WARM.cream}>
            <path d="M480 175 C 500 235 500 300 480 372 C 460 300 460 235 480 175 Z" />
            <path d="M480 250 C 520 250 556 262 584 286 C 548 292 512 288 480 276 Z" />
            <path d="M480 250 C 440 250 404 262 376 286 C 412 292 448 288 480 276 Z" />
            <path d="M480 300 C 512 300 542 308 566 326 C 536 332 506 328 480 320 Z" />
            <path d="M480 300 C 448 300 418 308 394 326 C 424 332 454 328 480 320 Z" />
          </g>
          {label && <PosterLabel text={label} />}
        </Frame>
      );

    /* ---- Zitat 3: Kindheit / Fahrrad (personal) ---- */
    case "childhood":
      return (
        <Frame>
          <defs>
            <linearGradient id="c-bg" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#fbe7c6" />
              <stop offset="100%" stopColor="#f2c07f" />
            </linearGradient>
          </defs>
          <rect width="960" height="540" fill="url(#c-bg)" />
          <circle cx="770" cy="120" r="56" fill={WARM.sun} opacity="0.8" />
          <path d="M0 430 q480 -60 960 0 v110 H0 z" fill={WARM.hill2} opacity="0.5" />
          {/* bicycle */}
          <g stroke={WARM.espresso} strokeWidth="12" fill="none" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="370" cy="360" r="72" />
            <circle cx="600" cy="360" r="72" />
            <path d="M370 360 L470 360 L540 260 L600 360" />
            <path d="M470 360 L510 260 H560" />
            <path d="M540 260 h48" />
          </g>
          <circle cx="370" cy="360" r="10" fill={WARM.espresso} />
          <circle cx="600" cy="360" r="10" fill={WARM.espresso} />
          {label && <PosterLabel text={label} />}
        </Frame>
      );

    /* ---- Zitat 6: Teilen / Social ---- */
    case "friends":
      return (
        <Frame>
          <defs>
            <linearGradient id="f-bg" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#f5cf95" />
              <stop offset="100%" stopColor="#e0a25a" />
            </linearGradient>
          </defs>
          <rect width="960" height="540" fill="url(#f-bg)" />
          {/* three people */}
          <g fill={WARM.espresso} opacity="0.92">
            <circle cx="360" cy="230" r="58" />
            <path d="M270 400 a90 90 0 0 1 180 0 z" />
          </g>
          <g fill="#7a4d2b">
            <circle cx="560" cy="255" r="50" />
            <path d="M484 405 a76 76 0 0 1 152 0 z" />
          </g>
          <g fill="#a5673a">
            <circle cx="690" cy="235" r="44" />
            <path d="M624 400 a66 66 0 0 1 132 0 z" />
          </g>
          {/* chat hearts */}
          <g fill={WARM.cream}>
            <path d="M300 150 h70 a16 16 0 0 1 16 16 v34 a16 16 0 0 1 -16 16 h-30 l-22 20 v-20 h-18 a16 16 0 0 1 -16 -16 v-34 a16 16 0 0 1 16 -16 z" />
          </g>
          <path d="M335 172 c-8 -12 -30 -4 -22 12 c4 10 22 20 22 20 c0 0 18 -10 22 -20 c8 -16 -14 -24 -22 -12 z" fill="#c0392b" />
        </Frame>
      );

    /* ---- Zitat 7: Melancholie / Regenwolke mit Sonne ---- */
    case "moody":
      return (
        <Frame>
          <defs>
            <linearGradient id="m-bg" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#8a8f9c" />
              <stop offset="55%" stopColor="#b9a68c" />
              <stop offset="100%" stopColor="#e7c07f" />
            </linearGradient>
          </defs>
          <rect width="960" height="540" fill="url(#m-bg)" />
          <circle cx="700" cy="180" r="80" fill="#f6cd7a" opacity="0.9" />
          <g fill="#e9a13b" opacity="0.55">
            {Array.from({ length: 12 }).map((_, i) => (
              <rect
                key={i}
                x="695"
                y="70"
                width="10"
                height="40"
                rx="5"
                transform={`rotate(${i * 30} 700 180)`}
              />
            ))}
          </g>
          {/* cloud */}
          <g fill="#575b66">
            <ellipse cx="360" cy="240" rx="150" ry="70" />
            <ellipse cx="260" cy="270" rx="90" ry="56" />
            <ellipse cx="470" cy="270" rx="100" ry="58" />
            <rect x="180" y="255" width="380" height="60" rx="30" />
          </g>
          {/* rain */}
          <g stroke="#4b5560" strokeWidth="7" strokeLinecap="round" opacity="0.7">
            {[240, 300, 360, 420, 480].map((x, i) => (
              <line key={i} x1={x} y1="340" x2={x - 26} y2="410" />
            ))}
          </g>
        </Frame>
      );

    /* ---- Fazit: Weg in die Abendsonne ---- */
    case "sunset-road":
      return (
        <Frame>
          <defs>
            <linearGradient id="s-sky" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#f3a95c" />
              <stop offset="55%" stopColor="#e07a3c" />
              <stop offset="100%" stopColor="#7a3a22" />
            </linearGradient>
          </defs>
          <rect width="960" height="540" fill="url(#s-sky)" />
          <circle cx="480" cy="250" r="120" fill="#fbdf9a" opacity="0.92" />
          <path d="M0 360 q240 -50 480 -10 q240 40 480 -10 v210 H0 z" fill="#8a3f22" />
          <path d="M0 430 q240 -30 480 6 q240 34 480 -6 v120 H0 z" fill="#5c2a17" />
          {/* road */}
          <path d="M430 540 L470 380 L490 380 L530 540 Z" fill="#3a1c10" />
          <g stroke="#f7d29a" strokeWidth="6" strokeDasharray="18 22">
            <line x1="480" y1="540" x2="480" y2="382" />
          </g>
        </Frame>
      );

    default:
      return (
        <Frame>
          <rect width="960" height="540" fill="#e7b06a" />
        </Frame>
      );
  }
}

function PosterLabel({ text }: { text: string }) {
  return (
    <g>
      <rect
        x="255"
        y="470"
        width="450"
        height="44"
        rx="22"
        fill="#2b1d14"
        opacity="0.72"
      />
      <text
        x="480"
        y="498"
        textAnchor="middle"
        fontFamily="ui-sans-serif, system-ui, sans-serif"
        fontSize="19"
        fontWeight="700"
        fill="#f7ecdd"
      >
        {text}
      </text>
    </g>
  );
}
