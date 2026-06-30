// VizDen content model. Source of truth: vizden-files/VizDen_Website_Architecture.md
// Media (images/video) is delivered via CDN — set the URLs here or via env.
// Keep large video/image files OUT of the repo; reference CDN URLs only.

export type WorkCategory = {
  slug: string;
  title: string;
  kicker: string; // small tracked-caps label, e.g. "AEVUM, NEURAL RENDER"
  concept: string;
  /** CDN loop video URL (muted autoplay). Falls back to poster/gradient. */
  video?: string;
  /** CDN poster image URL. Falls back to a gradient when empty. */
  poster?: string;
  /** Tailwind gradient classes used as a placeholder until media is set. */
  placeholder: string;
};

// Canonical site facts, reused by metadata, structured data and OG images.
export const SITE = {
  name: "VizDen Studios",
  shortName: "VizDen",
  url: "https://www.vizdenstudios.com",
  tagline: "Visions Unleashed",
  description:
    "VizDen Studios is an AI film studio crafting cinematic videos, commercials, brand mini-series and memorial tribute films. Cognitive storytelling for Africa and the world.",
  logo: "https://www.vizdenstudios.com/logos/vizden-logo-white.png",
  locale: "en_US",
  // Social profiles for structured-data `sameAs`. Empty until accounts exist.
  social: [] as string[],
} as const;

// Search terms we want to rank for. Brand + service/category + use-case + reach.
export const SEO_KEYWORDS = [
  "VizDen",
  "VizDen Studios",
  "AI film studio",
  "AI video production",
  "AI movie studio",
  "cinematic AI video",
  "AI commercials",
  "AI advertising",
  "generative video",
  "AI filmmaking",
  "neural rendering",
  "video production studio",
  "creative studio",
  "brand films",
  "brand mini-series",
  "serialized content",
  "episodic content",
  "promotional commercials",
  "product ads",
  "memorial tribute films",
  "legacy films",
  "seasonal campaigns",
  "cultural campaigns",
  "motion graphics",
  "music videos",
  "corporate videos",
  "social media video content",
  "film studio Africa",
  "AI film studio worldwide",
] as const;

// Work-section clips, served from the Cloudflare R2 bucket (custom domain).
const VIDEO_BASE = "https://media.vizdenstudios.com/videos";

// Contact runs through WhatsApp. Number digits only (no + or spaces).
export const WHATSAPP_NUMBER = "233264525811";

export function whatsappUrl(
  message = "Hi VizDen Studios, I'd like to talk about a project.",
): string {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

export const NAV_ITEMS = [
  { label: "Home", href: "#home" },
  { label: "Works", href: "#works" },
  { label: "Philosophy", href: "#philosophy" },
  { label: "Enter the Den", href: "#enter", cta: true },
] as const;

export const HERO_TAGLINES = [
  "VISIONS UNLEASHED",
  "COGNITIVE STORYTELLING",
  "THE CLOUD IS THE STAGE",
] as const;

/** Hero background video, served from the same CDN as the category clips. */
export const HERO_VIDEO_URL = `${VIDEO_BASE}/WEBSITE%20HEADER_3k_720p.mp4`;
/** Poster frame shown before the video loads. Empty = none yet. */
export const HERO_POSTER_URL = "";

export const WORK_CATEGORIES: WorkCategory[] = [
  {
    slug: "aevum-tributes",
    title: "Aevum Tributes",
    kicker: "LEGACY FILMS, NEURAL RENDER",
    concept:
      "Legacy-preservation films. Advanced neural rendering reconstructs the likeness of departed loved ones, visualizing their transition into eternal spheres — personal memory turned into a cinematic sanctuary.",
    video: `${VIDEO_BASE}/Aevum_snippet.mp4`,
    placeholder: "bg-gradient-to-br from-indigo-900 via-violet-800 to-sky-700",
  },
  {
    slug: "episodic-lore",
    title: "Episodic Lore",
    kicker: "AD-CINEMA, SERIALIZED WORLDS",
    concept:
      "Brand building through serialized cinematic worlds. We construct recurring characters and mythological narratives around corporate identities, turning consumers into viewers who wait for the next episode.",
    video: `${VIDEO_BASE}/episodic_snippet.mp4`,
    placeholder: "bg-gradient-to-br from-amber-700 via-orange-800 to-rose-900",
  },
  {
    slug: "kinetic-impact",
    title: "Kinetic Impact",
    kicker: "BRAND COMMERCIALS, HIGH-CONTRAST",
    concept:
      "Laser-focused, visually arresting promotional spots — highly stylized, high-contrast commercials engineered to stop the scrolling finger and embed a product's essence in the subconscious.",
    video: `${VIDEO_BASE}/Kinetic_snippet.mp4`,
    placeholder: "bg-gradient-to-br from-rose-800 via-red-900 to-zinc-900",
  },
  {
    slug: "zeitgeist-campaigns",
    title: "Zeitgeist Campaigns",
    kicker: "CULTURAL, SEASONAL EVENTS",
    concept:
      "Capturing cultural momentum. Narrative experiences that tap into the collective aura of global celebrations and seasons, anchoring your brand to the heart of the event.",
    video: `${VIDEO_BASE}/zeitgeist_snippet.mp4`,
    placeholder: "bg-gradient-to-br from-teal-800 via-slate-700 to-blue-900",
  },
];
