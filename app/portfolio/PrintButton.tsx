"use client";

export default function PrintButton() {
  return (
    <button className="pf-print-btn" onClick={() => window.print()}>
      ↧ Als PDF speichern
    </button>
  );
}
