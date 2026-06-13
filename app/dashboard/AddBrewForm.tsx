"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

const methods = ["V60", "Aeropress", "Espresso", "French Press", "Chemex", "Moka Pot"];

export default function AddBrewForm() {
  const router = useRouter();
  const [bean, setBean] = useState("");
  const [origin, setOrigin] = useState("");
  const [method, setMethod] = useState(methods[0]);
  const [rating, setRating] = useState(5);
  const [notes, setNotes] = useState("");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError("");

    try {
      const res = await fetch("/api/brews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ bean, origin, method, rating, notes }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setError(data?.error ?? "Could not save brew.");
        setSaving(false);
        return;
      }
      setBean("");
      setOrigin("");
      setNotes("");
      setRating(5);
      setMethod(methods[0]);
      router.refresh();
    } catch {
      setError("Network error.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <form onSubmit={onSubmit}>
      {error && <div className="notice err">{error}</div>}

      <div className="field">
        <label htmlFor="bean">Bean / roast</label>
        <input
          id="bean"
          className="input"
          required
          placeholder="e.g. Yirgacheffe"
          value={bean}
          onChange={(e) => setBean(e.target.value)}
        />
      </div>

      <div className="field">
        <label htmlFor="origin">Origin</label>
        <input
          id="origin"
          className="input"
          placeholder="e.g. Ethiopia · Washed"
          value={origin}
          onChange={(e) => setOrigin(e.target.value)}
        />
      </div>

      <div className="field">
        <label htmlFor="method">Brew method</label>
        <select
          id="method"
          className="select"
          value={method}
          onChange={(e) => setMethod(e.target.value)}
        >
          {methods.map((m) => (
            <option key={m} value={m}>
              {m}
            </option>
          ))}
        </select>
      </div>

      <div className="field">
        <label htmlFor="rating">Rating: {rating} / 5</label>
        <input
          id="rating"
          type="range"
          min={1}
          max={5}
          step={1}
          style={{ width: "100%" }}
          value={rating}
          onChange={(e) => setRating(Number(e.target.value))}
        />
      </div>

      <div className="field">
        <label htmlFor="notes">Tasting notes</label>
        <textarea
          id="notes"
          className="textarea"
          rows={3}
          placeholder="Floral, citrus, clean finish…"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
        />
      </div>

      <button type="submit" className="btn btn-primary full" disabled={saving}>
        {saving ? "Saving…" : "Add to journal"}
      </button>
    </form>
  );
}
