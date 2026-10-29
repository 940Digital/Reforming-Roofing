import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Pages folded into others on 2026-10-29: Team into About, How it works into Services.
  async redirects() {
    return [
      { source: "/team", destination: "/about#team", permanent: true },
      { source: "/how-it-works", destination: "/services#how-it-works", permanent: true },
      // Commercial roofing was dropped from the site on 2026-10-29.
      { source: "/services/commercial-roof-repair", destination: "/services/roof-damage-repair", permanent: true },
      { source: "/services/commercial-roof-replacement", destination: "/services/roof-replacement", permanent: true },
    ];
  },
};

export default nextConfig;
