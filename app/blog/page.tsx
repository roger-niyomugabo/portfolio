import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, Calendar, Clock } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { posts } from "@/data/blog";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Notes on software engineering, architecture, performance, and shipping software with distributed teams."
};

export default function BlogPage() {
  const sorted = [...posts].sort((a, b) => (a.date < b.date ? 1 : -1));

  return (
    <div className="pt-24">
      <div className="container pt-12 text-center">
        <p className="mb-3 inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-1 text-xs font-medium uppercase tracking-wider text-brand-500">
          <span className="inline-block h-1.5 w-1.5 rounded-full bg-brand-500" />
          Writing
        </p>
        <h1 className="font-display text-4xl font-bold tracking-tight md:text-5xl">
          The <span className="gradient-text">blog</span>.
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-base text-subtle md:text-lg">
          Lessons from production: backend performance, frontend architecture,
          and how to ship software well in distributed teams.
        </p>
      </div>

      <div className="container py-16">
        <div className="mx-auto max-w-3xl space-y-4">
          {sorted.map((p) => (
            <Link
              key={p.slug}
              href={`/blog/${p.slug}`}
              className="group block rounded-2xl border border-border bg-surface p-6 transition-all hover:-translate-y-0.5 hover:border-brand-500/50 md:p-8"
            >
              <div className="mb-3 flex flex-wrap items-center gap-3 text-xs text-muted">
                <span className="inline-flex items-center gap-1">
                  <Calendar className="h-3.5 w-3.5" />
                  {new Date(p.date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric"
                  })}
                </span>
                <span className="inline-flex items-center gap-1">
                  <Clock className="h-3.5 w-3.5" />
                  {p.readingMinutes} min read
                </span>
              </div>
              <h2 className="font-display text-xl font-semibold tracking-tight transition-colors group-hover:text-brand-500 md:text-2xl">
                {p.title}
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-subtle md:text-base">
                {p.excerpt}
              </p>
              <div className="mt-4 flex flex-wrap items-center gap-2">
                {p.tags.map((t) => (
                  <Badge key={t}>{t}</Badge>
                ))}
                <span className="ml-auto inline-flex items-center gap-1.5 text-sm font-medium text-brand-500 transition-all group-hover:gap-2.5">
                  Read post
                  <ArrowUpRight className="h-4 w-4" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
