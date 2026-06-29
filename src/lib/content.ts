// VizDen content model. Source of truth: vizden-files/VizDen_Website_Architecture.md
// Media (images/video) is delivered via CDN — set the URLs here or via env.
// Keep large video/image files OUT of the repo; reference CDN URLs only.

export type WorkCategory = {
  slug: string;
  title: string;
  kicker: string; // small tracked-caps label, e.g. "AEVUM, NEURAL RENDER"
  concept: string;
  /** CDN poster image URL. Falls back to a gradient when empty. */
  poster?: string;
  /** Tailwind gradient classes used as a placeholder until a poster is set. */
  placeholder: string;
};

// Contact runs through WhatsApp. Number digits only (no + or spaces).
export const WHATSAPP_NUMBER = "233264525811";

export function whatsappUrl(
  message = "Hi VizDen Studio, I'd like to talk about a project.",
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

/** Hero background video, served from a CDN (see .env.example). */
export const HERO_VIDEO_URL = process.env.NEXT_PUBLIC_HERO_VIDEO_URL ?? "";
export const HERO_POSTER_URL = process.env.NEXT_PUBLIC_HERO_POSTER_URL ?? "";

export const WORK_CATEGORIES: WorkCategory[] = [
  {
    slug: "aevum-tributes",
    title: "Aevum Tributes",
    kicker: "LEGACY FILMS, NEURAL RENDER",
    concept:
      "Legacy-preservation films. Advanced neural rendering reconstructs the likeness of departed loved ones, visualizing their transition into eternal spheres — personal memory turned into a cinematic sanctuary.",
    placeholder: "bg-gradient-to-br from-indigo-900 via-violet-800 to-sky-700",
  },
  {
    slug: "episodic-lore",
    title: "Episodic Lore",
    kicker: "AD-CINEMA, SERIALIZED WORLDS",
    concept:
      "Brand building through serialized cinematic worlds. We construct recurring characters and mythological narratives around corporate identities, turning consumers into viewers who wait for the next episode.",
    placeholder: "bg-gradient-to-br from-amber-700 via-orange-800 to-rose-900",
  },
  {
    slug: "kinetic-impact",
    title: "Kinetic Impact",
    kicker: "BRAND COMMERCIALS, HIGH-CONTRAST",
    concept:
      "Laser-focused, visually arresting promotional spots — highly stylized, high-contrast commercials engineered to stop the scrolling finger and embed a product's essence in the subconscious.",
    placeholder: "bg-gradient-to-br from-rose-800 via-red-900 to-zinc-900",
  },
  {
    slug: "zeitgeist-campaigns",
    title: "Zeitgeist Campaigns",
    kicker: "CULTURAL, SEASONAL EVENTS",
    concept:
      "Capturing cultural momentum. Narrative experiences that tap into the collective aura of global celebrations and seasons, anchoring your brand to the heart of the event.",
    placeholder: "bg-gradient-to-br from-teal-800 via-slate-700 to-blue-900",
  },
];
