import "server-only";
import nodemailer, { type Transporter } from "nodemailer";

// SMTP settings come from .env.local (never committed). Defaults target Gmail.
const host = process.env.SMTP_HOST || "smtp.gmail.com";
const port = Number(process.env.SMTP_PORT || 465);
const user = process.env.SMTP_USER;
const pass = process.env.SMTP_PASS;

/** Inbox that receives new leads (defaults to the SMTP account itself). */
export const leadsInbox = process.env.LEADS_TO || user;

export const mailerConfigured = Boolean(user && pass && leadsInbox);

let transporter: Transporter | undefined;

export function getTransporter() {
  transporter ??= nodemailer.createTransport({
    host,
    port,
    secure: port === 465, // 465 = implicit TLS; 587 upgrades with STARTTLS
    auth: { user, pass },
  });
  return transporter;
}

/** Display name + address the email is sent from. Gmail requires the authenticated account here. */
export const fromAddress = `"BeeNest Website" <${process.env.SMTP_FROM || user}>`;
