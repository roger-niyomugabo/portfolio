"use client";

import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { Clock } from "lucide-react";
import { profile } from "@/data/profile";
import { skillGroups } from "@/data/skills";
import { LocalTime } from "@/components/ui/LocalTime";
import { Magnetic } from "@/components/ui/Magnetic";
import { Marquee } from "@/components/ui/Marquee";
import { TextReveal } from "@/components/ui/TextReveal";
import { cn } from "@/lib/utils";

const initials = profile.name
  .split(" ")
  .map((part) => part[0])
  .join("");

// Daily-driver tools for the ticker: the strongest items outside the practices group.
const tools = skillGroups
  .filter((group) => group.name !== "Testing & Practices")
  .flatMap((group) => group.items)
  .filter((item) => (item.level ?? 0) >= 88)
  .map((item) => item.name);

function Chip({ className, children }: { className?: string; children: ReactNode }) {
  return <span className={cn("chip", className)}>{children}</span>;
}

function Availability() {
  return (
    <>
      <span className="relative flex h-2 w-2">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60" />
        <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
      </span>
      {profile.availabilityLabel}
    </>
  );
}

function TimeNow() {
  return (
    <>
      <Clock className="h-3.5 w-3.5 text-accent" />
      <LocalTime /> in Kigali
    </>
  );
}

export function Hero() {
  return (
    <section className="relative overflow-hidden pt-32 md:pt-40">
      <div aria-hidden className="glow -right-24 -top-24 h-[520px] w-[520px]" />
      <div aria-hidden className="glow -left-40 top-1/3 h-[420px] w-[420px] opacity-60" />

      <div className="container relative grid items-center gap-16 pb-16 lg:grid-cols-[1.15fr_0.85fr] lg:pb-24">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-xl font-medium md:text-[28px] md:leading-snug">
            Hello, I&apos;m {profile.firstName},
          </p>
          <h1 className="mt-1 font-display text-[clamp(3rem,11vw,6rem)] font-extrabold leading-[1.15]">
            {profile.headline.map((line, i) => (
              <TextReveal key={line} text={line} delay={0.15 + i * 0.12} className="block" />
            ))}
          </h1>
          <p className="mt-1 text-xl font-medium md:text-[28px] md:leading-snug">
            based in {profile.location}.
          </p>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-subtle md:text-lg">
            {profile.tagline}
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Magnetic>
              <Link href={profile.resumeHref} target="_blank" className="btn btn-primary btn-lg">
                Resume
              </Link>
            </Magnetic>
            <Link href="/#contact" className="btn btn-outline btn-lg">
              Let&apos;s talk
            </Link>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="mx-auto w-full max-w-[320px] sm:max-w-[420px] lg:mr-0 lg:max-w-[480px]"
        >
          <div className="relative aspect-square">
            {/* Offset outline */}
            <span
              aria-hidden
              className="absolute -inset-2 rotate-[8deg] rounded-[58%_42%_44%_56%/50%_46%_54%_50%] border border-deco"
            />

            <div className="accent-panel relative h-full w-full overflow-hidden rounded-[58%_42%_44%_56%/50%_46%_54%_50%]">
              {profile.photo ? (
                <Image
                  src={profile.photo}
                  alt={profile.name}
                  fill
                  priority
                  sizes="(min-width: 1024px) 480px, (min-width: 640px) 420px, 320px"
                  className="object-cover"
                />
              ) : (
                <span
                  aria-hidden
                  className="grid h-full w-full place-items-center font-display text-7xl font-extrabold sm:text-8xl"
                >
                  {initials}
                </span>
              )}
            </div>

            {/* Plus signs */}
            <svg
              aria-hidden
              viewBox="0 0 52 56"
              className="absolute -top-3 right-3 h-12 w-12 text-deco sm:h-14 sm:w-14"
              fill="none"
              stroke="currentColor"
              strokeWidth="5"
              strokeLinecap="round"
            >
              <path d="M3 28h18M12 19v18" />
              <path d="M29 10h18M38 1v18" />
              <path d="M29 44h18M38 35v18" />
            </svg>

            {/* Slashes */}
            <svg
              aria-hidden
              viewBox="0 0 104 32"
              className="absolute -left-4 bottom-[18%] h-6 w-20 text-deco sm:h-8 sm:w-[104px]"
              fill="none"
              stroke="currentColor"
              strokeWidth="5"
              strokeLinecap="round"
            >
              <path d="M14 3 3 29M34 3 23 29M54 3 43 29M74 3 63 29M94 3 83 29" />
            </svg>

            <Chip className="absolute -left-8 top-8 hidden sm:inline-flex">
              <Availability />
            </Chip>
            <Chip className="absolute -right-4 bottom-12 hidden sm:inline-flex">
              <TimeNow />
            </Chip>
          </div>

          <div className="mt-6 flex flex-wrap justify-center gap-3 sm:hidden">
            <Chip>
              <Availability />
            </Chip>
            <Chip>
              <TimeNow />
            </Chip>
          </div>
        </motion.div>
      </div>

      <div className="relative border-y border-border py-4">
        <Marquee duration={45}>
          {tools.map((tool) => (
            <span
              key={tool}
              className="flex items-center gap-6 pr-6 font-mono text-xs uppercase tracking-[0.2em] text-muted"
            >
              {tool}
              <span aria-hidden className="text-accent">
                ✦
              </span>
            </span>
          ))}
        </Marquee>
      </div>
    </section>
  );
}
