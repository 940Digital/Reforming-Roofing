import Image from "next/image";
import { Reveal } from "./Reveal";
import type { SectionProps } from "./MoreLink";
import { googleProfile, googleReviews } from "@/config/googleReviews";
import { GoogleRatingSummary, GoogleReviewCard } from "./GoogleReviewCard";

/** Google reviews in Google's own order. The homepage shows the first few; /reviews shows them all. */
export function Reviews({ prev = "#fffdf2", more = false }: SectionProps = {}) {
  const list = more ? googleReviews.slice(0, 6) : googleReviews;
  return (
    <section id="reviews" className="slant bg-paper pb-20 md:pb-28" style={{ ["--prev" as string]: prev }}>
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <Reveal className="max-w-3xl">
          <p className="eyebrow text-red">Proof</p>
          <h2 className="h-display mt-4 text-4xl text-navy md:text-6xl">Real reviews from real clients</h2>
        </Reveal>

        <Reveal className="mt-10">
          <GoogleRatingSummary rating={googleProfile.rating} count={googleProfile.count} url={googleProfile.url} />
        </Reveal>

        <div className="mt-5 gap-4 sm:columns-2 lg:columns-3">
          {list.map((r) => (
            <div key={r.name} className="mb-4 break-inside-avoid">
              <GoogleReviewCard r={r} profileUrl={googleProfile.url} />
            </div>
          ))}
        </div>

        {more && (
          <Reveal className="mt-6">
            <a href="/reviews" className="btn btn-navy">More reviews &rarr;</a>
          </Reveal>
        )}
        <Reveal className="mt-14 flex justify-center">
          <Image src="/assets/original/c72b01_46a448f2d9f347c19be6000df92bccdd.png" alt="" width={96} height={91} />
        </Reveal>
      </div>
    </section>
  );
}
