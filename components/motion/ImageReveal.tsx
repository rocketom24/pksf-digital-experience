"use client";

import { motion, useReducedMotion } from "motion/react";
import Image, { type ImageProps } from "next/image";

type ImageRevealProps = Omit<ImageProps, "className"> & {
  wrapperClassName?: string;
  imageClassName?: string;
};

/** Clip-path masked reveal for editorial imagery, entering on scroll. */
export function ImageReveal({ wrapperClassName, imageClassName, alt, ...imageProps }: ImageRevealProps) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      className={`overflow-hidden ${wrapperClassName ?? ""}`}
      initial={{ clipPath: reduceMotion ? "inset(0% 0 0 0)" : "inset(0% 0 100% 0)" }}
      whileInView={{ clipPath: "inset(0% 0 0% 0)" }}
      viewport={{ once: true, margin: "-10% 0px" }}
      transition={{ duration: reduceMotion ? 0 : 1.1, ease: [0.16, 1, 0.3, 1] }}
    >
      <motion.div
        initial={{ scale: reduceMotion ? 1 : 1.15 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true, margin: "-10% 0px" }}
        transition={{ duration: reduceMotion ? 0 : 1.3, ease: [0.16, 1, 0.3, 1] }}
      >
        <Image alt={alt} className={imageClassName} {...imageProps} />
      </motion.div>
    </motion.div>
  );
}
