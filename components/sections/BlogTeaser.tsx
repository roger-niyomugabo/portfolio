import Link from "next/link";
import { ArrowUpRight, Calendar, Clock } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { Badge } from "@/components/ui/Badge";
import { posts } from "@/data/blog";

export function BlogTeaser() {
  const latest = [...posts].sort((a, b) => (a.date < b.date ? 1 : -1)).slice(0, 3);

  return (
    <Section
      id="writing"
      eyebrow="From the blog"
      title={<>Lessons from production.</>}
      description="Notes on backend performance, frontend architecture, and shipping software well in distributed teams."
    >
      <div className="grid gap-5 md:grid-cols-3">
        {latest.map((p, idx) => (
          <Reveal key={p.slug} delay={idx * 0.05}>
            <Link
              href={`/blog/${p.slug}`}
              className="group flex h-full flex-col rounded-2xl border border-border bg-surface p-6 transition-all hover:-translate-y-0.5 hover:border-brand-500/50"
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
                  {p.readingMinutes} min
                </span>
              </div>
              <h3 className="font-display text-lg font-semibold tracking-tight transition-colors group-hover:text-brand-500">
                {p.title}
              </h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-subtle line-clamp-3">
                {p.excerpt}
              </p>
              <div className="mt-4 flex flex-wrap items-center gap-2">
                {p.tags.slice(0, 2).map((t) => (
                  <Badge key={t}>{t}</Badge>
                ))}
                <span className="ml-auto inline-flex items-center gap-1 text-sm font-medium text-brand-500 transition-all group-hover:gap-2">
                  Read
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </span>
              </div>
            </Link>
          </Reveal>
        ))}
      </div>

      <div className="mt-10 text-center">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-5 py-2.5 text-sm font-medium text-fg transition-colors hover:border-brand-500 hover:text-brand-500"
        >
          See all posts
          <ArrowUpRight className="h-4 w-4" />
        </Link>
      </div>
    </Section>
  );
}
