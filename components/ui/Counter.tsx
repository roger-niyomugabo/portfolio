"use client";

import {
  motion,
  useInView,
  useMotionValue,
  useTransform,
  animate
} from "framer-motion";
import { useEffect, useRef } from "react";

export function Counter({
  to,
  suffix,
  duration = 1.6
}: {
  to: number;
  suffix?: string;
  duration?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const count = useMotionValue(0);
  const rounded = useTransform(count, (v) => Math.round(v).toLocaleString());

  useEffect(() => {
    if (!inView) return;
    const controls = animate(count, to, {
      duration,
      ease: [0.22, 1, 0.36, 1]
    });
    return controls.stop;
  }, [count, to, duration, inView]);

  return (
    <span ref={ref} className="tabular-nums">
      <motion.span>{rounded}</motion.span>
      {suffix}
    </span>
  );
}
