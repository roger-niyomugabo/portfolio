import type { Metadata } from "next";
import { Projects } from "@/components/sections/Projects";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Selected projects across full-stack web, real-time systems, mobile, and DevOps."
};

export default function ProjectsPage() {
  return (
    <div className="pt-24">
      <div className="container pt-12 text-center">
        <p className="mb-3 inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-1 text-xs font-medium uppercase tracking-wider text-brand-500">
          <span className="inline-block h-1.5 w-1.5 rounded-full bg-brand-500" />
          Portfolio
        </p>
        <h1 className="font-display text-4xl font-bold tracking-tight md:text-5xl">
          All <span className="gradient-text">projects</span>.
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-base text-subtle md:text-lg">
          Production work, side projects, and platform pieces I&apos;ve owned
          end-to-end. Click any card for a deeper case study.
        </p>
      </div>
      <Projects showAll heading={false} />
    </div>
  );
}
