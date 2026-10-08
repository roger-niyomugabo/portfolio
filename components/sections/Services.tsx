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
      index="02"
      heading="services."
      title={<>How I can help your team ship.</>}
      description="Whether you need a feature delivered end-to-end, a backend that holds up under load, or a senior eye on your codebase — here's where I tend to add the most value."
    >
      <ol className="border-t border-border">
        {services.map((service, idx) => {
          const Icon = iconMap[service.icon] ?? Layout;
          return (
            <li key={service.title} className="border-b border-border">
              <Reveal className="group grid gap-5 py-8 md:grid-cols-[5rem_1.15fr_1fr] md:gap-10 md:py-10">
                <span className="font-mono text-sm text-muted transition-colors group-hover:text-accent">
                  {String(idx + 1).padStart(2, "0")}
                </span>
                <div>
                  <div className="flex items-center gap-3">
                    <span className="icon-tile h-9 w-9">
                      <Icon className="h-4 w-4" />
                    </span>
                    <h3 className="font-display text-2xl font-semibold md:text-3xl">
                      {service.title}
                    </h3>
                  </div>
                  <p className="mt-4 leading-relaxed text-subtle md:text-lg md:leading-relaxed">
                    {service.blurb}
                  </p>
                </div>
                <ul className="space-y-2.5 text-sm text-subtle md:pt-2 md:text-base">
                  {service.bullets.map((bullet) => (
                    <li key={bullet} className="flex items-start gap-3">
                      <span className="mt-2.5 inline-block h-1 w-1 flex-shrink-0 rounded-full bg-accent" />
                      {bullet}
                    </li>
                  ))}
                </ul>
              </Reveal>
            </li>
          );
        })}
      </ol>
    </Section>
  );
}
