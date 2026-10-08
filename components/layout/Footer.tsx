import Link from "next/link";
import { ArrowUp, ArrowUpRight } from "lucide-react";
import { LocalTime } from "@/components/ui/LocalTime";
import { profile } from "@/data/profile";

const navigate = [
  { label: "About", href: "/#about" },
  { label: "Work", href: "/projects" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/#contact" }
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative mt-24 overflow-hidden border-t border-border">
      <div aria-hidden className="glow -bottom-56 left-1/2 h-[520px] w-[760px] -translate-x-1/2" />

      <div className="container relative py-16 md:py-20">
        <div className="grid gap-12 md:grid-cols-[1.3fr_1fr] md:items-end">
          <div>
            <p className="section-index">Next step</p>
            <p className="mt-5 font-display text-4xl font-extrabold leading-[1.05] md:text-6xl">
              Have a project in mind?
            </p>
            <a
              href={`mailto:${profile.email}`}
              className="link-slide mt-6 inline-flex items-center gap-2 text-xl font-medium text-accent md:text-2xl"
            >
              Say hello
              <ArrowUpRight className="h-5 w-5" />
            </a>
          </div>

          <div className="grid grid-cols-2 gap-8">
            <div>
              <h3 className="section-index">Navigate</h3>
              <ul className="mt-4 space-y-2 text-base">
                {navigate.map((item) => (
                  <li key={item.href}>
                    <Link className="link-slide" href={item.href}>
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="section-index">Connect</h3>
              <ul className="mt-4 space-y-2 text-base">
                {profile.socials.map((s) => (
                  <li key={s.label}>
                    <Link
                      className="link-slide"
                      href={s.href}
                      target={s.href.startsWith("http") ? "_blank" : undefined}
                      rel="noreferrer noopener"
                    >
                      {s.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-3 border-t border-border pt-6 text-xs text-muted md:flex-row md:items-center md:justify-between">
          <p>
            © {year} {profile.name}
          </p>
          <p>
            {profile.location} · <LocalTime /> local time
          </p>
          <a href="#top" className="inline-flex items-center gap-1 transition-colors hover:text-fg">
            Back to top
            <ArrowUp className="h-3.5 w-3.5" />
          </a>
        </div>
      </div>
    </footer>
  );
}
