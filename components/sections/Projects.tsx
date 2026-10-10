"use client";

import Link from "next/link";
import { useState, type PointerEvent } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform
} from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { Badge } from "@/components/ui/Badge";
import { ProjectVisual } from "@/components/ui/ProjectVisual";
import { projects } from "@/data/projects";
import type { Project } from "@/lib/types";
import { cn } from "@/lib/utils";

// Featured work first, then the rest.
const list = [...projects].sort(
  (a, b) => Number(Boolean(b.featured)) - Number(Boolean(a.featured))
);

const pad = (n: number) => String(n).padStart(2, "0");

export function Projects({ heading = true }: { heading?: boolean }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const active = list[activeIndex];

  return (
    <Section
      id="projects"
      index={heading ? "05" : undefined}
      heading={heading ? "work." : undefined}
      title={heading ? <>Selected work.</> : undefined}
      description={
        heading
          ? "Projects that show how I approach product, architecture, and delivery. Open one for the full case study."
          : undefined
      }
    >
      <Reveal>
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
          {/* Preview of whichever row is under the pointer (desktop only) */}
          <div className="hidden lg:col-span-5 lg:block">
            <div className="sticky top-28">
              <Preview project={active} index={activeIndex + 1} total={list.length} />
              <div className="mt-5 flex items-center justify-between gap-4">
                <p className="section-index">
                  {active.category} · {active.year}
                </p>
                <Link
                  href={`/projects/${active.slug}`}
                  className="link-slide inline-flex items-center gap-1.5 text-sm font-semibold"
                >
                  Open case study
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
              </div>
              <div className="mt-4 flex flex-wrap gap-1.5">
                {active.stack.map((tech) => (
                  <Badge key={tech}>{tech}</Badge>
                ))}
              </div>
            </div>
          </div>

          <ol className="border-t border-border lg:col-span-7">
            {list.map((project, idx) => {
              const isActive = idx === activeIndex;
              return (
                <li key={project.slug} className="border-b border-border">
                  <Link
                    href={`/projects/${project.slug}`}
                    onMouseEnter={() => setActiveIndex(idx)}
                    onFocus={() => setActiveIndex(idx)}
                    className="group relative grid grid-cols-[auto_1fr_auto] items-center gap-4 py-5 md:grid-cols-[3rem_auto_1fr_auto] md:gap-6 md:py-6 lg:grid-cols-[3rem_1fr_auto]"
                  >
                    <span
                      aria-hidden
                      className={cn(
                        "absolute left-0 top-0 h-full w-px origin-top bg-accent transition-transform duration-300",
                        isActive ? "scale-y-100" : "scale-y-0"
                      )}
                    />
                    <span
                      className={cn(
                        "hidden font-mono text-sm transition-colors md:inline",
                        isActive ? "text-accent" : "text-muted"
                      )}
                    >
                      {pad(idx + 1)}
                    </span>
                    <Thumb project={project} />
                    <span
                      className={cn(
                        "min-w-0 transition-transform duration-300",
                        isActive && "lg:translate-x-2"
                      )}
                    >
                      <span className="block font-display text-lg font-semibold leading-snug md:text-2xl lg:truncate lg:text-3xl">
                        {project.title}
                      </span>
                      <span className="mt-1 block text-sm text-subtle md:text-base">
                        {project.tagline}
                      </span>
                    </span>
                    <span className="flex items-center gap-4">
                      <span className="hidden font-mono text-xs text-muted md:inline">
                        {project.year}
                      </span>
                      <ArrowUpRight
                        className={cn(
                          "h-5 w-5 transition-all duration-300",
                          isActive ? "text-accent" : "text-muted lg:-translate-x-1 lg:opacity-0"
                        )}
                      />
                    </span>
                  </Link>
                </li>
              );
            })}
          </ol>
        </div>
      </Reveal>
    </Section>
  );
}

// Small live render of the mockup for the rows on narrow screens.
function Thumb({ project }: { project: Project }) {
  return (
    <span
      aria-hidden
      className="relative block h-[72px] w-24 shrink-0 overflow-hidden rounded-md border border-border lg:hidden"
    >
      <span className="absolute left-0 top-0 block h-60 w-80 origin-top-left scale-[0.3]">
        <ProjectVisual project={project} showYear={false} className="h-full w-full" />
      </span>
    </span>
  );
}

// Crossfades between projects and tilts a few degrees toward the pointer.
function Preview({ project, index, total }: { project: Project; index: number; total: number }) {
  const reduceMotion = useReducedMotion();
  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);
  const rotateX = useSpring(useTransform(py, [0, 1], [5, -5]), { stiffness: 150, damping: 20 });
  const rotateY = useSpring(useTransform(px, [0, 1], [-6, 6]), { stiffness: 150, damping: 20 });

  const onPointerMove = (e: PointerEvent<HTMLDivElement>) => {
    if (reduceMotion || e.pointerType !== "mouse") return;
    const rect = e.currentTarget.getBoundingClientRect();
    px.set((e.clientX - rect.left) / rect.width);
    py.set((e.clientY - rect.top) / rect.height);
  };

  const reset = () => {
    px.set(0.5);
    py.set(0.5);
  };

  return (
    <motion.div
      onPointerMove={onPointerMove}
      onPointerLeave={reset}
      style={{ rotateX, rotateY, transformPerspective: 1200 }}
      className="relative aspect-[4/3] overflow-hidden rounded-lg border border-border shadow-2xl shadow-black/30"
    >
      <AnimatePresence initial={false}>
        <motion.div
          key={project.slug}
          initial={{ opacity: 0, scale: 1.02 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-0"
        >
          <ProjectVisual project={project} className="h-full w-full" />
        </motion.div>
      </AnimatePresence>
      <span className="absolute left-4 top-4 rounded-[4px] bg-ink px-2.5 py-1 font-mono text-xs text-accent">
        {pad(index)} / {pad(total)}
      </span>
    </motion.div>
  );
}
