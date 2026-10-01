"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { profile } from "@/data/profile";

const initials = profile.name
  .split(" ")
  .map((part) => part[0])
  .join("");

export function Hero() {
  return (
    <section className="overflow-hidden pb-16 pt-32 md:pb-24 md:pt-44">
      <div className="container grid items-center gap-16 lg:grid-cols-[1.15fr_0.85fr]">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-xl font-medium md:text-[28px] md:leading-snug">
            Hello, I&apos;m {profile.firstName},
          </p>
          <h1 className="mt-1 font-display text-[clamp(3rem,11vw,6rem)] font-extrabold leading-[1.15]">
            {profile.headline.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </h1>
          <p className="mt-1 text-xl font-medium md:text-[28px] md:leading-snug">
            based in {profile.location}.
          </p>
          <Link
            href={profile.resumeHref}
            target="_blank"
            className="btn btn-primary btn-lg mt-8"
          >
            Resume
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="relative mx-auto aspect-square w-full max-w-[320px] sm:max-w-[420px] lg:mr-0 lg:max-w-[480px]"
        >
          {/* Offset outline */}
          <span
            aria-hidden
            className="absolute -inset-2 rotate-[8deg] rounded-[58%_42%_44%_56%/50%_46%_54%_50%] border border-deco"
          />

          <div className="relative h-full w-full accent-panel overflow-hidden rounded-[58%_42%_44%_56%/50%_46%_54%_50%]">
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
        </motion.div>
      </div>
    </section>
  );
}
