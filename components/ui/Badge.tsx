import { cn } from "@/lib/utils";
import type { HTMLAttributes } from "react";

type BadgeProps = HTMLAttributes<HTMLSpanElement> & {
  tone?: "default" | "accent";
};

export function Badge({
  className,
  tone = "default",
  ...rest
}: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-[4px] border px-2.5 py-0.5 text-xs font-medium",
        tone === "default" && "border-border text-subtle",
        tone === "accent" && "border-accent bg-accent text-ink",
        className
      )}
      {...rest}
    />
  );
}
