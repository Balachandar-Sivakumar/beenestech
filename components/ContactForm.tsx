"use client";

import { useState } from "react";
import { serviceOptions, softwareTypes } from "@/lib/content";
import { site } from "@/lib/site";

type Status = { state: "idle" | "submitting" | "success" | "error"; message?: string };

const inputClass =
  "mt-2 block w-full rounded-lg border border-neutral-300 bg-white px-3.5 py-2.5 text-base text-ink-950 placeholder:text-neutral-500 focus:border-honey-500 focus:ring-2 focus:ring-honey-400/40 focus:outline-none aria-[invalid=true]:border-red-600";

const fallbackError = `Couldn't send your message. Please check your connection, or email ${site.email} / message us on WhatsApp.`;

export function ContactForm() {
  const [status, setStatus] = useState<Status>({ state: "idle" });

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    setStatus({ state: "submitting" });
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(Object.fromEntries(new FormData(form))),
      });
      const data = (await res.json().catch(() => ({ ok: false }))) as { ok: boolean; error?: string };
      if (!res.ok || !data.ok) {
        setStatus({ state: "error", message: data.error ?? fallbackError });
        return;
      }
      form.reset();
      setStatus({ state: "success", message: "Thanks! Our team will be in touch shortly." });
    } catch {
      // Offline or the request never reached the server.
      setStatus({ state: "error", message: fallbackError });
    }
  }

  return (
    <form onSubmit={onSubmit} className="relative rounded-2xl bg-white p-6 shadow-xl ring-1 ring-neutral-200 sm:p-8">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="text-sm font-semibold text-ink-950">
            Full name
          </label>
          <input id="name" name="name" type="text" autoComplete="name" required maxLength={100} className={inputClass} />
        </div>
        <div>
          <label htmlFor="email" className="text-sm font-semibold text-ink-950">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            inputMode="email"
            required
            maxLength={200}
            placeholder="you@company.com"
            className={inputClass}
          />
        </div>
      </div>

      <div className="mt-5 grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="service" className="text-sm font-semibold text-ink-950">
            What do you need?
          </label>
          <select id="service" name="service" required defaultValue="" className={inputClass}>
            <option value="" disabled>
              Select a service
            </option>
            {serviceOptions.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="softwareType" className="text-sm font-semibold text-ink-950">
            Type of software <span className="font-normal text-neutral-600">(optional)</span>
          </label>
          <select id="softwareType" name="softwareType" defaultValue="" className={inputClass}>
            <option value="">Not sure yet</option>
            {softwareTypes.map((t) => (
              <option key={t} value={t}>
                {t.charAt(0).toUpperCase() + t.slice(1)}
              </option>
            ))}
            <option value="other">Other</option>
          </select>
        </div>
      </div>

      <div className="mt-5">
        <label htmlFor="scope" className="text-sm font-semibold text-ink-950">
          Project scope
        </label>
        <p id="scope-hint" className="mt-1 text-sm text-neutral-600">
          What are you building, who is it for, and when do you need it?
        </p>
        <textarea
          id="scope"
          name="scope"
          rows={5}
          required
          minLength={20}
          maxLength={5000}
          aria-describedby="scope-hint"
          className={inputClass}
        />
      </div>

      {/* Honeypot: hidden from people and assistive tech, catches naive bots. */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label htmlFor="company_website">Leave this field empty</label>
        <input id="company_website" name="company_website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <button type="submit" className="btn-dark mt-6 w-full text-base" disabled={status.state === "submitting"}>
        {status.state === "submitting" ? "Sending…" : "Send project details"}
      </button>

      <p
        role="status"
        aria-live="polite"
        className={`mt-4 min-h-6 text-sm font-medium ${status.state === "error" ? "text-red-700" : "text-emerald-700"}`}
      >
        {status.message}
      </p>
      <p className="text-xs text-neutral-600">
        By submitting, you agree to our{" "}
        <a href="/privacy" className="underline underline-offset-2 hover:text-ink-950">
          privacy policy
        </a>
        . We never share your details.
      </p>
    </form>
  );
}
