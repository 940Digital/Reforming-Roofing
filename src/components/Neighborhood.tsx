import Image from "next/image";
import { Reveal, Wipe } from "./Reveal";
import { VideoPlayer } from "./VideoPlayer";

const gallery = [
  { src: "/assets/original/860db2_cf892d60ac384833bfd92f879f2f16af.png", alt: "Aerial view of a finished gray shingle roof on a single-story home with mature trees and a curved walkway" },
  { src: "/assets/original/9a58ba_684d4706b8f445d4b19388bc2bb86d69.png", alt: "Aerial view from above of a two-story historic style home with a multi-gabled gray shingle roof and two chimneys" },
  { src: "/assets/original/9a58ba_c7219f7c60f847f88647c1bb1cea2964.png", alt: "Close aerial view of a complex gabled roof with dormers and chimneys covered in charcoal shingles" },
];

export function Neighborhood() {
  return (
    <section id="neighborhood" className="dark-ground slant slant-r relative isolate overflow-hidden bg-navy pb-20 text-white md:pb-28" style={{ ["--prev" as string]: "#f3eedf" }}>
      <Image
        src="/assets/original/9a58ba_f387f819adc940ce912b509041efda28.jpg"
        alt=""
        fill
        sizes="100vw"
        className="object-cover object-top opacity-25"
      />
      <div className="relative mx-auto max-w-7xl px-5 md:px-8">
        <Reveal className="max-w-3xl">
          <p className="eyebrow text-white [--marker:#b42335]">Finished work</p>
          <h2 className="h-display mt-4 text-4xl md:text-6xl">See our roofs in your neighborhood</h2>
          <p className="mt-5 text-lg leading-relaxed text-white/90">
            Drone footage of our roofs across Denton and Collin Counties. Look closely at the lines and the edges.
          </p>
        </Reveal>

        <Wipe className="mt-10">
          <VideoPlayer
            src="/assets/original/video_9a58ba_99ef674890824d5fa106c485433f9406.mp4"
            poster="/assets/original/still_neighborhood-video_007s.jpg"
            posterAlt="Drone view of a newly roofed brick home with a pool, on a residential street"
          />
        </Wipe>

        <ul className="mt-6 grid gap-4 sm:grid-cols-3">
          {gallery.map((g, i) => (
            <Reveal as="li" key={g.src} delay={i * 0.08}>
              <div className="relative aspect-square bg-blue">
                <Image src={g.src} alt={g.alt} fill sizes="(min-width:640px) 33vw, 100vw" className="object-cover" />
              </div>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
