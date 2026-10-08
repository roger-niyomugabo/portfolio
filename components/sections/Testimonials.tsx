import { Quote } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { Marquee } from "@/components/ui/Marquee";
import { testimonials } from "@/data/testimonials";

export function Testimonials() {
  return (
    <Section
      id="testimonials"
      index="06"
      heading="praise."
      title={<>What collaborators say.</>}
      description="People I've shipped with — managers, peers, partners, and folks I've mentored."
      className="overflow-x-clip"
    >
      {/* Bleeds to the viewport edges */}
      <div className="relative left-1/2 w-screen -translate-x-1/2">
        <Marquee duration={55}>
          {testimonials.map((t) => (
            <figure key={t.name} className="card mx-3 w-[340px] shrink-0 p-6 sm:w-[440px] sm:p-8">
              <Quote className="h-6 w-6 fill-accent text-accent" aria-hidden />
              <blockquote className="mt-5 text-base leading-relaxed md:text-lg md:leading-relaxed">
                &ldquo;{t.quote}&rdquo;
              </blockquote>
              <figcaption className="mt-6 flex items-center gap-3">
                <span className="icon-tile h-10 w-10 rounded-full text-xs font-semibold">
                  {t.initials}
                </span>
                <span>
                  <span className="block text-sm font-semibold">{t.name}</span>
                  <span className="block text-xs text-muted">{t.role}</span>
                </span>
              </figcaption>
            </figure>
          ))}
        </Marquee>
      </div>
    </Section>
  );
}
