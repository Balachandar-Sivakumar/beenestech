import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `How ${site.name} collects, uses, and protects personal data submitted through this website.`,
  alternates: { canonical: "/privacy" },
};

// Template copy — have it reviewed by legal counsel before launch.
export default function PrivacyPage() {
  return (
    <LegalPage title="Privacy Policy" updated="2026-11-01">
      <p>
        {site.legalName} (&quot;{site.name}&quot;, &quot;we&quot;) respects your privacy. This policy explains what
        personal data we collect through {site.url} and how we use it.
      </p>
      <h2>Information we collect</h2>
      <p>
        When you submit our contact form we collect your name, email address, the service you are interested in, and
        the project details you choose to share. These are delivered to our email inbox. If you message us on WhatsApp,
        WhatsApp&apos;s own privacy policy also applies. This website does not use tracking cookies or analytics.
      </p>
      <h2>How we use it</h2>
      <p>
        We use your information only to respond to your enquiry, prepare proposals, and deliver contracted services. We
        never sell your data.
      </p>
      <h2>Contact</h2>
      <p>
        For data access or deletion requests, email <a href={`mailto:${site.email}`} className="underline">{site.email}</a>.
      </p>
    </LegalPage>
  );
}
