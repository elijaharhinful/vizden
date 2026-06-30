import type { Metadata } from "next";
import { Inter } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import { QueryProvider } from "@/components/providers/query-provider";
import { SITE, SEO_KEYWORDS } from "@/lib/content";

// Futura LT (self-hosted) — the massive titles and bold headings.
const futura = localFont({
  variable: "--font-display",
  display: "swap",
  src: [
    { path: "./fonts/FuturaLT-Book.woff2", weight: "400", style: "normal" },
    { path: "./fonts/FuturaLT-Bold.woff2", weight: "700", style: "normal" },
    { path: "./fonts/FuturaLT-ExtraBold.woff2", weight: "800", style: "normal" },
    { path: "./fonts/FuturaLT-Heavy.woff2", weight: "900", style: "normal" },
  ],
});

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: `${SITE.name} - AI Film Studio & Cinematic AI Video Production`,
    template: `%s | ${SITE.name}`,
  },
  description: SITE.description,
  keywords: [...SEO_KEYWORDS],
  applicationName: SITE.name,
  authors: [{ name: SITE.name, url: SITE.url }],
  creator: SITE.name,
  publisher: SITE.name,
  category: "Film & Video Production",
  alternates: { canonical: "/" },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-video-preview": -1,
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    siteName: SITE.name,
    url: "/",
    title: `${SITE.name} - AI Film Studio`,
    description: SITE.description,
    locale: SITE.locale,
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE.name} - AI Film Studio`,
    description: SITE.description,
  },
  // Filled after Google Search Console verification (DNS TXT is the alternative).
  // verification: { google: "<token>" },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`dark ${futura.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <QueryProvider>{children}</QueryProvider>
      </body>
    </html>
  );
}
