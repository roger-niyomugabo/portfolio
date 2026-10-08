"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Github, Linkedin, Mail, Menu, X } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";
import { cn } from "@/lib/utils";
import { profile } from "@/data/profile";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/#about" },
  { label: "Work", href: "/projects" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/#contact" }
];

const iconMap = {
  github: Github,
  linkedin: Linkedin,
  mail: Mail
};

const socials = profile.socials.filter((s) => s.icon in iconMap);

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const isCurrent = (href: string) =>
    href !== "/" && !href.includes("#") && pathname.startsWith(href);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  // While the mobile menu is open, Escape or scrolling the page closes it.
  useEffect(() => {
    if (!open) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      setOpen(false);
      menuButtonRef.current?.focus();
    };
    // Small accidental drags are ignored; a deliberate scroll dismisses it.
    const startY = window.scrollY;
    const onScroll = () => {
      if (Math.abs(window.scrollY - startY) > 40) setOpen(false);
    };

    document.addEventListener("keydown", onKeyDown);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("scroll", onScroll);
    };
  }, [open]);

  return (
    <>
      {/* Catches taps outside the open mobile menu */}
      {open && (
        <div
          aria-hidden
          onClick={() => setOpen(false)}
          className="fixed inset-0 z-30 lg:hidden"
        />
      )}

      <header
        className={cn(
          "fixed inset-x-0 top-0 z-40 border-b transition-all",
          scrolled || open
            ? "border-border bg-bg/90 backdrop-blur"
            : "border-transparent bg-transparent"
        )}
      >
        <nav className="container flex h-20 items-center justify-between lg:grid lg:h-24 lg:grid-cols-[1fr_auto_1fr]">
          <Link
            href="/"
            onClick={() => setOpen(false)}
            className="justify-self-start whitespace-nowrap font-display text-xl font-semibold lg:text-2xl"
          >
            {profile.name}
          </Link>

          <ul className="hidden items-center gap-10 lg:flex">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  aria-current={isCurrent(link.href) ? "page" : undefined}
                  className={cn(
                    "relative text-lg after:absolute after:-bottom-1 after:left-0 after:h-0.5 after:w-0 after:bg-accent after:transition-all hover:after:w-full",
                    isCurrent(link.href) && "after:w-full"
                  )}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-1 lg:col-start-3 lg:justify-self-end">
            <ul className="hidden items-center gap-1 lg:flex">
              {socials.map((s) => {
                const Icon = iconMap[s.icon as keyof typeof iconMap];
                return (
                  <li key={s.label}>
                    <Link
                      href={s.href}
                      target={s.href.startsWith("http") ? "_blank" : undefined}
                      rel="noreferrer noopener"
                      aria-label={s.label}
                      className="inline-flex h-9 w-9 items-center justify-center transition-opacity hover:opacity-60"
                    >
                      <Icon className="h-5 w-5" />
                    </Link>
                  </li>
                );
              })}
            </ul>
            <ThemeToggle />
            <button
              ref={menuButtonRef}
              type="button"
              aria-label="Toggle menu"
              onClick={() => setOpen((v) => !v)}
              className="inline-flex h-9 w-9 items-center justify-center lg:hidden"
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </nav>

        {open && (
          <div className="max-h-[calc(100dvh-5rem-1px)] overflow-y-auto overscroll-contain border-t border-border lg:hidden">
            <ul className="container flex flex-col py-4">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={() => setOpen(false)}
                    aria-current={isCurrent(link.href) ? "page" : undefined}
                    className={cn("block py-2.5 text-lg", isCurrent(link.href) && "text-accent")}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              <li className="mt-2 flex items-center gap-1 border-t border-border pt-4">
                {socials.map((s) => {
                  const Icon = iconMap[s.icon as keyof typeof iconMap];
                  return (
                    <Link
                      key={s.label}
                      href={s.href}
                      target={s.href.startsWith("http") ? "_blank" : undefined}
                      rel="noreferrer noopener"
                      aria-label={s.label}
                      onClick={() => setOpen(false)}
                      className="inline-flex h-9 w-9 items-center justify-center transition-opacity hover:opacity-60"
                    >
                      <Icon className="h-5 w-5" />
                    </Link>
                  );
                })}
              </li>
            </ul>
          </div>
        )}
      </header>
    </>
  );
}
