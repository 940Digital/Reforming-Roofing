import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // The team page was folded into About on 2026-10-29.
  async redirects() {
    return [{ source: "/team", destination: "/about#team", permanent: true }];
  },
};

export default nextConfig;
