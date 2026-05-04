"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Section } from "@/components/ui/Section";
import { testimonials } from "@/data/testimonials";

export function Testimonials() {
  const [index, setIndex] = useState(0);
  const total = testimonials.length;

  const go = (dir: 1 | -1) =>
    setIndex((i) => (i + dir + total) % total);

  const current = testimonials[index];

  return (
    <Section
      id="testimonials"
      eyebrow="Kind words"
      title={<>What collaborators say.</>}
      description="People I've shipped with — managers, peers, partners, and folks I've mentored."
    >
      <div className="relative mx-auto max-w-3xl">
        <div className="rounded-2xl border border-border bg-surface p-8 md:p-12">
          <Quote
            className="mb-6 h-10 w-10 text-brand-500/40"
            aria-hidden
          />
          <AnimatePresence mode="wait">
            <motion.blockquote
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.35 }}
              className="text-lg leading-relaxed text-fg md:text-xl"
            >
              &ldquo;{current.quote}&rdquo;
            </motion.blockquote>
          </AnimatePresence>

          <div className="mt-8 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="grid h-12 w-12 place-items-center rounded-full bg-gradient-to-br from-brand-500 to-fuchsia-500 font-display text-sm font-semibold text-white">
                {current.initials}
              </span>
              <div>
                <p className="font-display text-base font-semibold">
                  {current.name}
                </p>
                <p className="text-sm text-muted">{current.role}</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                aria-label="Previous testimonial"
                onClick={() => go(-1)}
                className="grid h-10 w-10 place-items-center rounded-full border border-border bg-bg transition-colors hover:border-brand-500 hover:text-brand-500"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button
                type="button"
                aria-label="Next testimonial"
                onClick={() => go(1)}
                className="grid h-10 w-10 place-items-center rounded-full border border-border bg-bg transition-colors hover:border-brand-500 hover:text-brand-500"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

        <div className="mt-5 flex justify-center gap-2">
          {testimonials.map((t, i) => (
            <button
              key={t.name}
              aria-label={`Show testimonial from ${t.name}`}
              onClick={() => setIndex(i)}
              className={`h-1.5 rounded-full transition-all ${
                i === index
                  ? "w-8 bg-brand-500"
                  : "w-1.5 bg-border hover:bg-muted"
              }`}
            />
          ))}
        </div>
      </div>
    </Section>
  );
}
