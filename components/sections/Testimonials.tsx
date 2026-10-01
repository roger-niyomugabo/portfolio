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
      heading="praise."
      title={<>What collaborators say.</>}
      description="People I've shipped with — managers, peers, partners, and folks I've mentored."
    >
      <div className="relative max-w-3xl">
        <div className="card p-8 md:p-12">
          <Quote
            className="mb-6 h-10 w-10 fill-accent text-accent"
            aria-hidden
          />
          <AnimatePresence mode="wait">
            <motion.blockquote
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.35 }}
              className="text-lg font-medium leading-relaxed text-fg md:text-xl md:leading-relaxed"
            >
              &ldquo;{current.quote}&rdquo;
            </motion.blockquote>
          </AnimatePresence>

          <div className="mt-8 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="icon-tile h-12 w-12 rounded-full font-display text-sm font-semibold">
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
                className="btn btn-outline h-10 w-10 p-0"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button
                type="button"
                aria-label="Next testimonial"
                onClick={() => go(1)}
                className="btn btn-outline h-10 w-10 p-0"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

        <div className="mt-5 flex gap-2">
          {testimonials.map((t, i) => (
            <button
              key={t.name}
              aria-label={`Show testimonial from ${t.name}`}
              onClick={() => setIndex(i)}
              className={`h-1.5 rounded-full transition-all ${
                i === index ? "w-8 bg-accent" : "w-1.5 bg-border hover:bg-muted"
              }`}
            />
          ))}
        </div>
      </div>
    </Section>
  );
}
