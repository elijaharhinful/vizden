"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { NAV_ITEMS, whatsappUrl } from "@/lib/content";
import { cn } from "@/lib/utils";

const SECTION_IDS = NAV_ITEMS.filter((i) => !("cta" in i && i.cta)).map((i) =>
  i.href.replace("#", ""),
);

export function SiteNav() {
  const [active, setActive] = useState(SECTION_IDS[0]);

  useEffect(() => {
    // Mark a section active once it crosses roughly the middle of the viewport.
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id);
        }
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 },
    );

    for (const id of SECTION_IDS) {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    }
    return () => observer.disconnect();
  }, []);

  return (
    <motion.header
      className="fixed inset-x-0 top-0 z-50"
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-6 sm:px-10">
        <Link href="#home" aria-label="VizDen Studios — home">
          <Image
            src="/logos/vizden-logo-white.png"
            alt="VizDen Studios"
            width={71}
            height={50}
            priority
            className="h-11 w-auto"
          />
        </Link>

        <ul className="hidden items-center gap-9 text-sm md:flex">
          {NAV_ITEMS.filter((i) => !("cta" in i && i.cta)).map((item) => {
            const isActive = active === item.href.replace("#", "");
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={isActive ? "page" : undefined}
                  className={cn(
                    "group relative transition-colors",
                    isActive
                      ? "text-foreground"
                      : "text-foreground/80 hover:text-foreground",
                  )}
                >
                  {item.label}
                  <span
                    className={cn(
                      "absolute -bottom-1.5 left-0 h-px bg-brand transition-all duration-300",
                      isActive ? "w-full" : "w-0 group-hover:w-full",
                    )}
                  />
                </Link>
              </li>
            );
          })}
        </ul>

        <a
          href={whatsappUrl()}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(
            "border border-brand px-5 py-2 text-sm font-medium text-foreground",
            "transition-colors hover:bg-brand hover:text-brand-foreground",
          )}
        >
          Enter the Den
        </a>
      </nav>
    </motion.header>
  );
}
