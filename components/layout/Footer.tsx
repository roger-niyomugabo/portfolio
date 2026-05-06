import Link from "next/link";
import { Github, Linkedin, Mail, Phone } from "lucide-react";
import { profile } from "@/data/profile";

const iconMap = {
  github: Github,
  linkedin: Linkedin,
  mail: Mail,
  phone: Phone
};

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-24 border-t border-border bg-surface/40">
      <div className="container py-14">
        <div className="grid gap-10 md:grid-cols-3">
          <div>
            <Link
              href="/"
              className="flex items-center gap-2 font-display text-lg font-semibold"
            >
              <span className="grid h-8 w-8 place-items-center rounded-lg bg-gradient-to-br from-brand-500 to-accent-500 text-white shadow-md">
                R
              </span>
              {profile.name}
            </Link>
            <p className="mt-3 max-w-xs text-sm text-subtle">
              {profile.title} based in {profile.location}. Building production
              software end-to-end.
            </p>
          </div>

          <div>
            <h3 className="font-display text-sm font-semibold uppercase tracking-wider text-muted">
              Navigate
            </h3>
            <ul className="mt-4 space-y-2 text-sm text-subtle">
              <li>
                <Link className="hover:text-fg" href="/#about">
                  About
                </Link>
              </li>
              <li>
                <Link className="hover:text-fg" href="/projects">
                  Projects
                </Link>
              </li>
              <li>
                <Link className="hover:text-fg" href="/blog">
                  Blog
                </Link>
              </li>
              <li>
                <Link className="hover:text-fg" href="/#contact">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-display text-sm font-semibold uppercase tracking-wider text-muted">
              Connect
            </h3>
            <ul className="mt-4 flex flex-wrap gap-2">
              {profile.socials.map((s) => {
                const Icon =
                  iconMap[s.icon as keyof typeof iconMap] ?? Mail;
                return (
                  <li key={s.label}>
                    <Link
                      href={s.href}
                      target={s.href.startsWith("http") ? "_blank" : undefined}
                      rel="noreferrer noopener"
                      aria-label={s.label}
                      className="grid h-10 w-10 place-items-center rounded-full border border-border bg-bg transition-colors hover:border-brand-500 hover:text-brand-500"
                    >
                      <Icon className="h-4 w-4" />
                    </Link>
                  </li>
                );
              })}
            </ul>
            <p className="mt-4 text-sm text-subtle">{profile.email}</p>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-start justify-between gap-3 border-t border-border pt-6 text-xs text-muted md:flex-row md:items-center">
          <p>
            © {year} {profile.name}
          </p>
          <p>
            Available worldwide · Based in {profile.location}
          </p>
        </div>
      </div>
    </footer>
  );
}
