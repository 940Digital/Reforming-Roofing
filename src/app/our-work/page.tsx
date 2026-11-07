import { PageShell } from "@/components/PageShell";
import { PageHero } from "@/components/PageHero";
import { WorkGallery } from "@/components/WorkGallery";
import { FinalCta } from "@/components/FinalCta";
import { metaFor } from "@/config/meta";
import { JsonLd } from "@/components/JsonLd";
import { abs, ids, pageGraph } from "@/config/schema";
import { heroFor, jobs } from "@/config/work";

export const metadata = metaFor("/our-work");

const imageNodes = jobs.flatMap((j) =>
  j.photos.map((ph) => ({
    "@type": "ImageObject",
    contentUrl: abs(ph.src),
    caption: ph.alt,
    creditText: "Roofing Reformation",
    copyrightHolder: { "@id": ids.business },
  })),
);

export default function OurWorkPage() {
  return (
    <PageShell>
      <JsonLd graph={pageGraph({ path: "/our-work", type: "CollectionPage", trail: ["/our-work"], extra: imageNodes })} />
      <PageHero
        eyebrow="Our work"
        title="Roofs we have finished"
        intro="Drone photos from our jobs. Tap any photo to see it full size."
        image={heroFor("/our-work")}
      />
      <section className="slant bg-cream pb-20 md:pb-28" style={{ ["--prev" as string]: "#042d58" }}>
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <WorkGallery jobs={jobs} />
        </div>
      </section>
      <FinalCta prev="#fffdf2" />
    </PageShell>
  );
}
