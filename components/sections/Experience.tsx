"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, MapPin } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { Badge } from "@/components/ui/Badge";
import { experiences } from "@/data/experience";
import { cn } from "@/lib/utils";

export function Experience() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <Section
      id="experience"
      index="04"
      heading="experience."
      title={<>Roles and what I shipped.</>}
      description="Where I've worked, what I owned, and the kinds of problems I helped solve. Open a role for the details."
    >
      <ol className="border-t border-border">
        {experiences.map((exp, idx) => {
          const open = idx === openIndex;
          const panelId = `experience-${idx}`;
          return (
            <li key={`${exp.company}-${exp.start}`} className="border-b border-border">
              <button
                type="button"
                aria-expanded={open}
                aria-controls={panelId}
                onClick={() => setOpenIndex(open ? -1 : idx)}
                className="grid w-full grid-cols-[1fr_auto] items-start gap-x-4 gap-y-1 py-6 text-left md:grid-cols-[12rem_1fr_auto] md:items-center md:gap-x-8 md:py-7"
              >
                <span className="font-mono text-xs uppercase tracking-[0.15em] text-muted md:text-sm">
                  {exp.start} — {exp.end}
                </span>
                <ChevronDown
                  className={cn(
                    "row-span-2 h-5 w-5 self-center transition-transform duration-300 md:row-span-1",
                    open ? "rotate-180 text-accent" : "text-muted"
                  )}
                />
                <span className="md:col-start-2 md:row-start-1">
                  <span
                    className={cn(
                      "block font-display text-xl font-semibold transition-colors md:text-2xl",
                      open && "text-accent"
                    )}
                  >
                    {exp.role}
                  </span>
                  <span className="mt-1 block text-subtle">
                    {exp.company} · {exp.type}
                  </span>
                </span>
              </button>

              <AnimatePresence initial={false}>
                {open && (
                  <motion.div
                    id={panelId}
                    key="panel"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                    className="overflow-hidden"
                  >
                    <div className="grid gap-6 pb-8 md:grid-cols-[12rem_1fr] md:gap-8">
                      <div className="flex flex-wrap items-center gap-2 text-sm text-muted md:flex-col md:items-start">
                        <span className="inline-flex items-center gap-1.5">
                          <MapPin className="h-3.5 w-3.5" />
                          {exp.location}
                        </span>
                        {exp.current && <Badge tone="accent">Current</Badge>}
                      </div>
                      <div>
                        <ul className="space-y-3 leading-relaxed text-subtle">
                          {exp.highlights.map((highlight) => (
                            <li key={highlight} className="flex items-start gap-3">
                              <span className="mt-2.5 inline-block h-1 w-1 flex-shrink-0 rounded-full bg-accent" />
                              {highlight}
                            </li>
                          ))}
                        </ul>
                        <div className="mt-6 flex flex-wrap gap-1.5">
                          {exp.stack.map((tech) => (
                            <Badge key={tech}>{tech}</Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </li>
          );
        })}
      </ol>
    </Section>
  );
}
