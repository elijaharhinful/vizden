import { HERO_TAGLINES, HERO_VIDEO_URL, HERO_POSTER_URL } from "@/lib/content";

export function Hero() {
  return (
    <section
      id="home"
      className="relative flex min-h-screen items-center overflow-hidden bg-black"
    >
      {/* Background: cinematic loop served from CDN. Poster shows until it loads,
          and is the sole frame when no video URL is configured. */}
      {HERO_VIDEO_URL ? (
        <video
          className="absolute inset-0 h-full w-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          poster={HERO_POSTER_URL || undefined}
          src={HERO_VIDEO_URL}
        />
      ) : (
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: HERO_POSTER_URL
              ? `url(${HERO_POSTER_URL})`
              : "radial-gradient(120% 120% at 75% 30%, #2a2533 0%, #000 60%)",
          }}
        />
      )}

      {/* Legibility overlays: darken left for text, vignette the edges. */}
      <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/40" />

      <div className="relative mx-auto w-full max-w-7xl px-6 sm:px-10">
        <p className="mb-6 font-display text-xs font-semibold tracking-[0.35em] text-foreground/70">
          VIZDEN STUDIO
        </p>
        <h1 className="font-display text-6xl font-extrabold leading-[0.92] tracking-tight sm:text-7xl md:text-8xl lg:text-9xl">
          Visions
          <br />
          Unleashed
        </h1>

        <div className="mt-8 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs font-medium tracking-[0.25em] text-foreground/70 sm:text-sm">
          {HERO_TAGLINES.map((line, i) => (
            <span key={line} className="flex items-center gap-4">
              {i > 0 && <span className="text-brand">/</span>}
              {line}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
