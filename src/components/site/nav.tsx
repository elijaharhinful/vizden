"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Menu, X } from "lucide-react";
import { NAV_ITEMS, whatsappUrl } from "@/lib/content";
import { cn } from "@/lib/utils";

// Hash nav items only (Works is now a real route, not a section). Ids are the
// part after the "#", e.g. "/#home" -> "home".
const SECTION_IDS = NAV_ITEMS.filter(
  (i) => !("cta" in i && i.cta) && i.href.includes("#"),
).map((i) => i.href.split("#")[1]);

export function SiteNav() {
  const pathname = usePathname();
  const [active, setActive] = useState(SECTION_IDS[0]);
  const [menuOpen, setMenuOpen] = useState(false);

  // Lock body scroll and allow Esc to close while the mobile menu is open.
  useEffect(() => {
    if (!menuOpen) return;
    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = overflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [menuOpen]);

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
        <Link href="/#home" aria-label="VizDen Studios — home">
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
            // Hash links are active via scroll-spy on the homepage; route links
            // (Works) are active when the pathname matches.
            const sectionId = item.href.includes("#")
              ? item.href.split("#")[1]
              : null;
            const isActive = sectionId
              ? pathname === "/" && active === sectionId
              : pathname === item.href;
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
            "hidden border border-brand px-5 py-2 text-sm font-medium text-foreground md:inline-block",
            "transition-colors hover:bg-brand hover:text-brand-foreground",
          )}
        >
          Enter the Den
        </a>

        <button
          type="button"
          onClick={() => setMenuOpen(true)}
          aria-label="Open menu"
          aria-expanded={menuOpen}
          className="text-foreground/90 transition-colors hover:text-foreground md:hidden"
        >
          <Menu className="h-6 w-6" />
        </button>
      </nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed inset-0 z-50 flex flex-col bg-background/95 backdrop-blur-md md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <div className="flex items-center justify-between px-6 py-6">
              <Link
                href="/#home"
                aria-label="VizDen Studios — home"
                onClick={() => setMenuOpen(false)}
              >
                <Image
                  src="/logos/vizden-logo-white.png"
                  alt="VizDen Studios"
                  width={71}
                  height={50}
                  className="h-11 w-auto"
                />
              </Link>
              <button
                type="button"
                onClick={() => setMenuOpen(false)}
                aria-label="Close menu"
                className="text-foreground/90 transition-colors hover:text-foreground"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <nav className="flex flex-1 flex-col items-center justify-center gap-8">
              {NAV_ITEMS.filter((i) => !("cta" in i && i.cta)).map((item) => {
                const sectionId = item.href.includes("#")
                  ? item.href.split("#")[1]
                  : null;
                const isActive = sectionId
                  ? pathname === "/" && active === sectionId
                  : pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMenuOpen(false)}
                    aria-current={isActive ? "page" : undefined}
                    className={cn(
                      "text-2xl font-medium transition-colors",
                      isActive
                        ? "text-foreground"
                        : "text-foreground/70 hover:text-foreground",
                    )}
                  >
                    {item.label}
                  </Link>
                );
              })}

              <a
                href={whatsappUrl()}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMenuOpen(false)}
                className={cn(
                  "mt-4 border border-brand px-7 py-3 text-base font-medium text-foreground",
                  "transition-colors hover:bg-brand hover:text-brand-foreground",
                )}
              >
                Enter the Den
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
