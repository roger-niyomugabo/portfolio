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
      heading="writing."
      title={<>Lessons from production.</>}
      description="Notes on backend performance, frontend architecture, and shipping software well in distributed teams."
    >
      <div className="grid gap-5 md:grid-cols-3">
        {latest.map((p, idx) => (
          <Reveal key={p.slug} delay={idx * 0.05}>
            <Link
              href={`/blog/${p.slug}`}
              className="card group flex h-full flex-col p-6 transition-all hover:-translate-y-1 hover:border-accent"
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
              <h3 className="font-display text-lg font-semibold">{p.title}</h3>
              <p className="mt-2 line-clamp-3 flex-1 text-sm leading-relaxed text-subtle">
                {p.excerpt}
              </p>
              <div className="mt-4 flex flex-wrap items-center gap-2">
                {p.tags.slice(0, 2).map((t) => (
                  <Badge key={t}>{t}</Badge>
                ))}
                <span className="ml-auto inline-flex items-center gap-1 text-sm font-semibold transition-all group-hover:gap-2">
                  Read
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </span>
              </div>
            </Link>
          </Reveal>
        ))}
      </div>

      <div className="mt-10">
        <Link href="/blog" className="btn btn-outline">
          See all posts
          <ArrowUpRight className="h-4 w-4" />
        </Link>
      </div>
    </Section>
  );
}
