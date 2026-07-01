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

// A film as consumed by the /works screening room: always a playable full URL,
// tagged with the WorkCategory slug it belongs to.
export type WorkFilm = {
  slug: string;
  title: string;
  category: string; // a WorkCategory slug
  concept: string;
  video: string;
  poster?: string;
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
// Full-length films live under portfolio/videos in the same bucket.
const FULL_VIDEO_BASE = "https://media.vizdenstudios.com/portfolio/videos";

// Contact runs through WhatsApp. Number digits only (no + or spaces).
export const WHATSAPP_NUMBER = "233264525811";

export function whatsappUrl(
  message = "Hi VizDen Studios, I'd like to talk about a project.",
): string {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

// Root-absolute hrefs so hash links work from any route (e.g. the /works page),
// and "Works" navigates to its dedicated screening-room page.
export const NAV_ITEMS = [
  { label: "Home", href: "/#home" },
  { label: "Works", href: "/works" },
  { label: "Philosophy", href: "/philosophy" },
  { label: "Enter the Den", href: "/#enter", cta: true },
] as const;

export const HERO_TAGLINES = [
  "VISIONS UNLEASHED",
  "COGNITIVE STORYTELLING",
  "THE CLOUD IS THE STAGE",
] as const;

/** Hero background video */
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

// The /works screening-room catalogue: every full-length film, each tagged with
// its WorkCategory. Ordered so one flagship per category leads (a homepage
// /works?v=<category-slug> link resolves to that category's headline film),
// then the remaining catalogue.
export const WORKS_PLAYLIST: WorkFilm[] = [
  {
    slug: "farewell",
    title: "Farewell",
    category: "aevum-tributes",
    concept:
      "A legacy-preservation film. Neural rendering reconstructs a departed loved one and visualizes their transition into eternal spheres — personal memory turned into a cinematic sanctuary.",
    video: `${FULL_VIDEO_BASE}/Farewell.mp4`,
    placeholder: "bg-gradient-to-br from-indigo-900 via-violet-800 to-sky-700",
  },
  {
    slug: "mtn-episode-1",
    title: "MTN Episode 1",
    category: "episodic-lore",
    concept:
      "Serialized ad-cinema for a telecom giant. Recurring characters and an unfolding narrative turn a brand campaign into a story viewers wait to continue.",
    video: `${FULL_VIDEO_BASE}/MTN.mp4`,
    placeholder: "bg-gradient-to-br from-amber-700 via-orange-800 to-rose-900",
  },
  {
    slug: "drager",
    title: "Drager",
    category: "kinetic-impact",
    concept:
      "A one-off, high-contrast commercial engineered to stop the scrolling finger and embed a product's essence in the subconscious in a single arresting spot.",
    video: `${FULL_VIDEO_BASE}/DRAGER.mp4`,
    placeholder: "bg-gradient-to-br from-rose-800 via-red-900 to-zinc-900",
  },
  {
    slug: "enterprise-football",
    title: "Enterprise Football",
    category: "zeitgeist-campaigns",
    concept:
      "Riding the collective aura of the beautiful game. A narrative experience that anchors a brand to the roar of the stands and the heartbeat of the season.",
    video: `${FULL_VIDEO_BASE}/ENTERPRISE%20FOOTBALL.mp4`,
    placeholder: "bg-gradient-to-br from-teal-800 via-slate-700 to-blue-900",
  },
  {
    slug: "fan-ice-episode-1",
    title: "Fan Ice Episode 1",
    category: "episodic-lore",
    concept:
      "A frozen-dairy series pitched at melting point. Condensation, colour and craving rendered in slow, sculptural detail until the last frame leaves you reaching for the freezer.",
    video: `${FULL_VIDEO_BASE}/FANICE.mp4`,
    placeholder: "bg-gradient-to-br from-sky-700 via-cyan-800 to-indigo-900",
  },
  {
    slug: "ideal",
    title: "Ideal",
    category: "kinetic-impact",
    concept:
      "Product worship reduced to its cleanest gesture. High-contrast light, deliberate motion and a single promise held on screen long enough to become memory.",
    video: `${FULL_VIDEO_BASE}/IDEAL.mp4`,
    placeholder: "bg-gradient-to-br from-zinc-700 via-slate-800 to-neutral-900",
  },
  {
    slug: "polish",
    title: "Polish",
    category: "kinetic-impact",
    concept:
      "A study in surface and gloss. Reflections bend around the product as the camera glides, turning an everyday finish into something worth staring at.",
    video: `${FULL_VIDEO_BASE}/Ipolish.mp4`,
    placeholder: "bg-gradient-to-br from-fuchsia-800 via-purple-900 to-zinc-900",
  },
  {
    slug: "cowbell",
    title: "Cowbell",
    category: "kinetic-impact",
    concept:
      "Warm, familiar, golden. A household staple framed as a small daily ritual, the kind of comfort a whole nation grew up on, dramatised in a single pour.",
    video: `${FULL_VIDEO_BASE}/cowbell.mp4`,
    placeholder: "bg-gradient-to-br from-amber-600 via-orange-700 to-yellow-900",
  },
  {
    slug: "wumple",
    title: "Wumple",
    category: "kinetic-impact",
    concept:
      "An experiment in rhythm and shape. Playful, kinetic and unbound by a brief, built to prove how far generative motion can push a single idea.",
    video: `${FULL_VIDEO_BASE}/wumple.mp4`,
    placeholder: "bg-gradient-to-br from-rose-700 via-pink-800 to-violet-900",
  },
  {
    slug: "gcb-world-cup",
    title: "GCB World Cup",
    category: "zeitgeist-campaigns",
    concept:
      "Anchoring a bank to the fever of the world's biggest tournament. National pride, roaring stands and a brand woven into the collective heartbeat of the season.",
    video: `${FULL_VIDEO_BASE}/GCB_worldcup.mp4`,
    placeholder: "bg-gradient-to-br from-emerald-800 via-yellow-700 to-red-900",
  },
];

// Display label for a WorkFilm's category. Falls back to the raw slug.
export function workCategoryTitle(slug: string): string {
  return WORK_CATEGORIES.find((c) => c.slug === slug)?.title ?? slug;
}

// Philosophy page chapters.
export type PhilosophyChapter = {
  id: string;
  index: string; // tracked numeral eyebrow, e.g. "01"
  title: string;
  body: string;
  video: string;
  side: "left" | "right";
  /** Closing lines rendered under the last chapter's passage. */
  coda?: string[];
};

export const PHILOSOPHY_CHAPTERS: PhilosophyChapter[] = [
  {
    id: "the-great-domestication",
    index: "01",
    title: "The Great Domestication",
    body: "Ideas are not born equal. Some are born as harmless bunnies; small, safe, and easily handled. Others are primal tempests, raging dragons! For a century, legacy filmmaking made it impossible for the average creator to subdue the predators. These boisterous, dangerous ideas couldn’t simply be put behind bars or turned off. Instead, they remained trapped, untamed, and burning to make it to the big screen, locked in an intangible section of the creative mind. No one dared to unlock them because without a studio backing you with millions of dollars, you had no way to tame them once unleashed. The old system forced artists to starve their creative rage, policing their own minds to only play with the safe, quiet bunnies they could actually afford to feed. No more.",
    video: `${VIDEO_BASE}/1.%20the%20great%20dom.mp4`,
    side: "left",
  },
  {
    id: "the-revolution",
    index: "02",
    title: "The Revolution",
    body: "The confinements of capital, time, and physical labor have been dissolved. By putting decentralized cloud networks and cutting-edge visual AI at the absolute center of our workflow, VizDen Studio has shattered the barrier to producing tangible ideas. What used to demand a hundred-man crew and a disastrous corporate budget is now conquered by a bunch of storytellers, digital artists, and keyboards. It is a win for imagination. We have ascended.",
    video: `${VIDEO_BASE}/2.%20THe%20revolution.mp4`,
    side: "right",
  },
  {
    id: "enter-the-den",
    index: "03",
    title: "Enter the Den",
    body: "This is our home now. We have reclaimed our sovereignty. The monstrous concepts that once terrified the independent dreamer - for fear of budgets, time, and labor - are the very ones we now espouse. We don’t just handle these wild beasts; we tame them, pet them, and ride them victoriously to the screen.",
    video: `${VIDEO_BASE}/3.riding_the_lion.mp4`,
    side: "left",
    coda: ["We are VizDen Studios.", "We ride the lion."],
  },
];
