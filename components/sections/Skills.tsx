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
      heading="skills."
      title={<>The toolbox, organized.</>}
      description="Languages, frameworks, and tools I reach for daily — grouped by where they live in the stack."
    >
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {skillGroups.map((group, idx) => {
          const Icon = iconMap[group.icon] ?? Code2;
          return (
            <Reveal key={group.name} delay={idx * 0.05}>
              <div className="card h-full p-6 transition-colors hover:border-accent">
                <div className="mb-5 flex items-center gap-3">
                  <span className="icon-tile h-10 w-10">
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
                        <span className="font-medium text-fg">{item.name}</span>
                        {item.level !== undefined && (
                          <span className="text-xs text-muted">
                            {item.level}%
                          </span>
                        )}
                      </div>
                      {item.level !== undefined && (
                        <div className="h-1.5 w-full overflow-hidden rounded-full bg-fg/10">
                          <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: `${item.level}%` }}
                            viewport={{ once: true, margin: "-40px" }}
                            transition={{
                              duration: 1.1,
                              ease: [0.22, 1, 0.36, 1],
                              delay: 0.1
                            }}
                            className="h-full rounded-full bg-accent"
                          />
                        </div>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          );
        })}
      </div>
    </Section>
  );
}
