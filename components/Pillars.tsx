import { pillars } from "@/lib/content";
import { Icon } from "./Icon";

export function Pillars() {
  return (
    <section id="services" aria-labelledby="services-heading" className="bg-white py-20 sm:py-24">
      <div className="container-page">
        <div className="max-w-2xl">
          <p className="eyebrow">What we do</p>
          <h2 id="services-heading" className="section-title mt-2">
            Products, engineering services &amp; custom software development
          </h2>
          <p className="mt-4 text-lg text-neutral-600">
            One team that builds its own products, builds and supports software of every kind, and turns new ideas into MVPs.
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {pillars.map((p) => (
            <article
              key={p.id}
              id={p.id}
              aria-labelledby={`${p.id}-title`}
              className="group flex flex-col rounded-2xl sm:last:col-span-2 lg:last:col-span-1 border border-neutral-200 bg-white p-6 transition hover:-translate-y-1 hover:border-honey-400 hover:shadow-xl motion-reduce:transform-none sm:p-8"
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-ink-950 text-honey-400 transition-colors group-hover:bg-honey-400 group-hover:text-ink-950">
                <Icon name={p.icon} />
              </span>
              <p className="eyebrow mt-6">{p.eyebrow}</p>
              <h3 id={`${p.id}-title`} className="mt-1 text-xl font-bold text-ink-950">
                {p.title}
              </h3>
              <p className="mt-3 text-neutral-600">{p.description}</p>
              <ul className="mt-5 flex flex-wrap gap-2 text-sm">
                {p.points.map((pt) => (
                  <li key={pt} className="rounded-full bg-neutral-100 px-3 py-1 text-neutral-700">
                    {pt}
                  </li>
                ))}
              </ul>
              <a
                href={p.cta.href}
                className="mt-auto inline-flex items-center gap-1 pt-6 font-semibold text-honey-700 hover:text-ink-950"
              >
                {p.cta.label}
                <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">
                  →
                </span>
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
