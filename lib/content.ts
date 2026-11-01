import type { IconName } from "@/components/Icon";

// Copy here avoids specific numbers or promises we can't back up. When you have
// real figures (timelines, team size, response time), add them deliberately.

// Shown in the rotating hero line. Keep each item short (≤ 20 chars) so it fits on phones.
export const softwareTypes = [
  "SaaS platforms",
  "CRM & ERP systems",
  "e-commerce stores",
  "mobile apps",
  "AI-powered tools",
  "booking systems",
  "internal dashboards",
  "workflow automation",
  "customer portals",
  "APIs & integrations",
] as const;

// Contact form "What do you need?" options — shared by the form and the API validation.
export const serviceOptions = [
  { value: "new-software", label: "Build new software" },
  { value: "mvp", label: "Turn an idea into an MVP" },
  { value: "support", label: "Support, maintenance or upgrades" },
  { value: "integration", label: "Integrations & automation" },
  { value: "design", label: "UI/UX design" },
  { value: "product", label: "A BeeNest product" },
  { value: "other", label: "Something else" },
] as const;

export type Pillar = {
  id: string;
  icon: IconName;
  eyebrow: string;
  title: string;
  description: string;
  points: string[];
  cta: { href: string; label: string };
};

export const pillars: Pillar[] = [
  {
    id: "products",
    icon: "cube",
    eyebrow: "Products",
    title: "Our own digital products & tools",
    description: "We build our own software products across categories — and bring that product mindset to every client build.",
    points: ["Business software", "SaaS platforms", "Productivity & automation tools", "Developer utilities"],
    cta: { href: "#contact", label: "Ask about our products" },
  },
  {
    id: "engineering-services",
    icon: "code",
    eyebrow: "Services",
    title: "Development, support & maintenance for any software",
    description: "We build new tools and keep existing ones running — upgrades, fixes, integrations, and new features, whoever built them.",
    points: ["Web & mobile apps", "Support & maintenance", "Upgrades & migrations", "API integrations", "UI/UX design", "Cloud & DevOps"],
    cta: { href: "#contact", label: "Get help with your software" },
  },
  {
    id: "custom-mvp",
    icon: "rocket",
    eyebrow: "Custom Builds & MVPs",
    title: "Custom software & MVPs for any idea",
    description: "If you can describe it, we can build it — idea-to-launch MVPs for startups and bespoke software for enterprises in any industry.",
    points: ["MVPs for startups", "Bespoke enterprise software", "Industry-specific tools"],
    cta: { href: "#contact", label: "Scope your MVP with us" },
  },
];

export const processSteps = [
  {
    title: "Discovery & Architecture",
    outcome: "Clear scope & plan",
    description:
      "We map your users, goals, and constraints, then define the MVP scope, system architecture, and a delivery plan you can share with investors or stakeholders.",
  },
  {
    title: "Rapid MVP Sprint",
    outcome: "A working product",
    description:
      "Short, demo-driven sprints turn the highest-value features into working software. You see progress every week and steer priorities with real feedback.",
  },
  {
    title: "Full Build & QA",
    outcome: "Production-ready",
    description:
      "We harden the product with automated testing, security reviews, performance budgets, and accessibility checks before it reaches every customer.",
  },
  {
    title: "Deployment & Scaling",
    outcome: "Live & growing",
    description:
      "Automated deployments, monitoring, and cost-aware cloud scaling keep your platform fast and reliable as usage grows.",
  },
];

export const buildTypes: { icon: IconName; title: string; text: string }[] = [
  { icon: "layers", title: "SaaS platforms", text: "Multi-tenant apps with user roles, billing, and admin dashboards." },
  { icon: "users", title: "CRM & ERP systems", text: "Sales, inventory, HR, and operations software shaped around how you work." },
  { icon: "cart", title: "E-commerce & marketplaces", text: "Online stores, B2B ordering, and multi-vendor marketplaces." },
  { icon: "phone", title: "Mobile apps", text: "iOS and Android apps connected to your platform and APIs." },
  { icon: "sparkles", title: "AI-powered tools", text: "Chatbots, document processing, smart search, and AI copilots." },
  { icon: "workflow", title: "Internal tools & automation", text: "Replace spreadsheets and manual steps with reliable workflows." },
  { icon: "chart", title: "Dashboards & analytics", text: "Turn scattered data into reports your team actually uses." },
  { icon: "store", title: "Portals & booking systems", text: "Customer, partner, and vendor portals, scheduling, and bookings." },
  { icon: "plug", title: "APIs & integrations", text: "Connect payment gateways, CRMs, ERPs, and any third-party service." },
];

// Rendered only when non-empty — never publish placeholder clients.
// Example: { client: "Acme Health", industry: "Healthcare", title: "Patient booking MVP",
//            summary: "...", result: "Launched to first 500 clinics", href: "/case-studies/acme" }
export type CaseStudy = {
  client: string;
  industry: string;
  title: string;
  summary: string;
  result: string;
  href?: string;
};
export const caseStudies: CaseStudy[] = [];

export const commitments = [
  { title: "You own the code", text: "Source code, designs, and IP are yours, in repositories you control." },
  { title: "Weekly working demos", text: "Progress you can click, not status reports." },
  { title: "Confidential by default", text: "Happy to sign an NDA before you share your idea." },
  { title: "Transparent estimates", text: "Itemised scope and cost agreed before work begins." },
];

export const faqs = [
  {
    question: "What kind of software can BeeNest build?",
    answer:
      "Almost any kind: SaaS platforms, CRM and ERP systems, e-commerce stores, mobile apps, AI-powered tools, booking systems, internal dashboards, workflow automation, customer portals, and API integrations — for startups and enterprises in any industry. We also support and maintain existing software.",
  },
  {
    question: "How long does it take to build an MVP?",
    answer:
      "It depends on scope, integrations, and compliance needs, but a focused MVP is measured in weeks, not quarters. Discovery comes first, and you get a written, sprint-by-sprint timeline before any build work starts.",
  },
  {
    question: "How much does custom software development cost?",
    answer:
      "Cost depends on scope, complexity, and team size. We offer fixed-scope pricing for well-defined builds and flexible engagements for products that keep evolving. You receive an itemised estimate after a free discovery call.",
  },
  {
    question: "How do you decide what goes into the MVP scope?",
    answer:
      "We start from the single problem your first users will pay to solve, map the minimum workflow that solves it, and move everything else to a prioritised roadmap. This keeps the first release small, testable, and fast to market.",
  },
  {
    question: "Do you support and maintain software built by another team?",
    answer:
      "Yes. We support, maintain, and extend existing software of any kind — whoever built it. We start with a short technical audit, then take care of fixes, upgrades, new features, and integrations, or work alongside your in-house team.",
  },
  {
    question: "Do we own the source code and intellectual property?",
    answer:
      "Yes. You own the source code, designs, and documentation we create for you. Everything lives in repositories you control, and IP ownership is written into the agreement.",
  },
];
