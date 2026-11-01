import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: `Terms governing the use of the ${site.name} website and services.`,
  alternates: { canonical: "/terms" },
};

// Template copy — have it reviewed by legal counsel before launch.
export default function TermsPage() {
  return (
    <LegalPage title="Terms of Service" updated="2026-11-01">
      <p>
        These terms govern your use of {site.url}, operated by {site.legalName}. By using this website you agree to
        them.
      </p>
      <h2>Website content</h2>
      <p>
        Content on this website is provided for general information. It does not form a contract; engagements are
        governed by a separate signed statement of work.
      </p>
      <h2>Intellectual property</h2>
      <p>
        The {site.name} name, logo, and website content belong to {site.legalName}. Client deliverables and their IP
        are assigned to the client as set out in each engagement agreement.
      </p>
      <h2>Contact</h2>
      <p>
        Questions about these terms? Email <a href={`mailto:${site.email}`} className="underline">{site.email}</a>.
      </p>
    </LegalPage>
  );
}
