import { commitments } from "@/lib/content";

export function Trust() {
  return (
    <section aria-labelledby="trust-heading" className="bg-white pt-20 sm:pt-24">
      <div className="container-page">
        <h2 id="trust-heading" className="sr-only">
          Why teams choose BeeNest
        </h2>
        <ul className="grid gap-6 border-b border-neutral-200 pb-16 sm:grid-cols-2 lg:grid-cols-4">
          {commitments.map((c) => (
            <li key={c.title} className="border-l-2 border-honey-400 pl-4">
              <h3 className="font-bold text-ink-950">{c.title}</h3>
              <p className="mt-1 text-sm text-neutral-600">{c.text}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
