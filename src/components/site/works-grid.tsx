"use client";

import { useEffect, useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
} from "motion/react";
import { WORK_CATEGORIES, type WorkCategory } from "@/lib/content";
import { Reveal } from "@/components/motion/reveal";

const FILTERS = ["ALL", "AEVUM", "EPISODIC", "KINETIC", "ZEITGEIST"] as const;

function WorkCard({ work, index }: { work: WorkCategory; index: number }) {
  // Stagger the right column downward, like the sample's offset masonry feel.
  const offset = index % 2 === 1 ? "lg:mt-32" : "";

  const ref = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const reduce = useReducedMotion();
  // Track this card's pass through the viewport, drift the image against scroll.
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  // Right column drifts a touch harder for depth between the two columns.
  const range = index % 2 === 1 ? "12%" : "9%";
  const y = useTransform(
    scrollYProgress,
    [0, 1],
    reduce ? ["0%", "0%"] : [`-${range}`, range],
  );

  // Only play the clip while the card is on screen — saves bandwidth and
  // avoids four videos decoding at once.
  useEffect(() => {
    const el = videoRef.current;
    if (!el) return;
    el.muted = true; // enforce muted so autoplay is allowed
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.play().catch(() => {});
        } else {
          el.pause();
        }
      },
      { threshold: 0.25 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    // Padded gutters give the title room to bleed left and the button to bleed
    // right past the image frame — the sample's broken-frame editorial look.
    <article
      ref={ref}
      className={`group relative px-5 transition-transform duration-500 hover:-translate-y-1.5 sm:px-8 ${offset}`}
    >
      {/* Image frame: the only clipped element, so overlays can escape it. */}
      <div className="relative aspect-3/4 overflow-hidden">
        {/* Oversized parallax layer: taller than the frame so the scroll drift
            never exposes an edge. */}
        <motion.div style={{ y }} className="absolute inset-x-0 inset-y-[-14%]">
          {work.video ? (
            <video
              ref={videoRef}
              src={work.video}
              poster={work.poster}
              muted
              loop
              playsInline
              preload="metadata"
              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
          ) : work.poster ? (
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
        </motion.div>
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
        {/* Crawlable, accessible description — no visual change. */}
        <p className="sr-only">{work.concept}</p>
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
      <Reveal className="mx-auto mb-16 flex flex-wrap justify-center gap-x-8 gap-y-3 px-6 text-[11px] font-medium tracking-[0.2em]">
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
      </Reveal>

      <div className="mx-auto max-w-7xl px-6 sm:px-10">
        <div className="grid grid-cols-1 items-start gap-x-16 gap-y-20 lg:grid-cols-2">
          {WORK_CATEGORIES.map((work, i) => (
            <Reveal key={work.slug} delay={(i % 2) * 0.1} y={40}>
              <WorkCard work={work} index={i} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
