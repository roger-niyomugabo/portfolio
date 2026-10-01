import { cn } from "@/lib/utils";
import type { HTMLAttributes, ReactNode } from "react";

type SectionProps = Omit<HTMLAttributes<HTMLElement>, "title"> & {
  id?: string;
  heading?: string;
  title?: ReactNode;
  description?: ReactNode;
  children: ReactNode;
};

export function Section({
  id,
  heading,
  title,
  description,
  children,
  className,
  ...rest
}: SectionProps) {
  return (
    <section
      id={id}
      className={cn("scroll-mt-24 py-16 md:py-24", className)}
      {...rest}
    >
      <div className="container">
        {(heading || title || description) && (
          <div className="mb-10 max-w-3xl md:mb-14">
            {heading && <h2 className="section-word">{heading}</h2>}
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
          </div>
        )}
        {children}
      </div>
    </section>
  );
}
