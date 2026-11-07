import { PageShell } from "@/components/PageShell";
import { PageHero } from "@/components/PageHero";
import { FinalCta } from "@/components/FinalCta";
import { heroFor } from "@/config/work";

export const metadata = { title: "Page not found | Roofing Reformation", robots: { index: false } };

export default function NotFound() {
  return (
    <PageShell>
      <PageHero
        eyebrow="404"
        title="That page is not here"
        intro="It may have moved. Use the menu to find what you need, or text us and we will help."
        image={heroFor("/404")}
      />
      <FinalCta prev="#042d58" />
    </PageShell>
  );
}
