import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { JsonLd } from "@/components/JsonLd";
import { WhatsAppFloat } from "@/components/WhatsApp";
import { organizationGraph } from "@/lib/schema";
import { site } from "@/lib/site";
import "./globals.css";

// Self-hosted at build time with a size-adjusted fallback → no layout shift, no third-party request.
const inter = Inter({ subsets: ["latin"], display: "swap", variable: "--font-inter" });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: site.title, template: `%s | ${site.name}` },
  description: site.description,
  applicationName: site.name,
  keywords: [
    "custom software development",
    "MVP development agency",
    "SaaS product engineering",
    "full-stack development services",
    "product engineering services",
    "web and mobile app development",
  ],
  authors: [{ name: site.name, url: site.url }],
  creator: site.name,
  alternates: { canonical: "/" },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
  },
  openGraph: {
    type: "website",
    url: "/",
    siteName: site.name,
    title: site.title,
    description: site.description,
    locale: site.locale,
  },
  twitter: {
    card: "summary_large_image",
    ...(site.twitterHandle && { site: site.twitterHandle, creator: site.twitterHandle }),
    title: site.title,
    description: site.description,
  },
  category: "technology",
};

export const viewport: Viewport = {
  themeColor: "#0a0a0a",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable}>
      <body>
        <a href="#main" className="skip-link">
          Skip to main content
        </a>
        {children}
        <WhatsAppFloat />
        <JsonLd data={organizationGraph} />
      </body>
    </html>
  );
}
