# Roger Niyomugabo — Portfolio

Personal portfolio site built with **Next.js 14 (App Router)**, **TypeScript**, **Tailwind CSS**, and **Framer Motion**.

## Highlights

- **Hero** with animated role rotator, gradient typography, and a tech-stack marquee
- **About** with quick facts and CV download
- **Animated stats** counters (years, projects, mentees, industries)
- **Services** — what I help teams ship
- **Skills** with categorized progress bars
- **Experience timeline** with alternating cards on desktop
- **Projects** grid + dynamic case-study pages at `/projects/[slug]`
- **Blog** index + post pages at `/blog/[slug]` with sample posts
- **Testimonials** carousel with motion transitions
- **Contact form** (react-hook-form + zod) — emails you via SMTP (see below), attachments included, with a mail-client fallback until configured
- **Dark / light mode** via `next-themes` (defaults to dark)
- **SEO**: dynamic OG image, sitemap, robots, per-route metadata
- **Accessibility**: keyboard-navigable, reduced-motion-aware, semantic landmarks

## Stack

- Next.js 14 (App Router, RSC where it makes sense)
- React 18 + TypeScript (strict)
- Tailwind CSS with CSS-variable theming
- Framer Motion for transitions and reveals
- lucide-react for icons
- next-themes for theming
- react-hook-form + zod for the contact form, nodemailer to deliver it
- react-hot-toast for feedback

## Getting started

```bash
npm install
npm run dev      # http://localhost:3000
npm run build
npm run start
npm run typecheck
npm run lint
```

## Project structure

```
app/
  layout.tsx           # root layout, fonts, theme, navbar/footer
  page.tsx             # home composed of all sections
  globals.css          # Tailwind + CSS-variable tokens
  projects/            # /projects + /projects/[slug]
  blog/                # /blog + /blog/[slug]
  api/contact/         # POST handler that emails form submissions
  not-found.tsx
  sitemap.ts
  robots.ts
  opengraph-image.tsx
components/
  layout/              # Navbar, Footer, ThemeProvider, ThemeToggle, ScrollProgress
  sections/            # Hero, About, Skills, Services, Experience, Stats,
                       # Projects, Testimonials, BlogTeaser, Contact
  ui/                  # Section, Reveal, Counter, Badge
data/
  profile.ts           # name, contact, socials
  experience.ts        # roles + bullets
  projects.ts          # featured + case-study data
  skills.ts            # categorized skill groups
  services.ts          # what I do
  testimonials.ts      # placeholder quotes (replace with real ones)
  blog.ts              # sample posts
  stats.ts             # animated counters
lib/
  types.ts             # shared types
  utils.ts             # cn() and helpers
  contact.ts           # contact form schema (shared by form and API)
  mail.ts              # SMTP transport for contact messages
public/
  Roger_Niyomugabo_FullStack_CV.pdf
```

## Customizing content

All content lives in `data/` as typed TS modules. Edit those files to update the site — no MDX or CMS required.

- Update **socials**, **email**, **phone** in `data/profile.ts`
- Update **experience** entries in `data/experience.ts`
- Add or edit **projects** in `data/projects.ts` — each item drives both the home featured grid and a case-study page
- Add **blog posts** in `data/blog.ts` — `body` supports plain paragraphs and `## Subheadings`
- Replace **testimonials** in `data/testimonials.ts` with attributed quotes once you have permission

## Contact form email

Submissions are sent to you by email through SMTP. Copy `.env.example` to `.env` (or `.env.local`) and set:

- `API_SENDER_EMAIL` — the account that sends the mail. With Gmail, turn on 2-Step Verification and create an App Password at https://myaccount.google.com/apppasswords.
- `EMAIL_PASSWORD` — that App Password (or the SMTP password for another provider).
- `CONTACT_TO_EMAIL` (optional) — where messages arrive; defaults to the email in `data/profile.ts`.
- `SMTP_HOST` / `SMTP_PORT` (optional) — defaults are Gmail's (`smtp.gmail.com`, `465`).

Add the same variables in your host's environment settings (for example the Vercel project settings) — `.env` files are not deployed. Each message arrives with the visitor's address as Reply-To, so you can answer directly. The API limits each visitor to 5 messages per 10 minutes and ignores bot submissions that fill the hidden field. Until the variables are set, the form falls back to opening the visitor's own email app.

Visitors can attach up to 5 files (PDF, Office documents, text files or images) totalling 4 MB; they arrive as attachments on the email. The 4 MB cap keeps requests under Vercel's 4.5 MB function body limit — if you host elsewhere, raise `MAX_ATTACHMENTS_MB` in `lib/contact.ts`.

## Deployment

Designed to deploy seamlessly on Vercel — push the repo and the OG image, sitemap, and robots will all generate automatically.

For Digital Ocean / self-hosted, run `npm run build && npm run start` behind a reverse proxy.
