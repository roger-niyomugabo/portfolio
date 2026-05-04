import { cn } from "@/lib/utils";
import type { HTMLAttributes } from "react";

type BadgeProps = HTMLAttributes<HTMLSpanElement> & {
  tone?: "default" | "brand" | "accent";
};

export function Badge({
  className,
  tone = "default",
  ...rest
}: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium",
        tone === "default" &&
          "border-border bg-surface text-subtle",
        tone === "brand" &&
          "border-brand-500/30 bg-brand-500/10 text-brand-500",
        tone === "accent" &&
          "border-accent-500/30 bg-accent-500/10 text-accent-500",
        className
      )}
      {...rest}
    />
  );
}
