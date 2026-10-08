import {
  Code2,
  Monitor,
  Server,
  Database,
  Container,
  CheckCircle2,
  type LucideIcon
} from "lucide-react";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { skillGroups } from "@/data/skills";
import { cn } from "@/lib/utils";

const iconMap: Record<string, LucideIcon> = {
  code: Code2,
  monitor: Monitor,
  server: Server,
  database: Database,
  container: Container,
  check: CheckCircle2
};

// Tools at or above this level are the ones used day to day.
const DAILY = 88;

export function Skills() {
  return (
    <Section
      id="skills"
      index="03"
      heading="stack."
      layout="sticky"
      title={<>The toolbox, organized.</>}
      description="Grouped by where it lives in the stack. The highlighted tools are the ones I reach for every day."
      aside={
        <p className="mt-8 flex items-center gap-2 text-sm text-muted">
          <span className="inline-block h-3 w-6 rounded-[3px] border border-accent/50 bg-accent/10" />
          daily driver
        </p>
      }
    >
      <div className="grid gap-x-10 gap-y-10 sm:grid-cols-2">
        {skillGroups.map((group, idx) => {
          const Icon = iconMap[group.icon] ?? Code2;
          return (
            <Reveal key={group.name} delay={idx * 0.04}>
              <div className="border-t border-border pt-5">
                <div className="flex items-center gap-3">
                  <span className="icon-tile h-9 w-9">
                    <Icon className="h-4 w-4" />
                  </span>
                  <h3 className="font-display text-lg font-semibold">{group.name}</h3>
                </div>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <li
                      key={item.name}
                      className={cn(
                        "rounded-[4px] border px-2.5 py-1 text-sm",
                        (item.level ?? 0) >= DAILY
                          ? "border-accent/50 bg-accent/10 font-medium text-fg"
                          : "border-border text-subtle"
                      )}
                    >
                      {item.name}
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
