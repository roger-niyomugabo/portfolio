import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { Badge } from "@/components/ui/Badge";
import { ProjectVisual } from "@/components/ui/ProjectVisual";
import { projects } from "@/data/projects";
import { cn } from "@/lib/utils";

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
      index={heading ? "05" : undefined}
      heading={heading ? "work." : undefined}
      title={heading ? <>Selected work.</> : undefined}
      description={
        heading
          ? "A handful of projects that illustrate how I approach product, architecture, and delivery."
          : undefined
      }
    >
      <div className="space-y-20 md:space-y-28">
        {list.map((project, idx) => {
          const flip = idx % 2 === 1;
          const href = `/projects/${project.slug}`;
          return (
            <Reveal key={project.slug}>
              <article className="grid items-center gap-8 lg:grid-cols-12 lg:gap-12">
                <Link
                  href={href}
                  aria-label={`${project.title} case study`}
                  className={cn("group block lg:col-span-7", flip && "lg:order-2")}
                >
                  <ProjectVisual
                    project={project}
                    className="aspect-[4/3] rounded-lg border border-border transition-transform duration-500 group-hover:scale-[1.01] sm:aspect-[16/10]"
                  />
                </Link>
                <div className={cn("lg:col-span-5", flip && "lg:order-1")}>
                  <p className="section-index">
                    {String(idx + 1).padStart(2, "0")} — {project.category} · {project.year}
                  </p>
                  <h3 className="mt-4 font-display text-3xl font-semibold md:text-4xl">
                    <Link href={href} className="link-slide">
                      {project.title}
                    </Link>
                  </h3>
                  <p className="mt-2 text-lg text-subtle">{project.tagline}</p>
                  <p className="mt-5 leading-relaxed text-subtle">{project.description}</p>
                  <div className="mt-5 flex flex-wrap gap-1.5">
                    {project.stack.map((tech) => (
                      <Badge key={tech}>{tech}</Badge>
                    ))}
                  </div>
                  <Link href={href} className="btn btn-outline mt-8">
                    Read case study
                    <ArrowUpRight className="h-4 w-4" />
                  </Link>
                </div>
              </article>
            </Reveal>
          );
        })}
      </div>

      {!showAll && (
        <div className="mt-16">
          <Link href="/projects" className="btn btn-outline">
            All projects ({projects.length})
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>
      )}
    </Section>
  );
}
