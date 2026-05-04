"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Download,
  Github,
  Linkedin,
  MapPin,
  Sparkles
} from "lucide-react";
import { profile } from "@/data/profile";
import { useEffect, useState } from "react";

export function Hero() {
  const [roleIndex, setRoleIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setRoleIndex((i) => (i + 1) % profile.roles.length);
    }, 2400);
    return () => clearInterval(id);
  }, []);

  return (
    <section className="relative overflow-hidden pt-32 pb-20 md:pt-40 md:pb-28">
      {/* Background blobs */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
      >
        <div className="absolute left-1/2 top-0 h-[600px] w-[1100px] -translate-x-1/2 bg-radial-fade" />
        <div className="absolute -top-32 -left-20 h-72 w-72 animate-blob rounded-full bg-brand-500/20 blur-3xl" />
        <div className="absolute -top-10 right-0 h-72 w-72 animate-blob rounded-full bg-fuchsia-500/20 blur-3xl [animation-delay:-4s]" />
        <div className="absolute top-40 left-1/3 h-72 w-72 animate-blob rounded-full bg-cyan-500/20 blur-3xl [animation-delay:-8s]" />
        <div className="absolute inset-0 bg-grid-pattern bg-[size:48px_48px] opacity-40 [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)]" />
      </div>

      <div className="container relative">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-3xl text-center"
        >
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-1.5 text-xs font-medium text-subtle">
            <span className="relative inline-flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
            </span>
            {profile.availabilityLabel}
            <Sparkles className="h-3 w-3 text-brand-500" />
          </div>

          <h1 className="font-display text-4xl font-bold leading-[1.05] tracking-tight md:text-6xl lg:text-7xl">
            Hi, I&apos;m{" "}
            <span className="gradient-text">{profile.firstName}</span>.
            <br />I build softwares that{" "}
            <span className="relative inline-block">
              <span className="gradient-text">scale gracefully</span>
              <svg
                aria-hidden
                className="absolute -bottom-2 left-0 h-2 w-full text-brand-500/50"
                viewBox="0 0 200 8"
                preserveAspectRatio="none"
              >
                <path
                  d="M0 4 Q 50 0 100 4 T 200 4"
                  stroke="currentColor"
                  strokeWidth="2"
                  fill="none"
                />
              </svg>
            </span>
            .
          </h1>

          <div className="mt-6 flex h-7 items-center justify-center gap-2 text-base text-subtle md:text-lg">
            <span>I work as a</span>
            <div className="relative inline-flex h-7 overflow-hidden">
              {profile.roles.map((role, i) => (
                <motion.span
                  key={role}
                  initial={{ y: 28, opacity: 0 }}
                  animate={{
                    y: i === roleIndex ? 0 : -28,
                    opacity: i === roleIndex ? 1 : 0
                  }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute inset-x-0 whitespace-nowrap font-semibold text-brand-500"
                >
                  {role}
                </motion.span>
              ))}
              <span className="invisible whitespace-nowrap font-semibold">
                {profile.roles.reduce((a, b) =>
                  a.length > b.length ? a : b
                )}
              </span>
            </div>
          </div>

          <p className="mx-auto mt-6 max-w-2xl text-base text-subtle md:text-lg">
            {profile.tagline}
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/projects"
              className="group inline-flex items-center gap-2 rounded-full bg-fg px-5 py-3 text-sm font-medium text-bg transition-all hover:opacity-90"
            >
              View my work
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
            <Link
              href={profile.resumeHref}
              target="_blank"
              className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-5 py-3 text-sm font-medium text-fg transition-colors hover:border-brand-500 hover:text-brand-500"
            >
              <Download className="h-4 w-4" />
              Download CV
            </Link>
          </div>

          <div className="mt-8 flex items-center justify-center gap-5 text-sm text-muted">
            <span className="inline-flex items-center gap-1.5">
              <MapPin className="h-4 w-4" />
              {profile.location}
            </span>
            <Link
              className="inline-flex items-center gap-1.5 hover:text-fg"
              target="_blank"
              rel="noreferrer"
              href="https://github.com/roger-niyomugabo"
            >
              <Github className="h-4 w-4" />
              GitHub
            </Link>
            <Link
              className="inline-flex items-center gap-1.5 hover:text-fg"
              target="_blank"
              rel="noreferrer"
              href="https://linkedin.com/in/roger-niyomugabo"
            >
              <Linkedin className="h-4 w-4" />
              LinkedIn
            </Link>
          </div>
        </motion.div>

        {/* Tech ticker */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="relative mt-16 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_15%,black_85%,transparent)]"
        >
          <div className="flex w-max animate-marquee gap-10 text-sm font-medium text-muted">
            {[...Array(2)].map((_, dup) => (
              <div key={dup} className="flex items-center gap-10 pr-10">
                {[
                  "TypeScript",
                  "React",
                  "Next.js",
                  "Node.js",
                  "NestJS",
                  "Django",
                  "PostgreSQL",
                  "Docker",
                  "GitHub Actions",
                  "Tailwind",
                  "WebSockets",
                  "Prisma",
                  "Redis"
                ].map((t) => (
                  <span
                    key={`${dup}-${t}`}
                    className="inline-flex items-center gap-2 whitespace-nowrap"
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-brand-500/60" />
                    {t}
                  </span>
                ))}
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
