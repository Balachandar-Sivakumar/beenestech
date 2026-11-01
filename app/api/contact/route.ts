import { NextResponse } from "next/server";
import { serviceOptions, softwareTypes } from "@/lib/content";
import { fromAddress, getTransporter, leadsInbox, mailerConfigured } from "@/lib/mailer";
import { site } from "@/lib/site";

const SERVICES = new Map<string, string>(serviceOptions.map((o) => [o.value, o.label]));
const SOFTWARE_TYPES = new Set<string>([...softwareTypes, "other", ""]);
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Basic per-IP throttle so bots can't flood the inbox (resets when the server restarts).
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;
const hits = new Map<string, number[]>();

function rateLimited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 1000) {
    for (const [key, times] of hits) if (now - times[times.length - 1] > WINDOW_MS) hits.delete(key);
  }
  return recent.length > MAX_PER_WINDOW;
}

const escapeHtml = (s: string) =>
  s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }

  // Honeypot filled → pretend success so bots don't retry.
  if (typeof body.company_website === "string" && body.company_website.trim()) {
    return NextResponse.json({ ok: true });
  }

  const ip = req.headers.get("x-forwarded-for")?.split(",")[0].trim() || "unknown";
  if (rateLimited(ip)) {
    return NextResponse.json(
      { ok: false, error: "Too many requests. Please try again later or message us on WhatsApp." },
      { status: 429 },
    );
  }

  const name = String(body.name ?? "").trim().replace(/\s+/g, " ").slice(0, 100);
  const email = String(body.email ?? "").trim().slice(0, 200);
  const service = String(body.service ?? "");
  const softwareType = String(body.softwareType ?? "");
  const scope = String(body.scope ?? "").trim().slice(0, 5000);

  if (!name || !EMAIL_RE.test(email) || !SERVICES.has(service) || !SOFTWARE_TYPES.has(softwareType) || scope.length < 20) {
    return NextResponse.json(
      { ok: false, error: "Please fill in every field with a valid work email and a short project description." },
      { status: 422 },
    );
  }

  const fields: [string, string][] = [
    ["Name", name],
    ["Email", email],
    ["Service", SERVICES.get(service)!],
    ["Software type", softwareType ? softwareType.charAt(0).toUpperCase() + softwareType.slice(1) : "Not sure yet"],
  ];

  if (!mailerConfigured) {
    // Local development without SMTP: keep the lead visible in the terminal instead of losing it.
    console.warn("[lead] SMTP not configured — set SMTP_USER, SMTP_PASS, LEADS_TO in .env.local", { fields, scope });
    if (process.env.NODE_ENV === "production") {
      return NextResponse.json(
        { ok: false, error: `We couldn't send your message. Please email ${site.email} or message us on WhatsApp.` },
        { status: 500 },
      );
    }
    return NextResponse.json({ ok: true });
  }

  try {
    await getTransporter().sendMail({
      from: fromAddress,
      to: leadsInbox,
      replyTo: { name, address: email }, // "Reply" in your inbox goes straight to the client
      subject: `New project enquiry: ${name} — ${SERVICES.get(service)}`,
      text: `${fields.map(([k, v]) => `${k}: ${v}`).join("\n")}\n\nProject scope:\n${scope}\n`,
      html: `
        <h2 style="margin:0 0 16px;font-family:sans-serif">New project enquiry</h2>
        <table style="font-family:sans-serif;font-size:14px;border-collapse:collapse">
          ${fields
            .map(
              ([k, v]) =>
                `<tr><td style="padding:6px 16px 6px 0;color:#666;vertical-align:top">${k}</td><td style="padding:6px 0"><strong>${escapeHtml(v)}</strong></td></tr>`,
            )
            .join("")}
        </table>
        <h3 style="margin:24px 0 8px;font-family:sans-serif">Project scope</h3>
        <p style="font-family:sans-serif;font-size:14px;white-space:pre-wrap;margin:0">${escapeHtml(scope)}</p>
        <p style="font-family:sans-serif;font-size:12px;color:#888;margin-top:24px">Sent from the contact form on ${site.url}. Reply to this email to answer ${escapeHtml(name)} directly.</p>
      `,
    });
  } catch (err) {
    console.error("[lead] email send failed", err, { fields, scope });
    return NextResponse.json(
      { ok: false, error: `We couldn't send your message. Please email ${site.email} or message us on WhatsApp.` },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}
