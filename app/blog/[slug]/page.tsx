import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Calendar, Clock } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { posts, getPost } from "@/data/blog";

type Props = { params: { slug: string } };

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: Props): Metadata {
  const post = getPost(params.slug);
  if (!post) return { title: "Post not found" };
  return {
    title: post.title,
    description: post.excerpt
  };
}

function renderBody(body: string) {
  const blocks = body.split(/\n\n+/);
  return blocks.map((block, i) => {
    if (block.startsWith("## ")) {
      return (
        <h2
          key={i}
          className="mt-10 font-display text-2xl font-semibold tracking-tight text-fg"
        >
          {block.slice(3)}
        </h2>
      );
    }
    return (
      <p
        key={i}
        className="mt-5 text-base leading-relaxed text-subtle md:text-lg"
      >
        {block}
      </p>
    );
  });
}

export default function BlogPostPage({ params }: Props) {
  const post = getPost(params.slug);
  if (!post) notFound();

  return (
    <article className="pt-24">
      <div className="container py-12">
        <div className="mx-auto max-w-3xl">
          <Link
            href="/blog"
            className="mb-8 inline-flex items-center gap-1.5 text-sm text-muted transition-colors hover:text-fg"
          >
            <ArrowLeft className="h-4 w-4" />
            All posts
          </Link>

          <div className="mb-3 flex flex-wrap items-center gap-3 text-xs text-muted">
            <span className="inline-flex items-center gap-1">
              <Calendar className="h-3.5 w-3.5" />
              {new Date(post.date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric"
              })}
            </span>
            <span className="inline-flex items-center gap-1">
              <Clock className="h-3.5 w-3.5" />
              {post.readingMinutes} min read
            </span>
          </div>

          <h1 className="font-display text-3xl font-bold leading-tight tracking-tight md:text-5xl">
            {post.title}
          </h1>

          <p className="mt-4 text-lg text-subtle md:text-xl">{post.excerpt}</p>

          <div className="mt-5 flex flex-wrap gap-1.5">
            {post.tags.map((t) => (
              <Badge key={t} tone="brand">
                {t}
              </Badge>
            ))}
          </div>

          <div className="mt-10 border-t border-border pt-6">
            {renderBody(post.body)}
          </div>

          <div className="mt-16 rounded-2xl border border-border bg-surface p-6 text-center md:p-10">
            <p className="font-display text-xl font-semibold">
              Like this kind of writing?
            </p>
            <p className="mt-2 text-sm text-subtle md:text-base">
              I share posts on backend performance, frontend architecture, and
              shipping software well.
            </p>
            <Link
              href="/#contact"
              className="mt-5 inline-flex items-center gap-2 rounded-full bg-fg px-5 py-2.5 text-sm font-medium text-bg transition-opacity hover:opacity-90"
            >
              Get in touch
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}
