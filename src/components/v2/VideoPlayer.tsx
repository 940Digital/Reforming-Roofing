"use client";

import Image from "next/image";
import { useState } from "react";

export function VideoPlayer({ src, poster, posterAlt }: { src: string; poster: string; posterAlt: string }) {
  const [playing, setPlaying] = useState(false);
  return (
    <div className="frame relative aspect-video w-full bg-navy">
      {playing ? (
        <video className="absolute inset-0 h-full w-full" src={src} poster={poster} controls autoPlay playsInline />
      ) : (
        <button
          type="button"
          onClick={() => setPlaying(true)}
          className="group absolute inset-0"
          aria-label="Play the full video: see our roofs in your neighborhood"
        >
          <Image src={poster} alt={posterAlt} fill sizes="(min-width:1024px) 70vw, 100vw" className="object-cover" />
          <span className="absolute inset-0 bg-navy/30 transition-colors duration-500 group-hover:bg-navy/15" />
          <span className="absolute left-1/2 top-1/2 grid h-20 w-20 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-cream text-navy transition-transform duration-500 group-hover:scale-105">
            <svg width="22" height="22" viewBox="0 0 24 24" aria-hidden className="ml-1"><path d="M6 3l15 9-15 9z" fill="currentColor" /></svg>
          </span>
        </button>
      )}
    </div>
  );
}
