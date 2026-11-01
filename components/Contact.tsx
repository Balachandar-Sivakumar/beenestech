import { bookingLink, site, whatsappUrl } from "@/lib/site";
import { ContactForm } from "./ContactForm";
import { WhatsAppIcon } from "./WhatsApp";

export function Contact() {
  return (
    <section id="contact" aria-labelledby="contact-heading" className="bg-neutral-100 py-20 sm:py-24">
      <div className="container-page grid gap-12 lg:grid-cols-2 lg:items-start [&>*]:min-w-0">
        <div>
          <p className="eyebrow">Start your project</p>
          <h2 id="contact-heading" className="section-title mt-2">
            Tell us what you&apos;re building
          </h2>
          <p className="mt-4 text-lg text-neutral-600">
            Share a few details and our team will get back to you with next steps, a rough timeline, and the right
            engagement model for your custom software or MVP.
          </p>

          <div className="mt-8 rounded-2xl bg-ink-950 p-6 text-white sm:p-8">
            <h3 className="text-xl font-bold">Prefer to talk directly?</h3>
            <p className="mt-2 text-neutral-300">
              No sales pitch — just an honest conversation about your idea, scope, and timeline.
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              {site.calendarUrl && (
                <a {...bookingLink} className="btn-primary text-base">
                  Book a discovery call
                </a>
              )}
              {whatsappUrl && (
                <a href={whatsappUrl} target="_blank" rel="noopener" className="btn bg-whatsapp text-base text-white hover:bg-whatsapp-dark">
                  <WhatsAppIcon />
                  Chat on WhatsApp
                </a>
              )}
              <a
                href={`mailto:${site.email}`}
                className={`${site.calendarUrl || whatsappUrl ? "btn-secondary" : "btn-primary"} text-base`}
              >
                Email us
              </a>
            </div>
            <p className="mt-5 text-sm text-neutral-300">
              {site.email}
              {site.phone && <> · {site.phone}</>}
            </p>
          </div>
        </div>

        <ContactForm />
      </div>
    </section>
  );
}
