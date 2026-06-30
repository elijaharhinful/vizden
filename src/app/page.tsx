import { SiteNav } from "@/components/site/nav";
import { Hero } from "@/components/site/hero";
import { WorksGrid } from "@/components/site/works-grid";
import { SiteFooter } from "@/components/site/footer";
import { Reveal } from "@/components/motion/reveal";
import { StructuredData } from "@/components/seo/structured-data";

export default function Home() {
  return (
    <>
      <StructuredData />
      <SiteNav />
      <main className="flex-1">
        <Hero />
        <WorksGrid />
        <section
          id="philosophy"
          className="border-t border-border bg-background py-28 sm:py-36"
        >
          <Reveal className="mx-auto max-w-4xl px-6 text-center sm:px-10">
            <p className="font-display text-xs font-semibold tracking-[0.35em] text-foreground/60">
              PHILOSOPHY
            </p>
            <p className="mt-8 font-display text-2xl font-semibold leading-snug sm:text-4xl">
              The lion is the terrifying reality of grand, budget-guzzling ideas
              that scare production teams into playing safe.{" "}
              <span className="text-brand">
                We sit calmly upon its back.
              </span>
            </p>
          </Reveal>
        </section>
        <SiteFooter />
      </main>
    </>
  );
}
