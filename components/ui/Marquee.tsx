import type { CSSProperties, ReactNode } from "react";
import { cn } from "@/lib/utils";

type MarqueeProps = {
  children: ReactNode;
  /** Seconds for one full loop. */
  duration?: number;
  reverse?: boolean;
  className?: string;
};

// Scrolls its children sideways forever; pauses while hovered.
export function Marquee({ children, duration = 40, reverse = false, className }: MarqueeProps) {
  return (
    <div
      className={cn(
        "marquee overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]",
        className
      )}
    >
      <div
        className="marquee-track flex w-max"
        data-reverse={reverse || undefined}
        style={{ "--marquee-duration": `${duration}s` } as CSSProperties}
      >
        <div className="flex shrink-0 items-center">{children}</div>
        {/* Second copy makes the loop seamless */}
        <div className="flex shrink-0 items-center" aria-hidden>
          {children}
        </div>
      </div>
    </div>
  );
}
