import { OptionSwitcher } from "@/components/OptionSwitcher";
import { Header } from "@/components/v3/Header";
import { Hero } from "@/components/v3/Hero";
import { About } from "@/components/v3/About";
import { Services } from "@/components/v3/Services";
import { Storm } from "@/components/v3/Storm";
import { Process } from "@/components/v3/Process";
import { Why } from "@/components/v3/Why";
import { Proof } from "@/components/v3/Proof";
import { AreaMap } from "@/components/v3/AreaMap";
import { Team } from "@/components/v3/Team";
import { Request } from "@/components/v3/Request";
import { Footer } from "@/components/v3/Footer";

export default function OptionThree() {
  return (
    <>
      <OptionSwitcher current={3} />
      <Header />
      <main>
        <Hero />
        <About />
        <Services />
        <Storm />
        <Process />
        <Why />
        <Proof />
        <AreaMap />
        <Team />
        <Request />
      </main>
      <Footer />
    </>
  );
}
