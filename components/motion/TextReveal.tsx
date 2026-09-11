"use client";

import { motion, useReducedMotion } from "motion/react";
import { type ElementType } from "react";

type TextRevealProps = {
  text: string;
  as?: ElementType;
  className?: string;
  delay?: number;
};

/** Masked, word-by-word editorial text entrance for headlines and statements. */
export function TextReveal({ text, as: Tag = "p", className, delay = 0 }: TextRevealProps) {
  const reduceMotion = useReducedMotion();
  const words = text.split(" ");

  return (
    <Tag className={className}>
      <motion.span
        aria-hidden={false}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-10% 0px" }}
        variants={{ hidden: {}, visible: { transition: { staggerChildren: reduceMotion ? 0 : 0.05, delayChildren: delay } } }}
        className="inline"
      >
        {words.map((word, i) => (
          <span key={i} className="inline-block overflow-hidden align-bottom">
            <motion.span
              className="inline-block"
              variants={{
                hidden: { y: reduceMotion ? 0 : "100%" },
                visible: { y: 0, transition: { duration: reduceMotion ? 0 : 0.7, ease: [0.16, 1, 0.3, 1] } },
              }}
            >
              {word}
              {i < words.length - 1 ? " " : ""}
            </motion.span>
          </span>
        ))}
      </motion.span>
    </Tag>
  );
}
