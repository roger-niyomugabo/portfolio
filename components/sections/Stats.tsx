import { Counter } from "@/components/ui/Counter";
import { Reveal } from "@/components/ui/Reveal";
import { stats } from "@/data/stats";

export function Stats() {
  return (
    <section aria-label="Numbers about my work" className="py-8 md:py-12">
      <div className="container">
        <div className="grid grid-cols-2 gap-8 border-y border-border py-10 md:grid-cols-4 md:py-14">
          {stats.map((stat, idx) => (
            <Reveal key={stat.label} delay={idx * 0.05}>
              <p className="font-display text-5xl font-extrabold leading-none md:text-6xl">
                <Counter to={stat.value} suffix={stat.suffix} />
              </p>
              <p className="mt-3 text-sm font-medium text-subtle md:text-base">
                {stat.label}
              </p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
