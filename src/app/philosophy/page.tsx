import type { Metadata } from "next";
import { SiteNav } from "@/components/site/nav";
import { PhilosophyManifesto } from "@/components/site/philosophy-manifesto";
import { SiteFooter } from "@/components/site/footer";

export const metadata: Metadata = {
  title: "Philosophy",
  description:
    "The VizDen Studios doctrine. The Great Domestication, The Revolution and Enter the Den — how the cloud and AI let us tame the wildest ideas and ride them to the screen.",
  alternates: { canonical: "/philosophy" },
  openGraph: {
    type: "website",
    url: "/philosophy",
    title: "Philosophy | VizDen Studios",
    description:
      "How VizDen Studios tames the wildest ideas. The cloud is the stage. We ride the lion.",
  },
};

export default function PhilosophyPage() {
  return (
    <>
      <SiteNav />
      <main className="flex-1">
        <PhilosophyManifesto />
      </main>
      <SiteFooter />
    </>
  );
}
