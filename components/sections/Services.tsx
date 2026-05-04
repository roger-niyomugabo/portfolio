import { Layout, Server, Container, Users, type LucideIcon } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { services } from "@/data/services";

const iconMap: Record<string, LucideIcon> = {
  layout: Layout,
  server: Server,
  container: Container,
  users: Users
};

export function Services() {
  return (
    <Section
      id="services"
      eyebrow="What I do"
      title={<>How I can help your team ship.</>}
      description="Whether you need a feature delivered end-to-end, a backend that holds up under load, or a senior eye on your codebase — here's where I tend to add the most value."
    >
      <div className="grid gap-5 md:grid-cols-2">
        {services.map((service, idx) => {
          const Icon = iconMap[service.icon] ?? Layout;
          return (
            <Reveal key={service.title} delay={idx * 0.05}>
              <div className="group relative h-full overflow-hidden rounded-2xl border border-border bg-surface p-6 transition-all hover:border-brand-500/50 md:p-8">
                <div className="relative flex h-full flex-col">
                  <div className="mb-5 flex items-center gap-3">
                    <span className="grid h-12 w-12 place-items-center rounded-xl bg-gradient-to-br from-brand-500 to-fuchsia-500 text-white shadow-lg shadow-brand-500/20">
                      <Icon className="h-5 w-5" />
                    </span>
                    <h3 className="font-display text-xl font-semibold">
                      {service.title}
                    </h3>
                  </div>
                  <p className="mb-5 text-sm leading-relaxed text-subtle md:text-base">
                    {service.blurb}
                  </p>
                  <ul className="mt-auto space-y-2 text-sm text-subtle">
                    {service.bullets.map((b) => (
                      <li key={b} className="flex items-start gap-2">
                        <span className="mt-1.5 inline-block h-1 w-1 flex-shrink-0 rounded-full bg-brand-500" />
                        {b}
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
