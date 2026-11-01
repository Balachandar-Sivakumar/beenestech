import { processSteps } from "@/lib/content";

export function Process() {
  return (
    <section id="process" aria-labelledby="process-heading" className="bg-neutral-50 py-20 sm:py-24">
      <div className="container-page">
        <div className="max-w-2xl">
          <p className="eyebrow">How we work</p>
          <h2 id="process-heading" className="section-title mt-2">
            A proven MVP development process, from discovery to scale
          </h2>
          <p className="mt-4 text-lg text-neutral-600">
            Four clear stages, fixed checkpoints, and a working demo at the end of every sprint.
          </p>
        </div>

        <ol className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {processSteps.map((s, i) => (
            <li key={s.title} className="relative rounded-2xl border border-neutral-200 bg-white p-6">
              <span
                aria-hidden="true"
                className="flex h-10 w-10 items-center justify-center rounded-lg bg-ink-950 font-bold text-honey-400"
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-4 text-lg font-bold text-ink-950">
                <span className="sr-only">Step {i + 1}: </span>
                {s.title}
              </h3>
              <p className="mt-1 text-sm font-medium text-honey-700">{s.outcome}</p>
              <p className="mt-3 text-sm leading-relaxed text-neutral-600">{s.description}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
