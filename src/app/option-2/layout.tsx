import type { Metadata, Viewport } from "next";
import { Libre_Caslon_Text } from "next/font/google";

const caslon = Libre_Caslon_Text({ weight: ["400", "700"], style: ["normal", "italic"], subsets: ["latin"], variable: "--font-caslon", display: "swap" });

// Option 2 is a design alternative for review. It points search engines at the homepage and stays out of the index.
export const metadata: Metadata = {
  title: "Roofing Contractor in Denton, TX | Roofing Reformation (Option 2)",
  description:
    "Owner-run, veteran-owned roofing for homes and businesses in Denton and Collin Counties. Repairs, replacement, installation and free inspections, explained in plain English.",
  alternates: { canonical: "/" },
  robots: { index: false, follow: true },
};

export const viewport: Viewport = { themeColor: "#FFFDF2" };

export default function OptionTwoLayout({ children }: { children: React.ReactNode }) {
  return <div className={`${caslon.variable} font-body text-navy`}>{children}</div>;
}
