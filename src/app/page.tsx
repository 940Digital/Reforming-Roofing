import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Services, services } from "@/components/Services";
import { Process } from "@/components/Process";
import { Why } from "@/components/Why";
import { Reviews } from "@/components/Reviews";
import { Neighborhood } from "@/components/Neighborhood";
import { Area } from "@/components/Area";
import { Team } from "@/components/Team";
import { FinalCta } from "@/components/FinalCta";
import { Footer } from "@/components/Footer";
import { business } from "@/config/business";

// Unresolved fields (address, hours, email, unconfirmed phone, social) are left out on purpose.
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "RoofingContractor",
  name: business.name,
  url: business.siteUrl,
  slogan: business.tagline,
  description:
    "Veteran-owned residential and commercial roofing contractor serving Denton and Collin Counties, Texas.",
  logo: `${business.siteUrl}/assets/original/c72b01_46a448f2d9f347c19be6000df92bccdd.png`,
  image: `${business.siteUrl}/assets/original/4a78eb_0966783f6b7f410c8b449e03b283f615.png`,
  foundingDate: String(business.foundedYear),
  ...(business.phoneConfirmed ? { telephone: "+14693215201" } : {}),
  ...(business.email ? { email: business.email } : {}),
  areaServed: [
    ...business.counties.map((c) => ({ "@type": "AdministrativeArea", name: `${c}, Texas` })),
    ...business.serviceAreas.map((c) => ({ "@type": "City", name: `${c}, TX` })),
  ],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Roofing services",
    itemListElement: services.map((s) => ({
      "@type": "Offer",
      itemOffered: { "@type": "Service", name: s.name, url: `${business.siteUrl}/roofing-services/${s.slug}` },
    })),
  },
};

export default function Home() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Header />
      <main>
        <Hero />
        <About />
        <Services />
        <Process />
        <Why />
        <Reviews />
        <Neighborhood />
        <Area />
        <Team />
        <FinalCta />
      </main>
      <Footer />
    </>
  );
}
