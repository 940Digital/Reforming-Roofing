import Image from "next/image";
import { Reveal, Wipe } from "./Reveal";
import { VideoPlayer } from "./VideoPlayer";
import { MoreLink } from "./MoreLink";
import { featured as gallery } from "@/config/work";

export function Neighborhood({ prev = "#f3eedf" }: { prev?: string } = {}) {
  return (
    <section id="neighborhood" className="dark-ground slant slant-r relative isolate overflow-hidden bg-navy pb-20 text-white md:pb-28" style={{ ["--prev" as string]: prev }}>
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
              <a href="/our-work" className="group relative block aspect-[4/3] overflow-hidden bg-blue">
                <Image src={g.src} alt={g.alt} fill sizes="(min-width:640px) 33vw, 100vw" className="object-cover transition-transform duration-500 group-hover:scale-[1.04]" />
              </a>
            </Reveal>
          ))}
        </ul>
        <MoreLink href="/our-work" label="See more of our work" dark />
      </div>
    </section>
  );
}
