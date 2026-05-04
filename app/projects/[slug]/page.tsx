import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight, Calendar, Tag } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
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
      <div
        className={`relative h-72 bg-gradient-to-br ${project.cover.from} ${project.cover.to} overflow-hidden md:h-96`}
      >
        <div className="absolute inset-0 bg-grid-pattern bg-[size:32px_32px] opacity-30" />
        <span className="absolute inset-0 grid place-items-center text-8xl drop-shadow-2xl md:text-9xl">
          {project.cover.emoji}
        </span>
      </div>

      <div className="container -mt-16 md:-mt-20">
        <div className="mx-auto max-w-3xl rounded-2xl border border-border bg-surface p-6 shadow-xl shadow-black/5 md:p-10">
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

          <h1 className="font-display text-3xl font-bold tracking-tight md:text-4xl">
            {project.title}
          </h1>
          <p className="mt-2 text-lg text-brand-500">{project.tagline}</p>

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
                  className="inline-flex items-center gap-2 rounded-full border border-border bg-bg px-4 py-2 text-sm font-medium hover:border-brand-500"
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
            <h2 className="font-display text-2xl font-semibold tracking-tight">
              Key highlights
            </h2>
            <ul className="mt-4 space-y-3">
              {project.highlights.map((h) => (
                <li
                  key={h}
                  className="flex items-start gap-3 rounded-xl border border-border bg-surface p-4 text-sm leading-relaxed text-subtle"
                >
                  <span className="mt-1.5 inline-block h-1.5 w-1.5 flex-shrink-0 rounded-full bg-brand-500" />
                  {h}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="font-display text-2xl font-semibold tracking-tight">
              Impact
            </h2>
            <ul className="mt-4 grid gap-3 sm:grid-cols-2">
              {project.impact.map((i) => (
                <li
                  key={i}
                  className="rounded-xl border border-border bg-surface p-4 text-sm leading-relaxed text-subtle"
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
                className="group flex items-center justify-between gap-3 rounded-2xl border border-border bg-surface p-4 transition-colors hover:border-brand-500/50"
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
                <ArrowUpRight className="h-5 w-5 flex-shrink-0 text-muted transition-all group-hover:text-brand-500" />
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
      <h2 className="font-display text-2xl font-semibold tracking-tight">
        {title}
      </h2>
      <p className="mt-3 text-base leading-relaxed text-subtle md:text-lg">
        {body}
      </p>
    </div>
  );
}
