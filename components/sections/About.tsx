import Link from "next/link";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { profile } from "@/data/profile";

const facts = [
  {
    label: "Based in",
    value: profile.location
  },
  {
    label: "Education",
    value: "B.Sc. Computer Science, University of Rwanda"
  },
  {
    label: "Focus areas",
    value: "Distributed systems, system design, cloud orchestration"
  },
  {
    label: "Reach me at",
    value: profile.email
  }
];

export function About() {
  return (
    <Section id="about" heading="about.">
      <Reveal className="max-w-4xl">
        <p className="text-lg font-medium leading-[1.8] md:text-2xl md:leading-[1.8]">
          {profile.bio}
        </p>

        <div className="mt-8 space-y-4 text-base leading-relaxed text-subtle md:text-lg md:leading-relaxed">
          <p>
            I care about the craft as much as the outcome - clean APIs,
            thoughtful UI, tests that actually catch regressions, and deploys
            that don&apos;t keep you up at night.
          </p>
          <p>
            I&apos;ve led frontend architecture, designed reusable component
            libraries, mentored engineers, and shipped containerized,
            CI/CD-driven systems for distributed remote teams. I&apos;m
            comfortable owning features end-to-end - from client discovery to
            the green deploy badge.
          </p>
          <p>
            Outside of writing software, I invest time in studying distributed
            systems, system design, and cloud orchestration - because the most
            interesting bugs live at the seams between services.
          </p>
        </div>
      </Reveal>

      <Reveal delay={0.1}>
        <dl className="mt-12 grid gap-x-8 gap-y-6 border-t border-border pt-8 sm:grid-cols-2 lg:grid-cols-4">
          {facts.map((f) => (
            <div key={f.label}>
              <dt className="text-xs font-medium uppercase tracking-wider text-muted">
                {f.label}
              </dt>
              <dd className="mt-1.5 break-words text-base font-medium">
                {f.value}
              </dd>
            </div>
          ))}
        </dl>

        <div className="mt-10 flex flex-wrap items-center gap-4">
          <Link
            href={profile.resumeHref}
            target="_blank"
            className="btn btn-primary"
          >
            Resume
          </Link>
          <Link href="/#contact" className="btn btn-outline">
            Let&apos;s work together
          </Link>
        </div>
      </Reveal>
    </Section>
  );
}
