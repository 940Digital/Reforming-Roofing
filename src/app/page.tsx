import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Services } from "@/components/Services";
import { Process } from "@/components/Process";
import { Why } from "@/components/Why";
import { Reviews } from "@/components/Reviews";
import { Neighborhood } from "@/components/Neighborhood";
import { Area } from "@/components/Area";
import { Team } from "@/components/Team";
import { FinalCta } from "@/components/FinalCta";
import { Footer } from "@/components/Footer";
import { JsonLd } from "@/components/JsonLd";
import { pageGraph } from "@/config/schema";

export default function Home() {
  return (
    <>
      <JsonLd graph={pageGraph({ path: "/" })} />
      <Header />
      <main>
        <Hero />
        <About more />
        <Reviews more />
        <Why prev="#f3eedf" />
        <Services more />
        <Process more />
        <Area more />
        <Neighborhood prev="#fffdf2" />
        <Team more prev="#042d58" />
        <FinalCta />
      </main>
      <Footer />
    </>
  );
}
