"use client";

import {
  Code2,
  Monitor,
  Server,
  Database,
  Container,
  CheckCircle2,
  type LucideIcon
} from "lucide-react";
import { motion } from "framer-motion";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { skillGroups } from "@/data/skills";

const iconMap: Record<string, LucideIcon> = {
  code: Code2,
  monitor: Monitor,
  server: Server,
  database: Database,
  container: Container,
  check: CheckCircle2
};

export function Skills() {
  return (
    <Section
      id="skills"
      eyebrow="Skills"
      title={<>The toolbox, organized.</>}
      description="Languages, frameworks, and tools I reach for daily — grouped by where they live in the stack."
    >
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {skillGroups.map((group, idx) => {
          const Icon = iconMap[group.icon] ?? Code2;
          return (
            <Reveal key={group.name} delay={idx * 0.05}>
              <div className="group relative h-full overflow-hidden rounded-2xl border border-border bg-surface p-6 transition-all hover:border-brand-500/50 hover:shadow-lg hover:shadow-brand-500/5">
                <div
                  aria-hidden
                  className="absolute -right-12 -top-12 h-32 w-32 rounded-full bg-gradient-to-br from-brand-500/20 to-fuchsia-500/20 opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100"
                />
                <div className="relative">
                  <div className="mb-5 flex items-center gap-3">
                    <span className="grid h-10 w-10 place-items-center rounded-xl bg-brand-500/10 text-brand-500">
                      <Icon className="h-5 w-5" />
                    </span>
                    <h3 className="font-display text-lg font-semibold">
                      {group.name}
                    </h3>
                  </div>
                  <ul className="space-y-3">
                    {group.items.map((item) => (
                      <li key={item.name}>
                        <div className="mb-1 flex items-center justify-between text-sm">
                          <span className="font-medium text-fg">
                            {item.name}
                          </span>
                          {item.level !== undefined && (
                            <span className="text-xs text-muted">
                              {item.level}%
                            </span>
                          )}
                        </div>
                        {item.level !== undefined && (
                          <div className="h-1.5 w-full overflow-hidden rounded-full bg-bg">
                            <motion.div
                              initial={{ width: 0 }}
                              whileInView={{ width: `${item.level}%` }}
                              viewport={{ once: true, margin: "-40px" }}
                              transition={{
                                duration: 1.1,
                                ease: [0.22, 1, 0.36, 1],
                                delay: 0.1
                              }}
                              className="h-full rounded-full bg-gradient-to-r from-brand-500 to-fuchsia-500"
                            />
                          </div>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Reveal>
          );
        })}
      </div>
    </Section>
  );
}
