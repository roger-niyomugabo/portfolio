import { cn } from "@/lib/utils";
import type { HTMLAttributes, ReactNode } from "react";

type SectionProps = Omit<HTMLAttributes<HTMLElement>, "title"> & {
  id?: string;
  /** Mono label above the word, e.g. "01". */
  index?: string;
  heading?: string;
  title?: ReactNode;
  description?: ReactNode;
  /** Extra content under the header (facts, notes). */
  aside?: ReactNode;
  /** "sticky" pins the header in a left column while the content scrolls past it. */
  layout?: "stack" | "sticky";
  children: ReactNode;
};

export function Section({
  id,
  index,
  heading,
  title,
  description,
  aside,
  layout = "stack",
  children,
  className,
  ...rest
}: SectionProps) {
  const sticky = layout === "sticky";
  const header = (index || heading || title || description || aside) && (
    <div className={sticky ? "lg:sticky lg:top-28 lg:self-start" : "mb-10 max-w-3xl md:mb-14"}>
      {index && <p className="section-index mb-4">( {index} )</p>}
      {heading && (
        <h2
          className={cn(
            "section-word",
            sticky && "lg:text-[clamp(2.5rem,5.5vw,4.75rem)]"
          )}
        >
          {heading}
        </h2>
      )}
      {title && (
        <p className="mt-5 font-display text-2xl font-semibold md:text-[28px] md:leading-snug">
          {title}
        </p>
      )}
      {description && (
        <p className="mt-3 text-base leading-relaxed text-subtle md:text-lg md:leading-relaxed">
          {description}
        </p>
      )}
      {aside}
    </div>
  );

  return (
    <section
      id={id}
      className={cn("scroll-mt-24 py-16 md:py-24", className)}
      {...rest}
    >
      <div className="container">
        {sticky ? (
          <div className="grid gap-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16">
            {header}
            <div className="min-w-0">{children}</div>
          </div>
        ) : (
          <>
            {header}
            {children}
          </>
        )}
      </div>
    </section>
  );
}
