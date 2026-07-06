/* Overview mindmap: central "GLÜCK?" bubble with the seven quote topics
   arranged around it — mirrors the layout of the original paper portfolio. */

const CX = 480;
const CY = 280;

const nodes = [
  { n: 1, label: "Nicht gleich Glück", x: 480, y: 100, anchor: "middle", lx: 480, ly: 66 },
  { n: 2, label: "Entscheidung", x: 738, y: 168, anchor: "start", lx: 768, ly: 174 },
  { n: 3, label: "Kindsein", x: 800, y: 318, anchor: "start", lx: 830, ly: 324 },
  { n: 4, label: "Messbar?", x: 623, y: 438, anchor: "middle", lx: 623, ly: 483 },
  { n: 5, label: "Lernbar?", x: 337, y: 438, anchor: "middle", lx: 337, ly: 483 },
  { n: 6, label: "Teilen", x: 160, y: 318, anchor: "end", lx: 130, ly: 324 },
  { n: 7, label: "Unglücklich sein", x: 222, y: 168, anchor: "end", lx: 192, ly: 174 },
] as const;

export default function Mindmap() {
  return (
    <svg
      className="pf-mindmap"
      viewBox="0 0 960 520"
      role="img"
      aria-label="Mindmap: Glück mit sieben Aspekten – nicht gleich Glück, Entscheidung, Kindsein, messbar, lernbar, teilen, unglücklich sein"
    >
      {/* connecting lines */}
      <g stroke="rgba(245, 237, 226, 0.28)" strokeWidth="2.5">
        {nodes.map((d) => (
          <line key={d.n} x1={CX} y1={CY} x2={d.x} y2={d.y} />
        ))}
      </g>

      {/* nodes */}
      {nodes.map((d) => (
        <a href={`#zitat-${d.n}`} key={d.n}>
          <circle
            cx={d.x}
            cy={d.y}
            r="19"
            fill="#e0a63d"
            stroke="#2b1d14"
            strokeWidth="3"
          />
          <text
            x={d.x}
            y={d.y + 6.5}
            textAnchor="middle"
            fontSize="19"
            fontWeight="900"
            fill="#2b1d14"
            fontFamily="ui-sans-serif, system-ui, sans-serif"
          >
            {d.n}
          </text>
          <text
            x={d.lx}
            y={d.ly}
            textAnchor={d.anchor}
            fontSize="18"
            fontWeight="700"
            fill="#f5ede2"
            fontFamily="ui-sans-serif, system-ui, sans-serif"
          >
            {d.label}
          </text>
        </a>
      ))}

      {/* central bubble */}
      <circle cx={CX} cy={CY} r="66" fill="#e0a63d" />
      <circle cx={CX} cy={CY} r="66" fill="none" stroke="#2b1d14" strokeWidth="4" />
      <text
        x={CX}
        y={CY + 9}
        textAnchor="middle"
        fontSize="26"
        fontWeight="900"
        fill="#2b1d14"
        fontFamily="ui-sans-serif, system-ui, sans-serif"
      >
        GLÜCK?
      </text>
    </svg>
  );
}
