import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { posts } from "@/data/blog";

const formatDate = (date: string) =>
  new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric"
  });

export function BlogTeaser() {
  const latest = [...posts].sort((a, b) => (a.date < b.date ? 1 : -1)).slice(0, 3);

  return (
    <Section
      id="writing"
      index="07"
      heading="writing."
      title={<>Lessons from production.</>}
      description="Notes on backend performance, frontend architecture, and shipping software well in distributed teams."
    >
      <ol className="border-t border-border">
        {latest.map((post, idx) => (
          <li key={post.slug} className="border-b border-border">
            <Reveal delay={idx * 0.04}>
              <Link
                href={`/blog/${post.slug}`}
                className="group grid gap-2 py-6 md:grid-cols-[11rem_1fr_auto] md:items-baseline md:gap-8 md:py-7"
              >
                <span className="font-mono text-xs uppercase tracking-[0.2em] text-muted">
                  {formatDate(post.date)}
                </span>
                <span>
                  <span className="block font-display text-xl font-semibold transition-colors group-hover:text-accent md:text-2xl">
                    {post.title}
                  </span>
                  <span className="mt-1.5 line-clamp-2 block text-subtle">{post.excerpt}</span>
                </span>
                <span className="flex items-center gap-3 text-sm text-muted">
                  {post.readingMinutes} min read
                  <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent" />
                </span>
              </Link>
            </Reveal>
          </li>
        ))}
      </ol>

      <div className="mt-10">
        <Link href="/blog" className="btn btn-outline">
          All posts
          <ArrowUpRight className="h-4 w-4" />
        </Link>
      </div>
    </Section>
  );
}
