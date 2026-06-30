import type { Metadata } from "next";
import { Suspense } from "react";
import { SiteNav } from "@/components/site/nav";
import { WorksWatch } from "@/components/site/works-watch";
import { SiteFooter } from "@/components/site/footer";

export const metadata: Metadata = {
  title: "Works",
  description:
    "The VizDen Studios screening room. Aevum Tributes, Episodic Lore, Kinetic Impact and Zeitgeist Campaigns — cinematic AI films, watch them now.",
  alternates: { canonical: "/works" },
  openGraph: {
    type: "website",
    url: "/works",
    title: "Works | VizDen Studios",
    description:
      "The VizDen Studios screening room. Cinematic AI films across four high-concept categories.",
  },
};

export default function WorksPage() {
  return (
    <>
      <SiteNav />
      <main className="flex-1">
        <Suspense>
          <WorksWatch />
        </Suspense>
      </main>
      <SiteFooter />
    </>
  );
}
