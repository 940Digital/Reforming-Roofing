import { notFound } from "next/navigation";
import { ServicePage } from "@/components/ServicePages";
import { getCategory, getService, servicePath } from "@/config/services";
import { metaDescription, pageMeta } from "@/config/seo";

const category = getCategory("roofing-services")!;

export const dynamicParams = false;

export function generateStaticParams() {
  return category.services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const service = getService(category.slug, (await params).slug);
  if (!service) return {};
  return pageMeta(
    servicePath(category, service),
    `${service.name} in Denton, TX | Roofing Reformation`,
    metaDescription(service.body),
  );
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const service = getService(category.slug, (await params).slug);
  if (!service) notFound();
  return <ServicePage category={category} service={service} />;
}
