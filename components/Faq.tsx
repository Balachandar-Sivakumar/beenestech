import { faqs } from "@/lib/content";
import { faqSchema } from "@/lib/schema";
import { JsonLd } from "./JsonLd";

export function Faq() {
  return (
    <section id="faq" aria-labelledby="faq-heading" className="bg-white pt-16 pb-20 sm:pb-24">
      <div className="container-page">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.6fr]">
          <div>
            <p className="eyebrow">FAQ</p>
            <h2 id="faq-heading" className="section-title mt-2">
              Custom software &amp; MVP development questions
            </h2>
            <p className="mt-4 text-neutral-600">
              Can&apos;t find your answer?{" "}
              <a href="#contact" className="font-semibold text-honey-700 underline underline-offset-4 hover:text-ink-950">
                Ask our engineering team directly
              </a>
              .
            </p>
          </div>

          {/* Native <details> — accessible, zero JS, and answers stay in the DOM for crawlers. */}
          <div className="divide-y divide-neutral-200 border-y border-neutral-200">
            {faqs.map((f, i) => (
              <details key={f.question} className="group py-5" open={i === 0}>
                <summary className="flex cursor-pointer list-none items-start justify-between gap-4 text-left [&::-webkit-details-marker]:hidden">
                  <h3 className="text-lg font-semibold text-ink-950">{f.question}</h3>
                  <span
                    aria-hidden="true"
                    className="mt-1 text-xl leading-none text-honey-700 transition-transform group-open:rotate-45"
                  >
                    +
                  </span>
                </summary>
                <p className="mt-3 leading-relaxed text-neutral-600">{f.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </div>
      <JsonLd data={faqSchema} />
    </section>
  );
}
