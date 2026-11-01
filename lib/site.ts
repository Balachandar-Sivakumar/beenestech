// Central business config. Replace the placeholder values (socials, address, legal name)
// before going live — every SEO tag, JSON-LD block, and footer link reads from here.

// Live site address (no trailing slash), picked automatically:
//   1. NEXT_PUBLIC_SITE_URL — set this once you buy a domain, e.g. https://www.beenest.in
//   2. Vercel's production address (e.g. https://beenest.vercel.app) — automatic on Vercel
//   3. http://localhost:3000 for local development
const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : "") ||
  "http://localhost:3000"
).replace(/\/+$/, "");

export const site = {
  name: "BeeNest",
  legalName: "BeeNest", // replace with your registered company name
  url: siteUrl,
  locale: "en_US",
  title: "BeeNest | Custom Software Development & MVP Agency",
  description:
    "BeeNest builds and supports custom software, MVPs, SaaS, mobile apps and AI tools for startups and enterprises, from idea to launch. Book a discovery call.",
  tagline: "Product engineering for founders and enterprises",
  email: "beenestech@gmail.com", // switch to e.g. hello@yourdomain once you have a domain mailbox
  phone: "" as string, // e.g. "+91-00000-00000" — leave empty to hide
  // WhatsApp number in international format, digits only — country code first, e.g. "919876543210".
  // Leave empty to hide every WhatsApp button.
  whatsappNumber: "919585981417" as string,
  whatsappMessage: "Hi BeeNest, I'd like to discuss a software project.",
  // Booking page (Cal.com / Calendly). Leave empty and every "Book a call" button goes to the contact form.
  calendarUrl: "" as string,
  // Your real profiles only — empty ones are hidden from the footer and from Google's structured data.
  twitterHandle: "" as string, // e.g. "@beenest"
  social: {
    linkedin: "" as string, // e.g. "https://www.linkedin.com/company/your-page"
    instagram: "" as string,
    x: "" as string,
    github: "" as string,
  },
  // Set to null to hide the address block and omit it from JSON-LD.
  address: null as null | {
    street: string;
    city: string;
    region: string;
    postalCode: string;
    country: string; // ISO 3166-1 alpha-2, e.g. "IN"
  },
  areaServed: ["Worldwide"],
  foundingYear: "" as string, // e.g. "2024" — leave empty to omit from structured data
} as const;

/** wa.me chat link with a pre-filled message, or "" when no number is configured. */
export const whatsappUrl = site.whatsappNumber
  ? `https://wa.me/${site.whatsappNumber.replace(/\D/g, "")}?text=${encodeURIComponent(site.whatsappMessage)}`
  : "";

/** Props for every "Book a call" button: the calendar when set, otherwise the on-page contact form. */
export const bookingLink: { href: string; target?: string; rel?: string } = site.calendarUrl
  ? { href: site.calendarUrl, target: "_blank", rel: "noopener" }
  : { href: "/#contact" };

export const navLinks = [
  { href: "/#services", label: "Services" },
  { href: "/#products", label: "Products" },
  { href: "/#process", label: "Process" },
  { href: "/#faq", label: "FAQ" },
  { href: "/#contact", label: "Contact" },
] as const;
