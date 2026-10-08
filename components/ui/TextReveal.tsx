"use client";

import { motion, useReducedMotion } from "framer-motion";

type TextRevealProps = {
  text: string;
  delay?: number;
  className?: string;
};

// Slides each word up out of a clipped box, one after another.
export function TextReveal({ text, delay = 0, className }: TextRevealProps) {
  const reduceMotion = useReducedMotion();
  const words = text.split(" ");

  return (
    <span className={className}>
      {words.map((word, i) => (
        <span
          key={`${word}-${i}`}
          className="-mb-[0.12em] inline-block overflow-hidden pb-[0.12em] align-bottom"
        >
          <motion.span
            className="inline-block"
            initial={reduceMotion ? false : { y: "115%" }}
            animate={{ y: 0 }}
            transition={{
              duration: 0.9,
              delay: delay + i * 0.08,
              ease: [0.22, 1, 0.36, 1]
            }}
          >
            {word}
            {i < words.length - 1 ? <>&nbsp;</> : null}
          </motion.span>
        </span>
      ))}
    </span>
  );
}
