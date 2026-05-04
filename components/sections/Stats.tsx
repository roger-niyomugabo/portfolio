import { Counter } from "@/components/ui/Counter";
import { Reveal } from "@/components/ui/Reveal";
import { stats } from "@/data/stats";

export function Stats() {
  return (
    <section
      aria-label="Numbers about my work"
      className="relative border-y border-border bg-surface/40 py-12 md:py-16"
    >
      <div className="container">
        <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
          {stats.map((stat, idx) => (
            <Reveal key={stat.label} delay={idx * 0.05}>
              <div className="text-center">
                <p className="font-display text-4xl font-bold tracking-tight md:text-5xl">
                  <span className="gradient-text">
                    <Counter to={stat.value} suffix={stat.suffix} />
                  </span>
                </p>
                <p className="mt-2 text-xs uppercase tracking-wider text-muted md:text-sm">
                  {stat.label}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
