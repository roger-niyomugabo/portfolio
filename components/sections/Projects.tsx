import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { Badge } from "@/components/ui/Badge";
import { projects } from "@/data/projects";

export function Projects({
  showAll = false,
  heading = true
}: {
  showAll?: boolean;
  heading?: boolean;
}) {
  const list = showAll ? projects : projects.filter((p) => p.featured);

  return (
    <Section
      id="projects"
      heading={heading ? "work." : undefined}
      title={heading ? <>Selected work.</> : undefined}
      description={
        heading
          ? "A handful of projects that illustrate how I approach product, architecture, and delivery."
          : undefined
      }
    >
      <div className="grid gap-5 md:grid-cols-2">
        {list.map((p, idx) => (
          <Reveal key={p.slug} delay={idx * 0.05}>
            <Link
              href={`/projects/${p.slug}`}
              className="card group flex h-full flex-col overflow-hidden transition-all hover:-translate-y-1 hover:border-accent"
            >
              <div className="accent-panel relative h-48 border-b border-border">
                <span className="absolute inset-0 grid place-items-center text-7xl">
                  {p.cover.emoji}
                </span>
                <span className="absolute right-4 top-4 rounded-[4px] bg-ink px-2.5 py-1 text-xs font-medium text-accent">
                  {p.year}
                </span>
              </div>
              <div className="flex flex-1 flex-col p-6">
                <div className="mb-2 flex items-center justify-between gap-3">
                  <h3 className="font-display text-xl font-semibold">
                    {p.title}
                  </h3>
                  <Badge tone="accent">{p.category}</Badge>
                </div>
                <p className="mb-4 text-sm text-muted">{p.tagline}</p>
                <p className="mb-5 line-clamp-3 text-sm leading-relaxed text-subtle">
                  {p.description}
                </p>
                <div className="mb-5 flex flex-wrap gap-1.5">
                  {p.stack.slice(0, 5).map((s) => (
                    <Badge key={s}>{s}</Badge>
                  ))}
                  {p.stack.length > 5 && (
                    <Badge>+{p.stack.length - 5}</Badge>
                  )}
                </div>
                <span className="mt-auto inline-flex items-center gap-1.5 text-sm font-semibold transition-all group-hover:gap-2.5">
                  Read case study
                  <ArrowUpRight className="h-4 w-4" />
                </span>
              </div>
            </Link>
          </Reveal>
        ))}
      </div>

      {!showAll && (
        <div className="mt-10">
          <Link href="/projects" className="btn btn-outline">
            See all projects
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>
      )}
    </Section>
  );
}
