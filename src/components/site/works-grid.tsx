import { WORK_CATEGORIES, type WorkCategory } from "@/lib/content";

const FILTERS = ["ALL", "AEVUM", "EPISODIC", "KINETIC", "ZEITGEIST"] as const;

function WorkCard({ work, index }: { work: WorkCategory; index: number }) {
  // Stagger the right column downward, like the sample's offset masonry feel.
  const offset = index % 2 === 1 ? "lg:mt-32" : "";

  return (
    // Padded gutters give the title room to bleed left and the button to bleed
    // right past the image frame — the sample's broken-frame editorial look.
    <article className={`group relative px-5 sm:px-8 ${offset}`}>
      {/* Image frame: the only clipped element, so overlays can escape it. */}
      <div className="relative aspect-3/4 overflow-hidden">
        {work.poster ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={work.poster}
            alt={work.title}
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        ) : (
          <div
            className={`h-full w-full ${work.placeholder} transition-transform duration-700 group-hover:scale-105`}
          />
        )}
        {/* Soft, localized scrim for legibility — far lighter than a full overlay. */}
        <div className="absolute inset-0 bg-linear-to-tr from-black/55 via-transparent to-transparent" />
      </div>

      {/* Title bleeds left past the frame, sitting around mid-height. */}
      <div className="absolute left-0 top-[42%] right-8 -translate-y-1/2">
        <h3 className="font-display text-4xl font-bold leading-[0.95] tracking-tight drop-shadow-[0_2px_12px_rgba(0,0,0,0.55)] sm:text-5xl">
          {work.title}
        </h3>
        <p className="mt-4 flex items-center gap-3 text-[11px] font-medium tracking-[0.2em] text-foreground/80">
          <span className="h-px w-6 bg-brand" />
          {work.kicker}
        </p>
      </div>

      {/* EXPLORE pill straddles the frame's bottom-right, connector line leading in. */}
      <div className="absolute bottom-10 right-0 flex items-center">
        <span className="h-px w-10 bg-foreground/40 sm:w-14" />
        <button
          type="button"
          className="border border-foreground/40 px-5 py-2.5 text-[11px] font-medium tracking-[0.25em] text-foreground transition-colors hover:border-brand hover:bg-brand hover:text-brand-foreground"
        >
          EXPLORE
        </button>
      </div>
    </article>
  );
}

export function WorksGrid() {
  return (
    <section id="works" className="relative bg-background py-28 sm:py-36">
      {/* Oversized watermark, echoing the sample's ghosted "Portfolio". */}
      <p
        aria-hidden
        className="pointer-events-none select-none px-6 text-center font-display text-6xl font-extrabold tracking-tight text-foreground/6 sm:text-8xl lg:text-9xl"
      >
        Works
      </p>

      {/* Category filter row — echoes the sample's ALL / BRANDING / ... tabs. */}
      <div className="mx-auto mb-16 flex flex-wrap justify-center gap-x-8 gap-y-3 px-6 text-[11px] font-medium tracking-[0.2em]">
        {FILTERS.map((f, i) => (
          <button
            key={f}
            type="button"
            className={
              i === 0
                ? "relative text-brand"
                : "text-foreground/55 transition-colors hover:text-foreground"
            }
          >
            {f}
            {i === 0 && (
              <span className="absolute -bottom-2 left-0 h-px w-full bg-brand" />
            )}
          </button>
        ))}
      </div>

      <div className="mx-auto max-w-7xl px-6 sm:px-10">
        <div className="grid grid-cols-1 items-start gap-x-16 gap-y-20 lg:grid-cols-2">
          {WORK_CATEGORIES.map((work, i) => (
            <WorkCard key={work.slug} work={work} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
