import Link from "next/link";
import { SiteNav } from "@/components/site/nav";
import { Hero } from "@/components/site/hero";
import { WorksGrid } from "@/components/site/works-grid";
import { PhilosophyText } from "@/components/site/philosophy-text";
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
            <p
              aria-hidden
              className="pointer-events-none select-none font-display text-4xl font-extrabold tracking-tight text-foreground/10 sm:text-8xl lg:text-9xl"
            >
              Philosophy
            </p>
            <PhilosophyText />
            <div className="mt-12 flex justify-center">
              <Link
                href="/philosophy"
                className="group inline-flex items-center gap-4 whitespace-nowrap border border-foreground/40 px-6 py-4 text-xs font-medium tracking-[0.2em] text-foreground transition-colors hover:border-brand hover:bg-brand hover:text-brand-foreground sm:px-8 sm:tracking-[0.3em]"
              >
                THE FULL DOCTRINE
              </Link>
            </div>
          </Reveal>
        </section>
        <SiteFooter />
      </main>
    </>
  );
}
