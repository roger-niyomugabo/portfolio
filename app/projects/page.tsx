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
      <div className="container pt-12">
        <h1 className="section-word">work.</h1>
        <p className="mt-5 font-display text-2xl font-semibold md:text-[28px] md:leading-snug">
          All projects.
        </p>
        <p className="mt-3 max-w-3xl text-base leading-relaxed text-subtle md:text-lg md:leading-relaxed">
          Production work, side projects, and platform pieces I&apos;ve owned
          end-to-end. Open any project for a deeper case study.
        </p>
      </div>
      <Projects heading={false} />
    </div>
  );
}
