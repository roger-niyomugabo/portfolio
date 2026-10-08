"use client";

import type { HTMLAttributes, MouseEvent } from "react";
import { cn } from "@/lib/utils";

// A card that glows where the pointer is (see .spot in globals.css).
export function SpotlightCard({
  className,
  onMouseMove,
  ...rest
}: HTMLAttributes<HTMLDivElement>) {
  const track = (e: MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--x", `${e.clientX - rect.left}px`);
    e.currentTarget.style.setProperty("--y", `${e.clientY - rect.top}px`);
    onMouseMove?.(e);
  };

  return <div className={cn("card spot", className)} onMouseMove={track} {...rest} />;
}
