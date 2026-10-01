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
      heading="services."
      title={<>How I can help your team ship.</>}
      description="Whether you need a feature delivered end-to-end, a backend that holds up under load, or a senior eye on your codebase — here's where I tend to add the most value."
    >
      <div className="grid gap-5 md:grid-cols-2">
        {services.map((service, idx) => {
          const Icon = iconMap[service.icon] ?? Layout;
          return (
            <Reveal key={service.title} delay={idx * 0.05}>
              <div className="card flex h-full flex-col p-6 transition-colors hover:border-accent md:p-8">
                <div className="mb-5 flex items-center gap-4">
                  <span className="icon-tile h-12 w-12">
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
                    <li key={b} className="flex items-start gap-2.5">
                      <span className="mt-2 inline-block h-1 w-1 flex-shrink-0 rounded-full bg-accent" />
                      {b}
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
