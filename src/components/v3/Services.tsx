import Image from "next/image";
import { Band } from "./Band";
import { Unfold } from "./Motion";

const ico = (id: string) => `/assets/original/9a58ba_${id}.png`;

// Slugs follow the old site's URL structure. The pages are future work.
const services = [
  { name: "Roof repairs", slug: "roof-repairs", icon: ico("940d1885006c4096bcc5918e4544dfc5"), text: "Leaks and storm damage found and fixed. Emergency service is available." },
  { name: "Roof inspections", slug: "roof-inspections", icon: ico("02d94148ce2848eab3db8a145bb5c221"), text: "Free, with an honest assessment of what we see." },
  { name: "Replacement and reroofing", slug: "roof-replacement-reroofing", icon: ico("f07ab85f44824e918f61b9dcf74b37f2"), text: "Materials, design and budget settled with you first." },
  { name: "Roof installation", slug: "roof-installation", icon: ico("d3648d83c57c4c11ae489397ce15bff9"), text: "New roofs on new homes and buildings, start to finish." },
  { name: "Shingle roofing", slug: "shingle-roofing", icon: ico("7844bf9b136047e2883688d010f2cd4c"), text: "Asphalt shingles from Atlas, GAF, Malarkey, CertainTeed and other makers." },
  { name: "Tile roofing", slug: "tile-roofing", icon: ico("9572863c954a4054bd5adc4623d14c6d"), text: "Tile roofs installed and repaired." },
  { name: "Metal roofing", slug: "metal-roofing", icon: ico("95483018a41541caaaa915ab92b06d7b"), text: "Metal roofs for homes and businesses." },
  { name: "Commercial roofing", slug: "commercial-roofing", icon: ico("19a70e41a19a4956a4e7bc65928519c9"), text: "Commercial systems for business and property owners." },
];

export function Services() {
  return (
    <section aria-labelledby="services-h">
      <Band id="services" n="01" label="Services" />
      <div className="mx-auto max-w-6xl px-5 py-16 md:px-8 md:py-24">
        <Unfold className="grid gap-4 md:grid-cols-[1fr_1fr] md:items-end">
          <h2 id="services-h" className="text-[2rem] font-extrabold leading-tight tracking-tight md:text-[2.8rem]">
            Residential and commercial roofing
          </h2>
          <p className="text-lg text-navy/75 md:text-right">Siding, gutters and skylights too.</p>
        </Unfold>
        <ul className="mt-10 grid grid-cols-1 gap-px border border-hair bg-hair sm:grid-cols-2 lg:grid-cols-4">
          {services.map((s, i) => (
            <Unfold as="li" key={s.slug} delay={(i % 4) * 0.07} className="bg-white">
              <a href={`/roofing-services/${s.slug}`} className="group flex h-full flex-col p-6 transition-colors hover:bg-tint">
                <Image src={s.icon} alt="" width={32} height={32} />
                <h3 className="mt-5 text-xl font-bold leading-snug">{s.name}</h3>
                <p className="mt-2 flex-1 leading-relaxed text-navy/75">{s.text}</p>
                <span className="mt-5 text-sm font-semibold text-blue group-hover:underline">Details &rarr;</span>
              </a>
            </Unfold>
          ))}
        </ul>
      </div>
    </section>
  );
}
