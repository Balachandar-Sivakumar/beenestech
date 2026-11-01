import Link from "next/link";
import { site, whatsappUrl } from "@/lib/site";
import { WhatsAppIcon } from "./WhatsApp";
import { FullLogo } from "./Logo";

const columns = [
  {
    heading: "Services",
    links: [
      { href: "/#products", label: "Our products" },
      { href: "/#engineering-services", label: "Development & support" },
      { href: "/#custom-mvp", label: "MVP development" },
    ],
  },
  {
    heading: "Company",
    links: [
      { href: "/#process", label: "Our process" },
      { href: "/#faq", label: "FAQ" },
      { href: "/#contact", label: "Contact" },
    ],
  },
  {
    heading: "Legal",
    links: [
      { href: "/privacy", label: "Privacy policy" },
      { href: "/terms", label: "Terms of service" },
      { href: "/sitemap.xml", label: "Sitemap" },
    ],
  },
];

const socials = [
  { href: site.social.linkedin, label: "LinkedIn" },
  { href: site.social.instagram, label: "Instagram" },
  { href: site.social.x, label: "X (Twitter)" },
  { href: site.social.github, label: "GitHub" },
].filter((s) => s.href);

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-ink-950 text-neutral-300">
      <div className="container-page grid grid-cols-2 gap-10 py-14 sm:grid-cols-3 lg:grid-cols-[1.5fr_repeat(3,1fr)]">
        <div className="col-span-2 sm:col-span-3 lg:col-span-1">
          <Link href="/" className="inline-block" aria-label={`${site.name} home`}>
            <FullLogo />
          </Link>
          <p className="mt-4 max-w-xs text-sm">
            We build and support custom software, MVPs, and digital products for startups and enterprises.
          </p>
          <address className="mt-4 text-sm not-italic">
            {site.address && (
              <span className="block">
                {site.address.street}, {site.address.city}, {site.address.region} {site.address.postalCode}
              </span>
            )}
            <a href={`mailto:${site.email}`} className="block hover:text-white">
              {site.email}
            </a>
            {whatsappUrl && (
              <a href={whatsappUrl} target="_blank" rel="noopener" className="mt-1 flex items-center gap-2 hover:text-white">
                <WhatsAppIcon className="h-4 w-4" />
                WhatsApp us
              </a>
            )}
            {site.phone && (
              <a href={`tel:${site.phone.replace(/[^\d+]/g, "")}`} className="block hover:text-white">
                {site.phone}
              </a>
            )}
          </address>
          {socials.length > 0 && (
            <ul className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-sm" aria-label="Social media">
              {socials.map((s) => (
                <li key={s.href}>
                  <a href={s.href} rel="noopener me" target="_blank" className="hover:text-white">
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>

        {columns.map((c) => (
          <nav key={c.heading} aria-label={c.heading}>
            <p className="text-sm font-semibold text-white">{c.heading}</p>
            <ul className="mt-4 space-y-3 text-sm">
              {c.links.map((l) => (
                <li key={l.href}>
                  <a href={l.href} className="hover:text-white">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </div>
      <div className="border-t border-white/10">
        <p className="container-page py-6 text-sm">
          © {year} {site.legalName}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
