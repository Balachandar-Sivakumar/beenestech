import Image from "next/image";
import { softwareTypes } from "@/lib/content";
import { bookingLink } from "@/lib/site";
import { RotatingText } from "./RotatingText";

const highlights = ["Build, launch & support", "Web, mobile, cloud & AI", "You own the code"];

export function Hero() {
  return (
    <section aria-labelledby="hero-heading" className="relative overflow-hidden bg-ink-950 text-white">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_50%_at_80%_0%,rgba(245,185,33,0.16),transparent_70%)]"
      />
      <div className="container-page relative grid items-center gap-12 py-16 sm:py-20 lg:grid-cols-2 lg:py-28">
        <div>
          <p className="mb-4 inline-flex items-center rounded-full border border-honey-400/30 bg-honey-400/10 px-3 py-1 text-xs font-medium text-honey-300 sm:text-sm">
            Custom software · MVPs · Support
          </p>
          <h1 id="hero-heading" className="text-[2rem] leading-tight font-extrabold tracking-tight text-balance min-[375px]:text-4xl sm:text-5xl lg:text-[3.25rem] lg:leading-[1.1]">
            Scalable Product Engineering &amp; <span className="text-honey-400">Custom Software</span> Services
          </h1>
          <p className="mt-5 text-xl font-semibold text-white sm:text-2xl">
            <span className="sr-only">We build and support any kind of software, including {softwareTypes.join(", ")}.</span>
            <span aria-hidden="true">
              We build &amp; support <RotatingText items={softwareTypes} />
            </span>
          </p>
          <p className="mt-4 max-w-xl text-lg leading-relaxed text-neutral-300">
            From first MVP to long-term support, BeeNest is the product engineering partner for founders, tech leads,
            and enterprises — any idea, any industry, built to grow.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a {...bookingLink} className="btn-primary text-base">
              Book a free discovery call
            </a>
            <a href="#services" className="btn-secondary text-base">
              Explore our engineering services
            </a>
          </div>
          <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm text-neutral-300">
            {highlights.map((h) => (
              <li key={h} className="flex items-center gap-2">
                <svg viewBox="0 0 20 20" className="h-4 w-4 text-honey-400" fill="currentColor" aria-hidden="true">
                  <path d="M8.1 14.2 3.9 10l1.4-1.4 2.8 2.8 6.6-6.6 1.4 1.4Z" />
                </svg>
                {h}
              </li>
            ))}
          </ul>
        </div>

        {/* LCP element: explicit dimensions + priority (emits fetchpriority="high" and a preload) */}
        <Image
          src="/hero-product.svg"
          alt="Illustration of a product dashboard tracking an MVP build across discovery, build, and shipped stages, with a confirmation that the release is live in production"
          width={640}
          height={520}
          priority
          fetchPriority="high"
          unoptimized
          sizes="(min-width: 1024px) 50vw, 100vw"
          className="mx-auto h-auto w-full max-w-xl"
        />
      </div>
    </section>
  );
}
