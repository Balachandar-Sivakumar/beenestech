import { buildTypes } from "@/lib/content";
import { bookingLink } from "@/lib/site";
import { Icon } from "./Icon";

export function WhatWeBuild() {
  return (
    <section aria-labelledby="build-heading" className="relative overflow-hidden bg-ink-950 py-20 text-white sm:py-24">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(50%_60%_at_0%_100%,rgba(245,185,33,0.12),transparent_70%)]"
      />
      <div className="container-page relative">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold tracking-wide text-honey-400 uppercase">What we build</p>
          <h2 id="build-heading" className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
            If it&apos;s software, we build it — and support it
          </h2>
          <p className="mt-4 text-lg text-neutral-300">
            From a first MVP to enterprise platforms: we design it, build it, launch it, and keep it running.
          </p>
        </div>

        <ul className="mt-12 grid gap-px overflow-hidden rounded-2xl bg-white/10 sm:grid-cols-2 md:grid-cols-3">
          {buildTypes.map((b) => (
            <li key={b.title} className="bg-ink-950 p-6 sm:max-md:last:col-span-2 transition-colors hover:bg-ink-900 sm:p-8">
              <Icon name={b.icon} className="h-7 w-7 text-honey-400" />
              <h3 className="mt-4 text-lg font-semibold">{b.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-neutral-300">{b.text}</p>
            </li>
          ))}
        </ul>

        <div className="mt-10 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
          <a {...bookingLink} className="btn-primary text-base">
            Discuss your project with us
          </a>
          <p className="text-sm text-neutral-300">Don&apos;t see your idea here? We build that too.</p>
        </div>
      </div>
    </section>
  );
}
