import type { Metadata } from "next";
import { Inter } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import { QueryProvider } from "@/components/providers/query-provider";

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
  title: "VizDen Studios",
  description:
    "Cinematic AI film studio. Cognitive storytelling. The cloud is the stage.",
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
