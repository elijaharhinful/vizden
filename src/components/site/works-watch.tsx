"use client";

import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { ThumbsUp, Share2, Check, Play } from "lucide-react";
import { WORK_CATEGORIES, whatsappUrl, type WorkCategory } from "@/lib/content";
import { Reveal } from "@/components/motion/reveal";
import { cn } from "@/lib/utils";

const SHARE_TEXT = "Watch the VizDen Studios works.";

function Thumbnail({ work }: { work: WorkCategory }) {
  return (
    <div className="relative aspect-video w-full overflow-hidden rounded-lg">
      {work.poster ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={work.poster}
          alt={work.title}
          className="h-full w-full object-cover"
        />
      ) : (
        <div className={cn("h-full w-full", work.placeholder)} />
      )}
      <div className="absolute inset-0 bg-linear-to-t from-black/45 to-transparent" />
      <span className="absolute bottom-2 right-2 grid size-7 place-items-center rounded-full bg-black/60 text-foreground backdrop-blur">
        <Play className="size-3.5 fill-current" />
      </span>
    </div>
  );
}

export function WorksWatch() {
  // The active clip is driven by /works?v=<slug> (set by the homepage cards and
  // the rail), so it is shareable and the back button works.
  const searchParams = useSearchParams();
  const router = useRouter();
  const requested = searchParams.get("v");
  const activeSlug =
    requested && WORK_CATEGORIES.some((w) => w.slug === requested)
      ? requested
      : WORK_CATEGORIES[0].slug;

  const [expanded, setExpanded] = useState(false);
  const [copied, setCopied] = useState(false);

  const active =
    WORK_CATEGORIES.find((w) => w.slug === activeSlug) ?? WORK_CATEGORIES[0];
  const queue = WORK_CATEGORIES.filter((w) => w.slug !== active.slug);

  function selectWork(slug: string) {
    router.push(`/works?v=${slug}`, { scroll: false });
    setExpanded(false);
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }

  async function share() {
    const url =
      typeof window !== "undefined" ? window.location.href : "https://www.vizdenstudios.com/works";
    const message = `${active.title} — ${SHARE_TEXT}`;
    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share({ title: active.title, text: message, url });
        return;
      } catch {
        // user dismissed the native sheet; fall through to clipboard
      }
    }
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      try {
        await navigator.clipboard.writeText(url);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch {
        // clipboard blocked; nothing else to do
      }
    }
  }

  // Repurposed action pills: YouTube shape, real VizDen intents (WhatsApp).
  const pillClass =
    "inline-flex items-center gap-2 rounded-full bg-secondary px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-brand hover:text-brand-foreground";

  return (
    <section className="mx-auto w-full max-w-[1600px] px-4 pt-28 pb-24 sm:px-6 lg:px-10">
      <Reveal className="grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,1fr)_400px]">
        {/* Main column: player + meta */}
        <div className="min-w-0">
          <div className="relative aspect-video w-full overflow-hidden rounded-xl bg-black">
            <video
              key={active.slug}
              src={active.video}
              poster={active.poster}
              autoPlay
              muted
              loop
              playsInline
              controls
              preload="metadata"
              className="h-full w-full object-cover"
            />
          </div>

          <h1 className="mt-5 font-display text-2xl font-bold leading-tight sm:text-3xl">
            {active.title}
          </h1>

          {/* Channel + action row */}
          <div className="mt-4 flex flex-col gap-4 border-b border-border pb-5 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-center gap-3">
              <span className="grid size-11 shrink-0 place-items-center overflow-hidden rounded-full bg-secondary">
                <Image
                  src="/logos/vizden-logo-white.png"
                  alt="VizDen Studios"
                  width={44}
                  height={44}
                  className="h-7 w-auto"
                />
              </span>
              <div className="min-w-0">
                <p className="font-display text-sm font-bold">VizDen Studios</p>
                <p className="text-xs text-foreground/55">AI Film Studio</p>
              </div>
              <a
                href={whatsappUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="ml-3 inline-flex items-center rounded-full bg-brand px-5 py-2 text-sm font-semibold text-brand-foreground transition-opacity hover:opacity-90"
              >
                Enter the Den
              </a>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <a
                href={whatsappUrl(`I love "${active.title}". Let's create something like it.`)}
                target="_blank"
                rel="noopener noreferrer"
                className={pillClass}
              >
                <ThumbsUp className="size-4" />
                Like
              </a>
              <button type="button" onClick={share} className={pillClass}>
                {copied ? <Check className="size-4" /> : <Share2 className="size-4" />}
                {copied ? "Copied" : "Share"}
              </button>
            </div>
          </div>

          {/* Description box (YouTube meta panel) */}
          <div className="mt-4 rounded-xl bg-secondary/60 p-4 text-sm">
            <p className="flex items-center gap-3 text-xs font-medium tracking-[0.18em] text-foreground/70">
              <span className="h-px w-6 bg-brand" />
              {active.kicker}
            </p>
            <p
              className={cn(
                "mt-3 leading-relaxed text-foreground/85",
                !expanded && "line-clamp-2",
              )}
            >
              {active.concept}
            </p>
            <button
              type="button"
              onClick={() => setExpanded((v) => !v)}
              className="mt-2 text-xs font-semibold tracking-wide text-foreground/60 hover:text-foreground"
            >
              {expanded ? "Show less" : "...more"}
            </button>
          </div>
        </div>

        {/* Right rail: up-next recommendations */}
        <aside className="min-w-0">
          <p className="mb-4 font-display text-xs font-semibold tracking-[0.3em] text-foreground/55">
            UP NEXT
          </p>
          <ul className="flex flex-col gap-4">
            {queue.map((work) => (
              <li key={work.slug}>
                <button
                  type="button"
                  onClick={() => selectWork(work.slug)}
                  className="group flex w-full gap-3 text-left"
                >
                  <div className="w-40 shrink-0 sm:w-44">
                    <Thumbnail work={work} />
                  </div>
                  <div className="min-w-0 pt-0.5">
                    <p className="font-display text-sm font-semibold leading-snug text-foreground transition-colors group-hover:text-brand">
                      {work.title}
                    </p>
                    <p className="mt-1 text-xs text-foreground/55">
                      VizDen Studios
                    </p>
                    <p className="mt-0.5 truncate text-[11px] tracking-[0.14em] text-foreground/40">
                      {work.kicker}
                    </p>
                  </div>
                </button>
              </li>
            ))}
          </ul>
        </aside>
      </Reveal>
    </section>
  );
}
