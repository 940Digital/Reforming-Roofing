import { Header } from "@/components/v2/Header";
import { OptionSwitcher } from "@/components/OptionSwitcher";
import { Hero } from "@/components/v2/Hero";
import { About } from "@/components/v2/About";
import { Services } from "@/components/v2/Services";
import { Process } from "@/components/v2/Process";
import { Why } from "@/components/v2/Why";
import { Reviews } from "@/components/v2/Reviews";
import { Neighborhood } from "@/components/v2/Neighborhood";
import { Area } from "@/components/v2/Area";
import { Team } from "@/components/v2/Team";
import { FinalCta } from "@/components/v2/FinalCta";
import { Footer } from "@/components/v2/Footer";

export default function OptionTwo() {
  return (
    <>
      <OptionSwitcher current={2} />
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
