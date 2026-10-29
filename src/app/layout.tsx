import type { Metadata, Viewport } from "next";
import { Anton, Rubik } from "next/font/google";
import "./globals.css";
import { business } from "@/config/business";
import { metaFor } from "@/config/meta";
import { JsonLd } from "@/components/JsonLd";
import { businessNode, websiteNode } from "@/config/schema";

const anton = Anton({ weight: "400", subsets: ["latin"], variable: "--font-anton", display: "swap" });
const rubik = Rubik({ subsets: ["latin"], variable: "--font-rubik", display: "swap" });

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
    <html lang="en" className={`${anton.variable} ${rubik.variable}`}>
      <body>
        <JsonLd graph={[businessNode(), websiteNode()]} />
        {children}
      </body>
    </html>
  );
}
