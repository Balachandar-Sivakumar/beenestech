import { faqs, pillars } from "./content";
import { site } from "./site";

const orgId = `${site.url}/#organization`;

const postalAddress = site.address
  ? {
      "@type": "PostalAddress",
      streetAddress: site.address.street,
      addressLocality: site.address.city,
      addressRegion: site.address.region,
      postalCode: site.address.postalCode,
      addressCountry: site.address.country,
    }
  : undefined;

const contactPoint = {
  "@type": "ContactPoint",
  contactType: "sales",
  email: site.email,
  ...(site.phone && { telephone: site.phone }),
  availableLanguage: ["English"],
  url: `${site.url}/#contact`,
};

export const organizationGraph = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": orgId,
      name: site.name,
      legalName: site.legalName,
      url: site.url,
      logo: `${site.url}/brand/beenest-icon-512.png`,
      description: site.description,
      ...(site.foundingYear && { foundingDate: site.foundingYear }),
      email: site.email,
      ...(Object.values(site.social).some(Boolean) && { sameAs: Object.values(site.social).filter(Boolean) }),
      contactPoint,
      ...(postalAddress && { address: postalAddress }),
    },
    {
      "@type": "ProfessionalService",
      "@id": `${site.url}/#service`,
      name: `${site.name} — Custom Software Development & MVP Engineering`,
      url: site.url,
      image: `${site.url}/opengraph-image`,
      description: site.description,
      parentOrganization: { "@id": orgId },
      areaServed: site.areaServed,
      email: site.email,
      ...(site.phone && { telephone: site.phone }),
      ...(postalAddress && { address: postalAddress }),
      contactPoint,
      knowsAbout: [
        "Custom software development",
        "MVP development",
        "SaaS product engineering",
        "Full-stack web development",
        "Mobile app development",
        "Cloud architecture",
        "UI/UX design",
        "Software support and maintenance",
        "AI software development",
      ],
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Software engineering services",
        itemListElement: pillars.map((p) => ({
          "@type": "Offer",
          itemOffered: { "@type": "Service", name: p.title, description: p.description },
        })),
      },
    },
    {
      "@type": "WebSite",
      "@id": `${site.url}/#website`,
      url: site.url,
      name: site.name,
      publisher: { "@id": orgId },
      inLanguage: "en",
    },
  ],
};

export const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.question,
    acceptedAnswer: { "@type": "Answer", text: f.answer },
  })),
};
