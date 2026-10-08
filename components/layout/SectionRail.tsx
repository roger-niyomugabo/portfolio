"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

const sections = [
  { id: "about", index: "01", label: "about" },
  { id: "services", index: "02", label: "services" },
  { id: "skills", index: "03", label: "stack" },
  { id: "experience", index: "04", label: "experience" },
  { id: "projects", index: "05", label: "work" },
  { id: "testimonials", index: "06", label: "praise" },
  { id: "writing", index: "07", label: "writing" },
  { id: "contact", index: "08", label: "contact" }
];

// Fixed index of the home page's sections, shown once the reader is past the
// hero; the section crossing the middle of the viewport is highlighted.
export function SectionRail() {
  const [active, setActive] = useState<string>();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActive(entry.target.id);
          } else {
            setActive((current) => (current === entry.target.id ? undefined : current));
          }
        }
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );
    for (const { id } of sections) {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    }
    return () => observer.disconnect();
  }, []);

  return (
    <nav
      aria-label="Sections"
      className={cn(
        "fixed right-6 top-1/2 z-30 hidden -translate-y-1/2 transition-opacity duration-500 min-[1400px]:block",
        active ? "opacity-100" : "pointer-events-none opacity-0"
      )}
    >
      <ol className="space-y-3">
        {sections.map((s) => {
          const isActive = s.id === active;
          return (
            <li key={s.id} className="relative">
              <a href={`#${s.id}`} className="group flex items-center justify-end gap-3 py-0.5">
                {/* Name floats to the left so it never widens the rail */}
                <span className="section-index pointer-events-none absolute right-full mr-3 whitespace-nowrap opacity-0 transition-opacity group-hover:opacity-100">
                  {s.label}
                </span>
                <span
                  className={cn(
                    "font-mono text-[11px] transition-colors",
                    isActive ? "text-accent" : "text-muted group-hover:text-fg"
                  )}
                >
                  {s.index}
                </span>
                <span
                  className={cn(
                    "h-px transition-all duration-300",
                    isActive ? "w-8 bg-accent" : "w-4 bg-border group-hover:bg-muted"
                  )}
                />
              </a>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
