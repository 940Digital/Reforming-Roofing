import { ServicesHub } from "@/components/ServicePages";
import { pageMeta } from "@/config/seo";

export const metadata = pageMeta(
  "/services",
  "Roofing and General Contracting Services | Roofing Reformation",
  "Roofing, remodeling, home repairs and painting in Denton and Collin Counties, TX. Veteran-owned, owners oversee every job. Free estimate.",
);

export default function Page() {
  return <ServicesHub />;
}
