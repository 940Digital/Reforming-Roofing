import { CategoryPage } from "@/components/ServicePages";
import { getCategory } from "@/config/services";
import { metaDescription, pageMeta } from "@/config/seo";

const category = getCategory("general-contracting")!;

export const metadata = pageMeta(
  `/${category.slug}`,
  `${category.name} in Denton, TX | Roofing Reformation`,
  metaDescription(`${category.intro} Serving Denton and Collin Counties. Free estimate.`),
);

export default function Page() {
  return <CategoryPage category={category} />;
}
