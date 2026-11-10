import type { Metadata, Viewport } from "next";
import { Anton, Roboto, Rubik } from "next/font/google";
import "./globals.css";
import { business } from "@/config/business";
import { metaFor } from "@/config/meta";
import { JsonLd } from "@/components/JsonLd";
import { Analytics } from "@/components/Analytics";
import { businessNode, websiteNode } from "@/config/schema";

const anton = Anton({ weight: "400", subsets: ["latin"], variable: "--font-anton", display: "swap" });
const rubik = Rubik({ subsets: ["latin"], variable: "--font-rubik", display: "swap" });
// Only for the Google review cards, so they read like Google's own review list.
const roboto = Roboto({ weight: ["400", "500"], subsets: ["latin"], variable: "--font-roboto", display: "swap", preload: false });

export const metadata: Metadata = {
  metadataBase: new URL(business.siteUrl),
  ...metaFor("/"),
  applicationName: business.name,
  category: "Roofing contractor",
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 },
  },
  formatDetection: { telephone: true, email: false, address: false },
};

export const viewport: Viewport = { themeColor: "#042D58" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${anton.variable} ${rubik.variable} ${roboto.variable}`}>
      <body>
        <JsonLd graph={[businessNode(), websiteNode()]} />
        {children}
        <Analytics />
      </body>
    </html>
  );
}
