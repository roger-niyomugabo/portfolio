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
      <div className="container pt-12">
        <h1 className="section-word">blog.</h1>
        <p className="mt-5 font-display text-2xl font-semibold md:text-[28px] md:leading-snug">
          Lessons from production.
        </p>
        <p className="mt-3 max-w-3xl text-base leading-relaxed text-subtle md:text-lg md:leading-relaxed">
          Backend performance, frontend architecture, and how to ship software
          well in distributed teams.
        </p>
      </div>

      <div className="container py-16">
        <div className="max-w-3xl space-y-4">
          {sorted.map((p) => (
            <Link
              key={p.slug}
              href={`/blog/${p.slug}`}
              className="card group block p-6 transition-all hover:-translate-y-1 hover:border-accent md:p-8"
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
              <h2 className="font-display text-xl font-semibold md:text-2xl">
                {p.title}
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-subtle md:text-base">
                {p.excerpt}
              </p>
              <div className="mt-4 flex flex-wrap items-center gap-2">
                {p.tags.map((t) => (
                  <Badge key={t}>{t}</Badge>
                ))}
                <span className="ml-auto inline-flex items-center gap-1.5 text-sm font-semibold transition-all group-hover:gap-2.5">
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
