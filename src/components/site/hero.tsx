"use client";

import { motion, useReducedMotion, type Variants } from "motion/react";
import { HERO_TAGLINES, HERO_VIDEO_URL, HERO_POSTER_URL } from "@/lib/content";

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.15 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
  },
};

export function Hero() {
  const reduce = useReducedMotion();

  return (
    <section
      id="home"
      className="relative flex min-h-screen items-center overflow-hidden bg-black"
    >
      {/* Background: cinematic loop served from CDN. Poster shows until it loads,
          and is the sole frame when no video URL is configured. */}
      {HERO_VIDEO_URL ? (
        <motion.video
          className="absolute inset-0 h-full w-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          poster={HERO_POSTER_URL || undefined}
          src={HERO_VIDEO_URL}
          initial={reduce ? false : { scale: 1.08, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
        />
      ) : (
        <motion.div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: HERO_POSTER_URL
              ? `url(${HERO_POSTER_URL})`
              : "radial-gradient(120% 120% at 75% 30%, #2a2533 0%, #000 60%)",
          }}
          initial={reduce ? false : { scale: 1.08, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
        />
      )}

      {/* Legibility overlays: darken left for text, vignette the edges. */}
      <div className="absolute inset-0 bg-linear-to-r from-black via-black/70 to-transparent" />
      <div className="absolute inset-0 bg-linear-to-t from-black via-transparent to-black/40" />

      {!reduce && (
        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-28 overflow-hidden">
          <motion.div
            className="absolute bottom-0"
            initial={{ x: "-20vw" }}
            animate={{ x: "110vw" }}
            transition={{ repeat: Infinity, ease: "linear", duration: 10 }}
          >
            <video
              autoPlay
              muted
              loop
              playsInline
              src="/animations/no-bg-lion.webm"
              className="h-28 w-auto"
            />
          </motion.div>
        </div>
      )}

      <motion.div
        className="relative mx-auto w-full max-w-7xl px-6 sm:px-10"
        variants={container}
        initial="hidden"
        animate="show"
      >
        <h1 className="font-display text-6xl font-extrabold leading-[0.92] tracking-tight sm:text-7xl md:text-8xl lg:text-9xl">
          <motion.span variants={item} className="block">
            Vizden
          </motion.span>
          <motion.span variants={item} className="block">
            Studios
          </motion.span>
        </h1>

        {/* Crawler/screen-reader supporting copy — keeps the visual hero minimal
            while giving search engines real, keyword-relevant text. */}
        <p className="sr-only">
          VizDen Studios is an AI film studio producing cinematic AI videos,
          commercials, brand mini-series, serialized ad-cinema and memorial
          tribute films. We blend generative video, neural rendering and
          cognitive storytelling for brands across Africa and worldwide.
        </p>

        <motion.div
          variants={item}
          className="mt-8 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs font-medium tracking-[0.25em] text-foreground/70 sm:text-sm"
        >
          {HERO_TAGLINES.map((line, i) => (
            <span key={line} className="flex items-center gap-4">
              {i > 0 && <span className="text-brand">/</span>}
              {line}
            </span>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
