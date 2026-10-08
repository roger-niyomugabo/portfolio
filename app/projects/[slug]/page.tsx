import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight, Calendar, Tag } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { ProjectVisual } from "@/components/ui/ProjectVisual";
import { projects, getProject } from "@/data/projects";

type Props = { params: { slug: string } };

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: Props): Metadata {
  const project = getProject(params.slug);
  if (!project) return { title: "Project not found" };
  return {
    title: project.title,
    description: project.description
  };
}

export default function ProjectPage({ params }: Props) {
  const project = getProject(params.slug);
  if (!project) notFound();

  const others = projects.filter((p) => p.slug !== project.slug).slice(0, 2);

  return (
    <article className="pt-24">
      <ProjectVisual project={project} className="h-72 md:h-96" />

      <div className="container relative -mt-16 md:-mt-20">
        <div className="card mx-auto max-w-3xl p-6 md:p-10">
          <Link
            href="/projects"
            className="mb-6 inline-flex items-center gap-1.5 text-sm text-muted transition-colors hover:text-fg"
          >
            <ArrowLeft className="h-4 w-4" />
            All projects
          </Link>

          <div className="mb-3 flex flex-wrap items-center gap-2 text-xs text-muted">
            <span className="inline-flex items-center gap-1">
              <Calendar className="h-3.5 w-3.5" />
              {project.year}
            </span>
            <span className="inline-flex items-center gap-1">
              <Tag className="h-3.5 w-3.5" />
              {project.category}
            </span>
          </div>

          <h1 className="font-display text-3xl font-extrabold md:text-5xl md:leading-tight">
            {project.title}
          </h1>
          <p className="mt-2 text-lg font-medium">{project.tagline}</p>

          <p className="mt-6 text-base leading-relaxed text-subtle md:text-lg">
            {project.description}
          </p>

          <div className="mt-6 flex flex-wrap gap-1.5">
            {project.stack.map((s) => (
              <Badge key={s}>{s}</Badge>
            ))}
          </div>

          {project.links && project.links.length > 0 && (
            <div className="mt-6 flex flex-wrap gap-2">
              {project.links.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  target="_blank"
                  className="btn btn-outline"
                >
                  {l.label}
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
              ))}
            </div>
          )}
        </div>

        <div className="mx-auto mt-12 grid max-w-3xl gap-10 pb-16">
          <Section title="The problem" body={project.problem} />
          <Section title="My approach" body={project.solution} />

          <div>
            <h2 className="font-display text-2xl font-semibold md:text-[28px]">
              Key highlights
            </h2>
            <ul className="mt-4 space-y-3">
              {project.highlights.map((h) => (
                <li
                  key={h}
                  className="card flex items-start gap-3 p-4 text-sm leading-relaxed text-subtle"
                >
                  <span className="mt-1.5 inline-block h-1.5 w-1.5 flex-shrink-0 rounded-full bg-accent" />
                  {h}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="font-display text-2xl font-semibold md:text-[28px]">
              Impact
            </h2>
            <ul className="mt-4 grid gap-3 sm:grid-cols-2">
              {project.impact.map((i) => (
                <li
                  key={i}
                  className="card p-4 text-sm leading-relaxed text-subtle"
                >
                  {i}
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-8 grid gap-3 border-t border-border pt-8 sm:grid-cols-2">
            {others.map((o) => (
              <Link
                key={o.slug}
                href={`/projects/${o.slug}`}
                className="card group flex items-center justify-between gap-3 p-4 transition-colors hover:border-accent"
              >
                <div>
                  <p className="text-xs uppercase tracking-wider text-muted">
                    Up next
                  </p>
                  <p className="mt-1 font-display text-lg font-semibold">
                    {o.title}
                  </p>
                  <p className="text-sm text-muted">{o.tagline}</p>
                </div>
                <ArrowUpRight className="h-5 w-5 flex-shrink-0 text-muted transition-all group-hover:text-accent" />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </article>
  );
}

function Section({ title, body }: { title: string; body: string }) {
  return (
    <div>
      <h2 className="font-display text-2xl font-semibold md:text-[28px]">
        {title}
      </h2>
      <p className="mt-3 text-base leading-relaxed text-subtle md:text-lg">
        {body}
      </p>
    </div>
  );
}
