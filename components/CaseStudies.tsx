import { caseStudies } from "@/lib/content";

// Renders nothing until real, client-approved case studies are added in lib/content.ts.
export function CaseStudies() {
  if (caseStudies.length === 0) return null;
  return (
    <section id="work" aria-labelledby="work-heading" className="bg-white py-20 sm:py-24">
      <div className="container-page">
        <p className="eyebrow">Our work</p>
        <h2 id="work-heading" className="section-title mt-2">
          Custom software &amp; MVP case studies
        </h2>
        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {caseStudies.map((c) => (
            <article key={c.title} className="flex flex-col rounded-2xl border border-neutral-200 p-6 sm:p-8">
              <p className="text-sm text-neutral-600">
                {c.client} · {c.industry}
              </p>
              <h3 className="mt-2 text-xl font-bold text-ink-950">{c.title}</h3>
              <p className="mt-3 text-neutral-600">{c.summary}</p>
              <p className="mt-4 font-semibold text-honey-700">{c.result}</p>
              {c.href && (
                <a href={c.href} className="mt-auto pt-6 font-semibold text-ink-950 underline underline-offset-4">
                  Read the {c.client} case study
                </a>
              )}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
