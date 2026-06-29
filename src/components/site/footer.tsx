import Link from "next/link";
import { whatsappUrl } from "@/lib/content";
import { Reveal } from "@/components/motion/reveal";

export function SiteFooter() {
  return (
    <footer
      id="enter"
      className="relative border-t border-border bg-black py-20"
    >
      <div className="mx-auto max-w-7xl px-6 sm:px-10">
        <div className="flex flex-col items-start justify-between gap-12 md:flex-row md:items-end">
          <Reveal>
            <p className="font-display text-xs font-semibold tracking-[0.35em] text-foreground/60">
              ENTER THE DEN
            </p>
            <h2 className="mt-4 max-w-xl font-display text-4xl font-extrabold leading-tight sm:text-5xl">
              We ride outrageous ideas.
              <br />
              We do not fear them.
            </h2>
            <a
              href={whatsappUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex items-center gap-3 bg-brand px-7 py-3 text-sm font-medium text-brand-foreground transition-opacity hover:opacity-90"
            >
              Message us on WhatsApp
            </a>
          </Reveal>

          {/* Domitique — the tamed force. Placeholder mark until the vector lands. */}
          <div className="flex items-center gap-4 text-foreground/50">
            <span
              aria-hidden
              className="grid h-12 w-12 place-items-center rounded-full border border-border font-display text-lg font-bold"
            >
              D
            </span>
            <span className="text-xs leading-relaxed tracking-wide">
              Domitique
              <br />
              The Tamed Force
            </span>
          </div>
        </div>

        <div className="mt-16 flex flex-col items-start justify-between gap-4 border-t border-border pt-8 text-xs text-foreground/40 sm:flex-row sm:items-center">
          <p>© {new Date().getFullYear()} VizDen Studios. The cloud is the stage.</p>
          <nav className="flex gap-6">
            <Link href="#home" className="hover:text-foreground">
              Home
            </Link>
            <Link href="#works" className="hover:text-foreground">
              Works
            </Link>
            <Link href="#philosophy" className="hover:text-foreground">
              Philosophy
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}
