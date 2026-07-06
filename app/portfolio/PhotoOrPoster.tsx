"use client";

import { useState } from "react";
import Poster from "./Poster";

type Props = {
  src?: string | null;
  alt: string;
  theme: string;
  label?: string;
};

/* Shows the real photo at `src`. If it's missing (or the user hasn't
   dropped their own file in yet), it falls back to the themed SVG poster —
   so the layout never breaks and personal slots invite a real photo. */
export default function PhotoOrPoster({ src, alt, theme, label }: Props) {
  const [failed, setFailed] = useState(false);

  const showPoster = !src || failed;

  return (
    <div className="pf-media">
      {showPoster ? (
        <Poster theme={theme} label={label} />
      ) : (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={src}
          alt={alt}
          loading="lazy"
          onError={() => setFailed(true)}
        />
      )}
    </div>
  );
}
