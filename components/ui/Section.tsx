import { cn } from "@/lib/utils";
import type { HTMLAttributes, ReactNode } from "react";

type SectionProps = Omit<HTMLAttributes<HTMLElement>, "title"> & {
  id?: string;
  eyebrow?: string;
  title?: ReactNode;
  description?: ReactNode;
  children: ReactNode;
};

export function Section({
  id,
  eyebrow,
  title,
  description,
  children,
  className,
  ...rest
}: SectionProps) {
  return (
    <section
      id={id}
      className={cn("scroll-mt-24 py-20 md:py-28", className)}
      {...rest}
    >
      <div className="container">
        {(eyebrow || title || description) && (
          <div className="mx-auto mb-12 max-w-2xl text-center">
            {eyebrow && (
              <p className="mb-3 inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-1 text-xs font-medium uppercase tracking-wider text-brand-500">
                <span className="inline-block h-1.5 w-1.5 rounded-full bg-brand-500" />
                {eyebrow}
              </p>
            )}
            {title && (
              <h2 className="font-display text-3xl font-bold tracking-tight md:text-4xl">
                {title}
              </h2>
            )}
            {description && (
              <p className="mt-4 text-base text-subtle md:text-lg">
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
