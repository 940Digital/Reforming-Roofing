import type { Metadata, Viewport } from "next";
import { Public_Sans } from "next/font/google";

const publicSans = Public_Sans({ subsets: ["latin"], variable: "--font-public", display: "swap" });

// Option 3 is a design alternative for review. It points search engines at the homepage and stays out of the index.
export const metadata: Metadata = {
  title: "Roofing Contractor in Denton, TX | Roofing Reformation (Option 3)",
  description:
    "Local, veteran-owned roofing in Denton and Collin Counties. Free roof inspections after hail, repairs, replacement and installation, with the owners overseeing every job.",
  alternates: { canonical: "/" },
  robots: { index: false, follow: true },
};

export const viewport: Viewport = { themeColor: "#042D58" };

export default function OptionThreeLayout({ children }: { children: React.ReactNode }) {
  return <div className={`${publicSans.variable} bg-cream font-civic text-navy`}>{children}</div>;
}
