"use client";

import Image from "next/image";
import { useState } from "react";

export function VideoPlayer({ src, poster, posterAlt }: { src: string; poster: string; posterAlt: string }) {
  const [playing, setPlaying] = useState(false);
  return (
    <div className="cut relative aspect-video w-full bg-black">
      {playing ? (
        <video className="absolute inset-0 h-full w-full" src={src} poster={poster} controls autoPlay playsInline preload="auto" />
      ) : (
        <>
          <Image src={poster} alt={posterAlt} fill sizes="(min-width:1024px) 60vw, 100vw" className="object-cover" />
          <div className="absolute inset-0 bg-navy/35" />
          <button
            type="button"
            onClick={() => setPlaying(true)}
            className="group absolute inset-0 grid place-items-center"
            aria-label="Play video: see our roofs in your neighborhood"
          >
            <span className="flex items-center gap-4 bg-red px-7 py-4 font-display text-xl uppercase tracking-[0.1em] text-white transition-colors group-hover:bg-[#8f1a2a]">
              <svg width="22" height="22" viewBox="0 0 24 24" aria-hidden><path d="M6 3l15 9-15 9z" fill="currentColor" /></svg>
              Play video
            </span>
          </button>
        </>
      )}
    </div>
  );
}
