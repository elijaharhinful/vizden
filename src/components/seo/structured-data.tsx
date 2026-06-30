import { SITE, WORK_CATEGORIES, WHATSAPP_NUMBER } from "@/lib/content";

// JSON-LD for the homepage: Organization + WebSite + a Service catalog.
// Reuses the canonical SITE facts and the work categories — no new content.
export function StructuredData() {
  const orgId = `${SITE.url}/#organization`;

  const graph = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": orgId,
        name: SITE.name,
        url: SITE.url,
        logo: SITE.logo,
        description: SITE.description,
        areaServed: ["Africa", "Worldwide"],
        sameAs: SITE.social,
        contactPoint: {
          "@type": "ContactPoint",
          contactType: "sales",
          telephone: `+${WHATSAPP_NUMBER}`,
          url: `https://wa.me/${WHATSAPP_NUMBER}`,
          availableLanguage: ["English"],
        },
      },
      {
        "@type": "WebSite",
        "@id": `${SITE.url}/#website`,
        url: SITE.url,
        name: SITE.name,
        description: SITE.description,
        publisher: { "@id": orgId },
        inLanguage: "en",
      },
      {
        "@type": "Service",
        "@id": `${SITE.url}/#services`,
        serviceType: "AI film and video production",
        provider: { "@id": orgId },
        areaServed: ["Africa", "Worldwide"],
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "VizDen Studios productions",
          itemListElement: WORK_CATEGORIES.map((c) => ({
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: c.title,
              description: c.concept,
            },
          })),
        },
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      // JSON.stringify output is safe to inline; no user input involved.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }}
    />
  );
}
