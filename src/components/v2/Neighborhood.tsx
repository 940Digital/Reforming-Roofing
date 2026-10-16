import Image from "next/image";
import { Reveal } from "./Motion";
import { VideoPlayer } from "./VideoPlayer";

const gallery = [
  { src: "/assets/original/860db2_ee80d5d1f27148bf8f8609523891c805.png", alt: "Aerial view of a brick and stone home with a finished gray shingle roof in a Texas neighborhood" },
  { src: "/assets/original/9a58ba_684d4706b8f445d4b19388bc2bb86d69.png", alt: "Aerial view from above of a two-story historic style home with a multi-gabled gray shingle roof and two chimneys" },
  { src: "/assets/original/860db2_cf892d60ac384833bfd92f879f2f16af.png", alt: "Aerial view of a finished gray shingle roof on a single-story home with mature trees and a curved walkway" },
];

export function Neighborhood() {
  return (
    <section id="neighborhood" className="section bg-paper">
      <div className="wrap">
        <Reveal>
          <p className="peg-label">Finished work</p>
          <h2 className="h2 mt-6">See our roofs in your neighborhood</h2>
          <p className="lede mt-6">Two and a half minutes of drone footage over roofs we have put on across Denton and Collin Counties.</p>
        </Reveal>

        <Reveal className="mt-14">
          <VideoPlayer
            src="/assets/original/video_9a58ba_99ef674890824d5fa106c485433f9406.mp4"
            poster="/assets/original/still_neighborhood-video_007s.jpg"
            posterAlt="Drone view of a newly roofed brick home with a pool, on a residential street"
          />
        </Reveal>

        <ul className="mt-6 grid gap-6 sm:grid-cols-3">
          {gallery.map((g, i) => (
            <Reveal as="li" key={g.src} delay={i * 0.1} className="frame relative aspect-square">
              <Image src={g.src} alt={g.alt} fill sizes="(min-width:640px) 30vw, 100vw" className="object-cover" />
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
