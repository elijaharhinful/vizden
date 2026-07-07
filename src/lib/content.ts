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
// Poster/thumbnail images for the films live under portfolio/images.
const POSTER_BASE = "https://media.vizdenstudios.com/portfolio/images";

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
    poster: `${POSTER_BASE}/farewell.jpeg`,
    placeholder: "bg-gradient-to-br from-indigo-900 via-violet-800 to-sky-700",
  },
  {
    slug: "mtn-mama-calls-ep-1",
    title: "MTN: Mama Calls Ep. 1",
    category: "episodic-lore",
    concept:
      "An MTN network engineer is stationed on the moon, holding the signal against an alien siege, when his mother phones mid-battle with a request that could not wait. Episode one of a running comedy where mama always calls at the worst possible moment, sometimes wrecking the mission, sometimes accidentally saving it.",
    video: `${FULL_VIDEO_BASE}/MTN.mp4`,
    poster: `${POSTER_BASE}/mtn_ep_1.jpeg`,
    placeholder: "bg-gradient-to-br from-amber-700 via-orange-800 to-rose-900",
  },
  {
    slug: "drager-and-gas-detection",
    title: " Drager (Gas detection) : When Fishes fart",
    category: "kinetic-impact",
    concept:
      "It all begins with a fart, and ends somewhere far more serious. This is advertising as sleight of hand, disarming you with the ridiculous before revealing the invisible threats that decide who lives and who does not. Every beat is deliberate, every laugh a setup, positioning Dräger as the guardian the world's most critical industries trust.",
    video: `${FULL_VIDEO_BASE}/DRAGER.mp4`,
    poster: `${POSTER_BASE}/drager.jpeg`,
    placeholder: "bg-gradient-to-br from-rose-800 via-red-900 to-zinc-900",
  },
  {
    slug: "enterprise-insurance-world-cup",
    title: "Enterprise Home Insurance (World Cup 2026 season)",
    category: "zeitgeist-campaigns",
    concept:
      "One shot, and the ball exits the atmosphere. While the world watches it re-enter for the winner, Enterprise makes its case for what stays earthbound, your home and your car, covered through every roar of the season. Spectacle above, security beneath. Enterprise. Your advantage.",
    video: `${FULL_VIDEO_BASE}/ENTERPRISE%20FOOTBALL.mp4`,
    poster: `${POSTER_BASE}/enterprise_football.jpeg`,
    placeholder: "bg-gradient-to-br from-teal-800 via-slate-700 to-blue-900",
  },
  {
    slug: "fan-ice-iceream-zombies",
    title: "Fanice: Ice cream & Zombies",
    category: "episodic-lore",
    concept:
      "A campfire, wide-eyed kids, and Uncle David's origin story: the night FanIce saved his life. A midnight raid on the freezer turns to horror when a zombie crawls out of the TV screen, and the only weapon in reach is a tub of ice cream. A brand claim dressed as folklore: some cravings even the dead cannot resist.",
    video: `${FULL_VIDEO_BASE}/FANICE.mp4`,
    poster: `${POSTER_BASE}/fanice.jpeg`,
    placeholder: "bg-gradient-to-br from-sky-700 via-cyan-800 to-indigo-900",
  },
  {
    slug: "ideal-milk-creamy-heist",
    title: "Ideal Milk : Creamy Heist",
    category: "kinetic-impact",
    concept:
      "A squad of ants runs a military-grade heist on a can of Ideal Milk, only for the mission to stall mid-lift. The tin is heavier than the intel promised: same konko(tin), more milk inside. What plays as slapstick is really a product claim in disguise, the extra grams so real it takes reinforcements to carry them off. Ideal Milk.",
    video: `${FULL_VIDEO_BASE}/IDEAL.mp4`,
    poster: `${POSTER_BASE}/ideal.jpeg`,
    placeholder: "bg-gradient-to-br from-zinc-700 via-slate-800 to-neutral-900",
  },
  {
    slug: "ipolish",
    title: "iPolish",
    category: "kinetic-impact",
    concept:
      "It is not magic, it is the newest tech in town. One wand, over 300 colours, zero mess, replacing the hundred bottles that once buried her. A woman drowning in clutter falls, and lands somewhere lighter, a world where any shade meets any mood in an instant and every restriction of old nail care is stripped away. Prison walls of expression torn down. Trapped? No more.",
    video: `${FULL_VIDEO_BASE}/Ipolish.mp4`,
    poster: `${POSTER_BASE}/polish.jpeg`,
    placeholder: "bg-gradient-to-br from-fuchsia-800 via-purple-900 to-zinc-900",
  },
  {
    slug: "cowbell-daddy",
    title: "Cowbell: Daddy!!!",
    category: "kinetic-impact",
    concept:
      "A father who has loved Cowbell since he was his daughter's age cannot resist embellishing why, stacking one Superman-style childhood feat on another until mum grounds the whole thing in a bowl of fruit salad and milk. The tall tales are the fun; the nutrition is the promise. Cowbell framed as a family tradition that feeds both the imagination and the child.",
    video: `${FULL_VIDEO_BASE}/cowbell.mp4`,
    poster: `${POSTER_BASE}/cowbell.jpeg`,
    placeholder: "bg-gradient-to-br from-amber-600 via-orange-700 to-yellow-900",
  },
  {
    slug: "wumple",
    title: "Wumple",
    category: "kinetic-impact",
    concept:
      "One fine mist over a bowl of popcorn, and a woman and her dogs lift clean off the ground. The floating is the pitch: Wumple adds an out-of-this-world flavor with none of the grease or weight of melted butter, triggering a total detachment from the real world and launching the snacker into the heights of sensory ecstasy. A hero-product spot where control, zero mess, and even coverage make flavor feel like pure magic. Others snack, some wumple.",
    video: `${FULL_VIDEO_BASE}/wumple.mp4`,
    poster: `${POSTER_BASE}/wumple.jpeg`,
    placeholder: "bg-gradient-to-br from-rose-700 via-pink-800 to-violet-900",
  },
  {
    slug: "gcb-ghana-world-cup",
    title: "Support for Ghana Black Stars (World Cup 2026 - GCB Bank)",
    category: "zeitgeist-campaigns",
    concept:
      "Anchoring a bank to the fever of the world's biggest tournament. National pride, roaring stands and a brand woven into the collective heartbeat of the season.",
    video: `${FULL_VIDEO_BASE}/GCB_worldcup.mp4`,
    poster: `${POSTER_BASE}/gcb_world_cup.jpeg`,
    placeholder: "bg-gradient-to-br from-emerald-800 via-yellow-700 to-red-900",
  },
  {
    slug: "gcb-fraud-awareness",
    title: "GCB Fraud Awareness",
    category: "episodic-lore",
    concept:
      "A serialized cautionary tale for a bank. An unfolding story dramatises the anatomy of a scam, turning fraud awareness into episodic drama customers actually watch.",
    video: `${FULL_VIDEO_BASE}/GCB_FRAUD_40k.mp4`,
    poster: `${POSTER_BASE}/gcb_fraud.jpeg`,
    placeholder: "bg-gradient-to-br from-emerald-900 via-slate-800 to-zinc-900",
  },
  {
    slug: "enterprise-insurance-heros-dawn",
    title: "Enterprise Insurance : Hero's Dawn",
    category: "episodic-lore",
    concept:
      "A superhero rises for an insurance brand. When a vehicle full of commuters slips toward the edge of a collapsing suspension bridge, Mr Enterprise catches them mid-fall. Coverage rendered as mythology: the promise that someone is always there to break your worst landing.",
    video: `${FULL_VIDEO_BASE}/Mr%20Enterprise_FULL.mp4`,
    poster: `${POSTER_BASE}/mr_enterprise.jpeg`,
    placeholder: "bg-gradient-to-br from-sky-800 via-blue-900 to-red-900",
  },
  {
    slug: "enterprise-insurance-eto-wo-a-da-part-1",
    title: "Enterprise Insurance : If it happens, chill! - Part 1",
    category: "episodic-lore",
    concept:
      "DJ E takes to Enterprise Blue FM with a dare: name the calmest person in Ghana after the floods swallowed everything. Every caller lands on Mansa, serene on her balcony with a cup of tea while brown water drowns her home and her car below. She will not flinch. Everything is under control. The reveal is punchline and promise at once, Enterprise agents already wading through her living room, already inspecting the car, already turning catastrophe into paperwork. Eto wo a, da. If it happens, chill. Insurance sold not as a hedge against ruin but as the licence to stay unbothered while your world goes under. Your advantage. Part one.",
    video: `${FULL_VIDEO_BASE}/ENTERPRISE_FULL_ETO_WO_AA_DA.mp4`,
    poster: `${POSTER_BASE}/ENTERPRISE_FULL_ETO_WO_AA_DA.jpeg`,
    placeholder: "bg-gradient-to-br from-amber-900 via-slate-800 to-blue-900",
  },
  {
    slug: "enterprise-insurance-digital-escape",
    title: "Enterprise Insurance : The Digital Escape",
    category: "kinetic-impact",
    concept:
      "Sweat beads at a police checkpoint. A driver's windscreen is missing a valid insurance sticker and the officer is already walking over. Then it clicks: Enterprise renews your vehicle cover in seconds, right inside the mobile app. Panic dissolves into a tap, and the barrier lifts. A high-contrast spot that turns a moment of dread into the cleanest possible proof of a promise kept.",
    video: `${FULL_VIDEO_BASE}/POLICE_AFFAIR_ENTERPRISE.mp4`,
    poster: `${POSTER_BASE}/police_affairs_enterprise.jpeg`,
    placeholder: "bg-gradient-to-br from-blue-800 via-slate-900 to-zinc-900",
  },
  {
    slug: "acacia-health-edencare-campaign",
    title: "Acacia Health EdenCare campaign",
    category: "kinetic-impact",
    concept:
      "A one-off, high-contrast spot for a health insurance brand. Warmth and clinical precision meet in a single arresting commercial built to embed the promise of care.",
    video: `${FULL_VIDEO_BASE}/ACACIA%20EDENCARE_60k.mp4`,
    poster: `${POSTER_BASE}/edencare.jpeg`,
    placeholder: "bg-gradient-to-br from-emerald-700 via-teal-800 to-slate-900",
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
