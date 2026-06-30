"use client";

import Image from "next/image";
import { useReducedMotion } from "motion/react";

export function AnimatedLogo() {
  const reduce = useReducedMotion();

  if (reduce) {
    return (
      <Image
        src="/logos/vizden-logo-white.png"
        alt="VizDen Studios - Domitique"
        width={141}
        height={100}
        className="sm:h-60 h-50 w-auto"
      />
    );
  }

  return (
    <video
      aria-label="VizDen Studios - Domitique"
      autoPlay
      muted
      loop
      playsInline
      poster="/logos/vizden-logo-white.png"
      src="/animations/vizden-logo-font.webm"
      className="sm:h-60 h-50 w-auto"
    />
  );
}
