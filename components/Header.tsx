"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { bookingLink, navLinks, site } from "@/lib/site";
import { BrandLogo } from "./Logo";

export function Header() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-ink-950/95 backdrop-blur supports-[backdrop-filter]:bg-ink-950/80">
      <div className="container-page flex h-16 items-center justify-between gap-4 sm:h-20">
        <Link href="/" className="flex shrink-0 items-center" aria-label={`${site.name} home`}>
          <BrandLogo />
        </Link>

        <nav aria-label="Primary" className="hidden lg:block">
          <ul className="flex items-center gap-7 text-sm font-medium text-neutral-300">
            {navLinks.map((l) => (
              <li key={l.href}>
                <a href={l.href} className="transition-colors hover:text-white">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <a {...bookingLink} className="btn-primary hidden sm:inline-flex">
            Book a Discovery Call
          </a>
          <button
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center rounded-lg text-white hover:bg-white/10 lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
          >
            <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              {open ? <path d="M6 6l12 12M18 6 6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
            </svg>
          </button>
        </div>
      </div>

      <nav id="mobile-nav" aria-label="Mobile" hidden={!open} className="border-t border-white/10 lg:hidden">
        <ul className="container-page flex flex-col py-3 text-base font-medium text-neutral-200">
          {navLinks.map((l) => (
            <li key={l.href}>
              <a href={l.href} className="block rounded-md px-2 py-3 hover:bg-white/5" onClick={() => setOpen(false)}>
                {l.label}
              </a>
            </li>
          ))}
          <li className="pt-2">
            <a {...bookingLink} className="btn-primary w-full" onClick={() => setOpen(false)}>
              Book a Discovery Call
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
}
