import Link from "next/link";
import { Download, GraduationCap, MapPin, Mail, Award } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { profile } from "@/data/profile";

const facts = [
  {
    icon: MapPin,
    label: "Based in",
    value: profile.location
  },
  {
    icon: GraduationCap,
    label: "Education",
    value: "B.Sc. Computer Science, University of Rwanda"
  },
  {
    icon: Award,
    label: "Focus areas",
    value: "Distributed systems, system design, cloud orchestration"
  },
  {
    icon: Mail,
    label: "Reach me at",
    value: profile.email
  }
];

export function About() {
  return (
    <Section
      id="about"
      eyebrow="About"
      title={<>A builder who loves the whole stack.</>}
      description="I care about the craft as much as the outcome - clean APIs, thoughtful UI, tests that actually catch regressions, and deploys that don't keep you up at night."
    >
      <div className="grid gap-8 md:grid-cols-5">
        <Reveal className="md:col-span-3">
          <div className="space-y-4 text-base leading-relaxed text-subtle md:text-lg">
            <p>{profile.bio}</p>
            <p>
              I&apos;ve led frontend architecture, designed reusable component
              libraries, mentored engineers, and shipped containerized,
              CI/CD-driven systems for distributed remote teams. I&apos;m
              comfortable owning features end-to-end - from client discovery to
              the green deploy badge.
            </p>
            <p>
              Outside of writing software, I invest time in studying
              distributed systems, system design, and cloud orchestration -
              because the most interesting bugs live at the seams between
              services.
            </p>
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Link
              href={profile.resumeHref}
              target="_blank"
              className="inline-flex items-center gap-2 rounded-full bg-fg px-4 py-2 text-sm font-medium text-bg transition-opacity hover:opacity-90"
            >
              <Download className="h-4 w-4" />
              Download CV
            </Link>
            <Link
              href="/#contact"
              className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-4 py-2 text-sm font-medium text-fg transition-colors hover:border-brand-500 hover:text-brand-500"
            >
              Let&apos;s work together
            </Link>
          </div>
        </Reveal>

        <Reveal delay={0.1} className="md:col-span-2">
          <div className="grid gap-3">
            {facts.map((f) => (
              <div
                key={f.label}
                className="rounded-2xl border border-border bg-surface p-4 transition-colors hover:border-brand-500/40"
              >
                <div className="flex items-start gap-3">
                  <span className="grid h-9 w-9 flex-shrink-0 place-items-center rounded-lg bg-brand-500/10 text-brand-500">
                    <f.icon className="h-4 w-4" />
                  </span>
                  <div>
                    <p className="text-xs uppercase tracking-wider text-muted">
                      {f.label}
                    </p>
                    <p className="mt-0.5 text-sm font-medium text-fg">
                      {f.value}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
