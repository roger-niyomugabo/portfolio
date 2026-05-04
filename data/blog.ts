import type { BlogPost } from "@/lib/types";

export const posts: BlogPost[] = [
  {
    slug: "scaling-postgres-hot-paths",
    title: "Scaling PostgreSQL Hot Paths: Indexes That Actually Matter",
    excerpt:
      "Most slow queries aren't slow because Postgres is slow — they're slow because we asked the wrong question. Here's how I think about indexing hot read paths under traffic.",
    date: "2026-03-12",
    readingMinutes: 7,
    tags: ["PostgreSQL", "Performance", "Backend"],
    body: `When a query is suddenly slow in production, it's tempting to grab the most obvious column and slap an index on it. That impulse is wrong about half the time.

## Start with the plan, not the column

EXPLAIN ANALYZE is the only honest answer. Sequential scans on a 50k-row table are fine. Sequential scans on a 50M-row table are a paging nightmare. The plan tells you which index would actually be used — guessing leads to indexes that look good in the schema and never get touched.

## Composite > single-column for filtered sorts

If you filter by tenant_id and sort by created_at desc, a single-column index on either is doing half the work. A composite (tenant_id, created_at desc) lets Postgres jump directly to the rows the user actually wants.

## Watch the writes

Every index pays a write tax. On a write-heavy table, three "nice-to-have" indexes can quietly add 30% to your insert latency. Index for the queries that hurt, not the ones that might.

## Closing thought

Performance work pays compounding interest, but only when you treat it as evidence-driven. Read the plan, measure before and after, and don't be afraid to drop an index that turned out to be cosmetic.`
  },
  {
    slug: "frontend-architecture-that-scales",
    title: "Frontend Architecture That Scales With Your Team",
    excerpt:
      "A reusable component library is not the goal — it's the side effect. The real goal is a frontend that doesn't slow down as your team grows.",
    date: "2025-11-04",
    readingMinutes: 6,
    tags: ["Frontend", "React", "Architecture"],
    body: `Every team eventually hits the same wall: features ship slower as the codebase grows. The fix isn't more engineers — it's a frontend architecture that protects shared concepts from drift.

## Tokens before components

Before you build a Button, agree on what "primary" means as a color, a focus state, and a disabled state. Tokens make brand refreshes a pull request, not a sprint.

## Headless primitives, themed wrappers

Build accessible primitives — menus, comboboxes, dialogs — once. Wrap them with your themed styles. That's how you get accessibility for free across the whole app.

## Document with examples, not prose

Storybook stories with copy-paste-ready snippets beat any wiki page. New engineers find the right pattern in 30 seconds instead of 30 minutes.

## Final thought

The component library is the artifact. The architecture is the contract: shared tokens, headless primitives, well-documented patterns. Get the contract right and the artifact almost builds itself.`
  },
  {
    slug: "shipping-to-distributed-teams",
    title: "Shipping Software in a Distributed, Remote Team",
    excerpt:
      "Remote, async work is great — until coordination overhead eats your week. A few small habits keep velocity high without burning anyone out.",
    date: "2025-08-21",
    readingMinutes: 5,
    tags: ["Remote", "Process", "Team"],
    body: `Working across time zones is a leverage multiplier when you do it well, and a tax when you don't. The teams I've shipped fastest with shared a few habits.

## Write decisions down — once

Slack threads decay. Decisions belong in the PR description, the design doc, or a tagged ADR. If a decision can't be linked, it didn't happen.

## Optimize for unblocking, not for being right

When a teammate is blocked, an 80% answer in 10 minutes beats a 100% answer in 4 hours. Save the deep dive for code review.

## Make the build the source of truth

If main is green, anyone can ship. If main is broken, no one ships. Protect that line and async coordination gets dramatically cheaper.

## Final thought

Remote teams don't fail because of distance — they fail because of ambiguity. Write things down, unblock fast, and trust the build.`
  }
];

export function getPost(slug: string) {
  return posts.find((p) => p.slug === slug);
}
