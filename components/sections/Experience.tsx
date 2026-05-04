import { Briefcase, Calendar, MapPin } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { Badge } from "@/components/ui/Badge";
import { experiences } from "@/data/experience";

export function Experience() {
  return (
    <Section
      id="experience"
      eyebrow="Experience"
      title={<>Roles and what I shipped.</>}
      description="A timeline of where I've worked, what I owned, and the kinds of problems I helped solve."
    >
      <ol className="relative mx-auto max-w-4xl">
        <span
          aria-hidden
          className="absolute left-4 top-2 h-full w-px bg-gradient-to-b from-brand-500/60 via-border to-transparent md:left-1/2"
        />

        {experiences.map((exp, idx) => (
          <li
            key={`${exp.company}-${exp.start}`}
            className="relative mb-10 last:mb-0"
          >
            <Reveal>
              <div className="md:grid md:grid-cols-2 md:gap-10">
                {/* Timeline dot */}
                <span
                  aria-hidden
                  className="absolute left-4 top-6 -translate-x-1/2 md:left-1/2"
                >
                  <span className="relative grid h-4 w-4 place-items-center">
                    {exp.current && (
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-500 opacity-60" />
                    )}
                    <span className="relative h-3 w-3 rounded-full border-2 border-bg bg-brand-500" />
                  </span>
                </span>

                {/* Card — alternating sides on desktop */}
                <div
                  className={
                    idx % 2 === 0
                      ? "pl-12 md:pl-0 md:pr-12 md:text-right"
                      : "pl-12 md:col-start-2 md:pl-12"
                  }
                >
                  <div className="rounded-2xl border border-border bg-surface p-6 transition-colors hover:border-brand-500/50">
                    <div
                      className={`mb-2 flex flex-wrap items-center gap-2 text-xs text-muted ${
                        idx % 2 === 0 ? "md:justify-end" : ""
                      }`}
                    >
                      <span className="inline-flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {exp.start} — {exp.end}
                      </span>
                      <span className="inline-flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        {exp.location}
                      </span>
                      {exp.current && (
                        <Badge tone="brand">Current</Badge>
                      )}
                    </div>
                    <h3 className="font-display text-lg font-semibold leading-tight">
                      {exp.role}
                    </h3>
                    <p className="mt-1 text-sm font-medium text-brand-500">
                      <span className="inline-flex items-center gap-1.5">
                        <Briefcase className="h-3.5 w-3.5" />
                        {exp.company}
                      </span>
                      <span className="ml-2 text-muted">· {exp.type}</span>
                    </p>
                    <ul
                      className={`mt-4 space-y-2 text-sm leading-relaxed text-subtle ${
                        idx % 2 === 0 ? "md:text-right" : ""
                      }`}
                    >
                      {exp.highlights.map((h) => (
                        <li key={h}>{h}</li>
                      ))}
                    </ul>
                    <div
                      className={`mt-4 flex flex-wrap gap-1.5 ${
                        idx % 2 === 0 ? "md:justify-end" : ""
                      }`}
                    >
                      {exp.stack.map((s) => (
                        <Badge key={s}>{s}</Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
          </li>
        ))}
      </ol>
    </Section>
  );
}
