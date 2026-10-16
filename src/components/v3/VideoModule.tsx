"use client";

import Image from "next/image";
import { useState } from "react";

export function VideoModule({ src, poster, posterAlt }: { src: string; poster: string; posterAlt: string }) {
  const [playing, setPlaying] = useState(false);
  return (
    <div className="relative aspect-video w-full bg-navy">
      {playing ? (
        <video className="absolute inset-0 h-full w-full" src={src} poster={poster} controls autoPlay playsInline />
      ) : (
        <button type="button" onClick={() => setPlaying(true)} className="group absolute inset-0" aria-label="Play the full video: see our roofs in your neighborhood">
          <Image src={poster} alt={posterAlt} fill sizes="(min-width:1152px) 1152px, 100vw" className="object-cover" />
          <span className="absolute inset-0 bg-navy/30 transition-colors group-hover:bg-navy/15" />
          <span className="absolute bottom-0 left-0 flex items-center gap-3 bg-red px-5 py-4 font-semibold text-white">
            <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden><path d="M6 3l15 9-15 9z" fill="currentColor" /></svg>
            Play the 2:28 video
          </span>
        </button>
      )}
    </div>
  );
}
