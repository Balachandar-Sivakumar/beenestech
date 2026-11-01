# BeeNest website

Next.js 15 + React 19 + Tailwind CSS v4 landing page for BeeNest.

## Quick start

```bash
npm run setup
```

That one command checks Node.js, installs packages, offers to set up the contact-form email, and starts the dev server.

| Command | What it does |
|---|---|
| `npm run setup` | Install → email setup (if needed) → dev server |
| `npm run setup -- --prod` | Install → email check → production build → production server |
| `npm run setup -- --clean` | Also clears the `.next` cache (fixes blank or unstyled pages) |
| `npm run setup -- --skip-email` | Don't ask about email |
| `npm run setup:email` | Set up or change the contact-form email only |

Requires Node.js 18.18 or newer (20 LTS recommended). Run only one `npm run dev` at a time — two dev servers share the `.next` folder and break each other.

## Where to edit

| What | File |
|---|---|
| Business details: domain, email, WhatsApp, calendar link, socials, address | `lib/site.ts` |
| Page copy: services, process, FAQ, software types, form options | `lib/content.ts` |
| Colours | `app/globals.css` (`@theme`) |
| Contact-form email settings | `.env.local` (created by `npm run setup:email`; see `.env.example`) |

## Deploying

Set the same variables from `.env.local` (`SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`, `LEADS_TO`) as environment variables on your host (e.g. Vercel → Project → Settings → Environment Variables).
