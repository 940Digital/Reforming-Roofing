import Image from "next/image";
import { Reveal } from "./Reveal";

const ico = (id: string) => `/assets/original/9a58ba_${id}.png`;

// Slugs follow the old site's URL structure. Pages are future work, so these links resolve once built.
export const services = [
  {
    name: "Roof repairs",
    slug: "roof-repairs",
    icon: ico("940d1885006c4096bcc5918e4544dfc5"),
    text: "A leak after a storm gets found and fixed quickly. We repair what is broken and tell you plainly what is not.",
  },
  {
    name: "Roof replacement and reroofing",
    slug: "roof-replacement-reroofing",
    icon: ico("f07ab85f44824e918f61b9dcf74b37f2"),
    text: "Old roof out, new roof on. We walk you through materials, designs and budget before anything starts.",
  },
  {
    name: "Roof installation",
    slug: "roof-installation",
    icon: ico("d3648d83c57c4c11ae489397ce15bff9"),
    text: "A new roof on a new build or a new project, handled start to finish by one team.",
  },
  {
    name: "Roof inspections",
    slug: "roof-inspections",
    icon: ico("02d94148ce2848eab3db8a145bb5c221"),
    text: "Free inspection with an honest assessment of your roof's condition. You get the answer.",
  },
  {
    name: "Shingle roofing",
    slug: "shingle-roofing",
    icon: ico("7844bf9b136047e2883688d010f2cd4c"),
    text: "Asphalt shingles from manufacturers including Atlas, GAF, Malarkey and CertainTeed.",
  },
  {
    name: "Tile roofing",
    slug: "tile-roofing",
    icon: ico("9572863c954a4054bd5adc4623d14c6d"),
    text: "Tile roofing installed and repaired for homes that call for it.",
  },
  {
    name: "Metal roofing",
    slug: "metal-roofing",
    icon: ico("95483018a41541caaaa915ab92b06d7b"),
    text: "Metal roofing for homes and businesses.",
  },
  {
    name: "Commercial roofing",
    slug: "commercial-roofing",
    icon: ico("19a70e41a19a4956a4e7bc65928519c9"),
    text: "Commercial roofing systems for business and property owners, held to the same owners-on-site standard.",
  },
];

export function Services() {
  return (
    <section id="services" className="slant slant-r bg-paper pb-20 md:pb-28" style={{ ["--prev" as string]: "#fffdf2" }}>
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <Reveal className="max-w-3xl">
          <p className="eyebrow text-red">Residential and commercial</p>
          <h2 className="h-display mt-4 text-4xl text-navy md:text-6xl">Roofing services in Denton and Collin Counties</h2>
          <p className="mt-5 text-lg leading-relaxed">
            Eight kinds of roofing work. Pick the one that fits and we will take it from there.
          </p>
        </Reveal>

        <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((s, i) => (
            <Reveal as="li" key={s.slug} delay={(i % 4) * 0.06}>
              <a
                href={`/roofing-services/${s.slug}`}
                className="group flex h-full flex-col bg-tint p-6 transition-colors duration-200 hover:bg-navy hover:text-white"
              >
                <span className="grid h-14 w-14 place-items-center bg-white group-hover:bg-white">
                  <Image src={s.icon} alt="" width={36} height={36} />
                </span>
                <h3 className="mt-5 font-display text-2xl uppercase leading-tight tracking-wide">{s.name}</h3>
                <p className="mt-3 flex-1 leading-relaxed">{s.text}</p>
                <span className="mt-5 font-display text-sm uppercase tracking-[0.14em] text-red group-hover:text-[#ff9aa7]">
                  See this service &rarr;
                </span>
              </a>
            </Reveal>
          ))}
        </ul>

        <Reveal className="mt-10">
          <p className="text-lg">
            <strong className="font-display uppercase tracking-wide text-navy">Also offered:</strong> siding, gutters and skylights.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
