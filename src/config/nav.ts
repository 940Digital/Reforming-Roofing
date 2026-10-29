import { categoryHref, serviceGroups } from "./services";

export type NavLink = { href: string; label: string; children?: { href: string; label: string }[] };

export const navLinks: NavLink[] = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  {
    href: "/services",
    label: "Services",
    children: serviceGroups.map((g) => ({ href: categoryHref(g.id), label: g.name })),
  },
  { href: "/reviews", label: "Reviews" },
  { href: "/service-area", label: "Service area" },
];
