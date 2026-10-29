import type { MetadataRoute } from "next";
import { business } from "@/config/business";
import { staticPages } from "@/config/pages";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: business.name,
    short_name: business.name,
    description: staticPages[0].description,
    start_url: "/",
    display: "browser",
    background_color: "#FFFDF2",
    theme_color: "#042D58",
    icons: [
      { src: "/icons/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/icons/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
  };
}
