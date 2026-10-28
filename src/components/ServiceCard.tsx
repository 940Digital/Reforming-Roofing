import { serviceHref, type Service } from "@/config/services";

export function ServiceCard({ service }: { service: Service }) {
  return (
    <a
      href={serviceHref(service.slug)}
      className="group flex h-full flex-col bg-tint p-6 transition-colors duration-200 hover:bg-navy hover:text-white"
    >
      <h3 className="font-display text-2xl uppercase leading-tight tracking-wide">{service.name}</h3>
      <p className="mt-3 flex-1 leading-relaxed">{service.card}</p>
      <span className="mt-5 font-display text-sm uppercase tracking-[0.14em] text-red group-hover:text-[#ff9aa7]">
        See this service &rarr;
      </span>
    </a>
  );
}
