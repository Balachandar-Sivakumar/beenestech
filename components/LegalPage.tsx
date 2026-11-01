import { Footer } from "./Footer";
import { Header } from "./Header";

export function LegalPage({ title, updated, children }: { title: string; updated: string; children: React.ReactNode }) {
  return (
    <>
      <Header />
      <main id="main" className="container-page max-w-3xl py-16 sm:py-20">
        <article>
          <h1 className="text-4xl font-bold tracking-tight text-ink-950">{title}</h1>
          <p className="mt-2 text-sm text-neutral-600">
            Last updated: <time dateTime={updated}>{updated}</time>
          </p>
          <div className="mt-8 space-y-4 leading-relaxed text-neutral-700 [&_h2]:mt-8 [&_h2]:text-xl [&_h2]:font-bold [&_h2]:text-ink-950">
            {children}
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}
