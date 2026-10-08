import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { Counter } from "@/components/ui/Counter";
import { SpotlightCard } from "@/components/ui/SpotlightCard";
import { LocalTime } from "@/components/ui/LocalTime";
import { profile } from "@/data/profile";
import { stats } from "@/data/stats";
import { experiences } from "@/data/experience";

const facts = [
  { label: "Based in", value: profile.location },
  { label: "Education", value: "B.Sc. Computer Science, University of Rwanda" },
  { label: "Focus", value: "Distributed systems, system design, cloud orchestration" },
  { label: "Email", value: profile.email }
];

const current = experiences.find((exp) => exp.current) ?? experiences[0];

export function About() {
  return (
    <Section
      id="about"
      index="01"
      heading="about."
      layout="sticky"
      title={<>A builder who loves the whole stack.</>}
      description="I care about the craft as much as the outcome: clean APIs, thoughtful UI, tests that catch regressions, and deploys that don't keep anyone up at night."
      aside={
        <dl className="mt-10 grid gap-5 border-t border-border pt-8 sm:grid-cols-2 lg:grid-cols-1">
          {facts.map((fact) => (
            <div key={fact.label}>
              <dt className="section-index">{fact.label}</dt>
              <dd className="mt-1.5 break-words text-base font-medium">{fact.value}</dd>
            </div>
          ))}
        </dl>
      }
    >
      <Reveal>
        <p className="text-lg font-medium leading-[1.8] md:text-2xl md:leading-[1.8]">
          {profile.bio}
        </p>
        <div className="mt-8 space-y-4 text-base leading-relaxed text-subtle md:text-lg md:leading-relaxed">
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
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <SpotlightCard className="flex flex-col p-6 sm:col-span-2 lg:row-span-2 md:p-7">
            <p className="section-index">Currently</p>
            <p className="mt-5 font-display text-2xl font-semibold leading-snug">{current.role}</p>
            <p className="mt-2 text-subtle">
              {current.company} · since {current.start}
            </p>
            <p className="mt-6 text-sm leading-relaxed text-subtle md:text-base">
              {current.highlights[0]}
            </p>
            <Link
              href="/#experience"
              className="link-slide mt-auto inline-flex items-center gap-1.5 self-start pt-8 text-sm font-semibold"
            >
              Full experience
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </SpotlightCard>

          {stats.map((stat) => (
            <SpotlightCard key={stat.label} className="p-6">
              <p className="font-display text-4xl font-extrabold leading-none md:text-5xl">
                <Counter to={stat.value} suffix={stat.suffix} />
              </p>
              <p className="mt-3 text-sm text-subtle">{stat.label}</p>
            </SpotlightCard>
          ))}

          <SpotlightCard className="p-6 sm:col-span-2 lg:col-span-1">
            <p className="section-index">Local time</p>
            <p className="mt-4 font-display text-4xl font-extrabold leading-none tabular-nums md:text-5xl">
              <LocalTime />
            </p>
            <p className="mt-3 text-sm text-subtle">
              Kigali, UTC+2 · overlaps European mornings and American afternoons
            </p>
          </SpotlightCard>
        </div>

        <div className="mt-10 flex flex-wrap items-center gap-4">
          <Link href={profile.resumeHref} target="_blank" className="btn btn-primary">
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
