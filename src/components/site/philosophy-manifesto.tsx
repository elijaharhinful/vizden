"use client";

import { useEffect, useRef } from "react";
import { PHILOSOPHY_CHAPTERS, type PhilosophyChapter } from "@/lib/content";
import { Reveal } from "@/components/motion/reveal";

// Square loop clip that plays only while it is on screen — same bandwidth guard
// as the works grid, so several clips never decode at once.
function ChapterVideo({ chapter }: { chapter: PhilosophyChapter }) {
  const videoRef = useRef<HTMLVideoElement>(null);

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
    <div className="group relative aspect-square overflow-hidden">
      <video
        ref={videoRef}
        src={chapter.video}
        muted
        loop
        playsInline
        preload="metadata"
        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
      />
      {/* Soft corner scrim for depth, matching the works cards. */}
      <div className="pointer-events-none absolute inset-0 bg-linear-to-tr from-black/45 via-transparent to-transparent" />
    </div>
  );
}

function Chapter({ chapter }: { chapter: PhilosophyChapter }) {
  const boxRight = chapter.side === "right";

  return (
    <Reveal className="mx-auto max-w-7xl px-6 sm:px-10">
      <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
        {/* Clip. Order flips at lg+ so the column alternates down the page. */}
        <div className={boxRight ? "lg:order-2" : "lg:order-1"}>
          <ChapterVideo chapter={chapter} />
        </div>

        {/* Passage. */}
        <div className={boxRight ? "lg:order-1" : "lg:order-2"}>
          <p className="flex items-center gap-3 text-[11px] font-medium tracking-[0.3em] text-foreground/60">
            <span className="h-px w-8 bg-brand" />
            {chapter.index}
          </p>
          <h2 className="mt-5 font-display text-3xl font-extrabold leading-[1.05] tracking-tight sm:text-4xl lg:text-5xl">
            {chapter.title}
          </h2>
          <p className="mt-6 font-display text-base leading-relaxed text-foreground/80 sm:text-lg">
            {chapter.body}
          </p>

          {chapter.coda ? (
            <p className="mt-8 font-display text-2xl font-bold leading-tight sm:text-3xl">
              {chapter.coda[0]}
              <br />
              <span className="text-brand">{chapter.coda[1]}</span>
            </p>
          ) : null}
        </div>
      </div>
    </Reveal>
  );
}

export function PhilosophyManifesto() {
  return (
    <section id="philosophy" className="relative bg-black py-28 sm:py-36">
      {/* Ghosted watermark, echoing the works and homepage section headers. */}
      <p
        aria-hidden
        className="pointer-events-none mb-20 select-none px-6 text-center font-display text-4xl font-extrabold tracking-tight text-foreground/10 sm:text-8xl lg:text-9xl"
      >
        Philosophy
      </p>

      <div className="space-y-28 sm:space-y-36">
        {PHILOSOPHY_CHAPTERS.map((chapter) => (
          <Chapter key={chapter.id} chapter={chapter} />
        ))}
      </div>
    </section>
  );
}
