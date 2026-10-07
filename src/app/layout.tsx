import type { Metadata, Viewport } from "next";
import { Anton, Rubik } from "next/font/google";
import "./globals.css";
import { business } from "@/config/business";

const anton = Anton({ weight: "400", subsets: ["latin"], variable: "--font-anton", display: "swap" });
const rubik = Rubik({ subsets: ["latin"], variable: "--font-rubik", display: "swap" });

const title = "Roofing Contractor in Denton, TX | Roofing Reformation";
const description =
  "Veteran-owned residential and commercial roofing in Denton and Collin Counties. Repair, replacement, installation and inspection. The owners oversee every job. Free estimate.";

export const metadata: Metadata = {
  metadataBase: new URL(business.siteUrl),
  title,
  description,
  alternates: { canonical: "/" },
  openGraph: {
    title,
    description,
    type: "website",
    url: business.siteUrl,
    siteName: business.name,
    images: [{ url: "/assets/original/6d4007_8798622589aa43a1862229d8f051180f.jpg", width: 763, height: 700, alt: "Roofing Reformation logo, a red Luther rose with a blue heart and the letter R, above the company name" }],
  },
};

export const viewport: Viewport = { themeColor: "#042D58" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${anton.variable} ${rubik.variable}`}>
      <body>{children}</body>
    </html>
  );
}
