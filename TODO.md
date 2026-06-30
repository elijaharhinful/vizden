# VizDen Studios — TODO / Roadmap

## SEO

- [ ] **Per-category `/works/[slug]` detail pages** (Aevum Tributes, Episodic Lore,
      Kinetic Impact, Zeitgeist Campaigns) — **biggest next SEO lever.** The site is a
      single thin page; detail pages:
  - turn the EXPLORE buttons (`src/components/site/works-grid.tsx`) into real internal
    `<Link>`s instead of dead `<button>`s,
  - add 4 more indexable pages with unique, keyword-rich content,
  - each get their own `generateMetadata` (title/description/OG) and go into
    `src/app/sitemap.ts`.
  Reuse `WORK_CATEGORIES` from `src/lib/content.ts`.

- [ ] After deploy: Google Search Console — verify domain (DNS TXT via Cloudflare),
      submit `sitemap.xml`, Request Indexing for the homepage. Optionally fill
      `verification.google` in `src/app/layout.tsx`.
- [ ] Add social profiles to `SITE.social` in `src/lib/content.ts` (feeds structured-data
      `sameAs`) once accounts exist.
- [ ] (Optional) Blog / content marketing — best long-term organic strategy for a thin site.

## Media

- [ ] Add poster frames per work video in R2 and wire `poster` on each `WORK_CATEGORIES`
      entry so cards show an instant still before the clip loads.
