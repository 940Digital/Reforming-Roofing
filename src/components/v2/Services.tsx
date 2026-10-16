import Image from "next/image";
import { Reveal } from "./Motion";

const ico = (id: string) => `/assets/original/9a58ba_${id}.png`;

// Slugs follow the old site's URL structure. The pages are future work.
export const services = [
  { name: "Roof repairs", slug: "roof-repairs", icon: ico("940d1885006c4096bcc5918e4544dfc5"), text: "Leaks found and fixed, including after a storm. Emergency service is available." },
  { name: "Roof replacement and reroofing", slug: "roof-replacement-reroofing", icon: ico("f07ab85f44824e918f61b9dcf74b37f2"), text: "Materials, design and budget settled with you before work starts." },
  { name: "Roof installation", slug: "roof-installation", icon: ico("d3648d83c57c4c11ae489397ce15bff9"), text: "New roofs on new homes and buildings, start to finish." },
  { name: "Roof inspections", slug: "roof-inspections", icon: ico("02d94148ce2848eab3db8a145bb5c221"), text: "Free, with an honest assessment of your roof's condition." },
  { name: "Shingle roofing", slug: "shingle-roofing", icon: ico("7844bf9b136047e2883688d010f2cd4c"), text: "Asphalt shingles from Atlas, GAF, Malarkey, CertainTeed and other makers." },
  { name: "Tile roofing", slug: "tile-roofing", icon: ico("9572863c954a4054bd5adc4623d14c6d"), text: "Tile roofs installed and repaired." },
  { name: "Metal roofing", slug: "metal-roofing", icon: ico("95483018a41541caaaa915ab92b06d7b"), text: "Metal roofs for homes and businesses." },
  { name: "Commercial roofing", slug: "commercial-roofing", icon: ico("19a70e41a19a4956a4e7bc65928519c9"), text: "Commercial systems for business and property owners." },
];

export function Services() {
  return (
    <section id="services" className="section bg-paper">
      <div className="wrap">
        <Reveal>
          <p className="peg-label">Services</p>
          <h2 className="h2 mt-6 max-w-3xl">Residential and commercial roofing</h2>
          <p className="lede mt-6">Eight kinds of work, one standard for all of them.</p>
        </Reveal>

        <ul className="mt-16 grid border-t border-rule md:grid-cols-2 md:gap-x-16">
          {services.map((s, i) => (
            <Reveal as="li" key={s.slug} delay={(i % 2) * 0.08} className="border-b border-rule">
              <a href={`/roofing-services/${s.slug}`} className="group flex items-start gap-5 py-7">
                <Image src={s.icon} alt="" width={26} height={26} className="mt-1.5 opacity-60 transition-opacity group-hover:opacity-100" />
                <div className="flex-1">
                  <h3 className="font-serif text-[1.45rem] leading-snug transition-colors group-hover:text-blue">{s.name}</h3>
                  <p className="mt-1.5 leading-relaxed text-navy/70">{s.text}</p>
                </div>
                <span className="mt-2 text-navy/40 transition-transform duration-300 group-hover:translate-x-1 group-hover:text-blue" aria-hidden>&rarr;</span>
              </a>
            </Reveal>
          ))}
        </ul>

        <Reveal className="mt-10">
          <p className="text-navy/70">We also handle siding, gutters and skylights.</p>
        </Reveal>
      </div>
    </section>
  );
}
