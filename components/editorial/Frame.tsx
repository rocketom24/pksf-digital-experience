"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { useRef, type ReactNode } from "react";
import { Plate, type PlateVariant } from "@/components/home/Plate";
import { GROUND, type Ground } from "@/components/editorial/grounds";
import { Meta } from "@/components/editorial/SectionHead";

type Ratio = "portrait" | "landscape" | "wide" | "square" | "photo" | "bleed";

const RATIO: Record<Ratio, string> = {
  portrait: "aspect-[3/4]",
  landscape: "aspect-[4/3]",
  wide: "aspect-[16/9]",
  square: "aspect-square",
  /** 3:2 — matches a supplied photograph's native size exactly, no crop. */
  photo: "aspect-[3/2]",
  /** Fills whatever the parent gives it — for full-viewport and pinned use. */
  bleed: "h-full",
};

type FrameProps = {
  /** Real media — an `<Image fill />` or `<video>`. Falls back to a drawn plate. */
  children?: ReactNode;
  plate?: PlateVariant;
  ratio?: Ratio;
  /**
   * `crop` scales the media slightly oversize and settles it back as the
   * frame passes through the viewport. `fade` adds a ground-coloured
   * gradient at the foot so type can sit over the media and stay legible.
   */
  treatment?: "plain" | "crop" | "fade";
  /**
   * Opens the frame from a masked state as it enters, rather than having it
   * arrive whole. Driven by the same scroll progress as `crop`, so the two
   * read as one movement — the picture grows into its frame while the frame
   * grows into the page.
   */
  mask?: boolean;
  /** Ground the frame sits on — drives the plate tone and the fade colour. */
  ground?: Ground;
  /** Rendered over the media, bottom-aligned. */
  overlay?: ReactNode;
  /** Mono caption under the frame. Say what the image is, not how it looks. */
  caption?: ReactNode;
  className?: string;
  /**
   * Classes for the media box itself rather than the figure around it. The one
   * thing it is for is a height ceiling: `ratio` sets the box from its width,
   * and inside a composition that has to fit the window — the pinned timeline —
   * a `max-h` in `vh` is what lets the picture give way instead of pushing the
   * panel's own caption off the screen. `max-height` wins over `aspect-ratio`,
   * so the frame simply crops rather than changing shape.
   */
  mediaClassName?: string;
};

/**
 * The image architecture.
 *
 * Every place a photograph will eventually go is a `Frame` today, holding a
 * drawn plate at the exact ratio and treatment the photograph will get. When
 * real PKSF photography arrives it is passed as `children` and nothing else
 * about the composition changes — no section gets redesigned around its
 * pictures.
 *
 * The crop settle is driven by `useScroll`, so it is a continuous function of
 * position rather than a one-shot intersection reveal, and the frame is
 * fully painted at every point in that range.
 */
export function Frame({
  children,
  plate = "delta",
  ratio = "wide",
  treatment = "plain",
  mask = false,
  ground = "parchment",
  overlay,
  caption,
  className = "",
  mediaClassName = "",
}: FrameProps) {
  const ref = useRef<HTMLDivElement>(null);
  const g = GROUND[ground];

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const scale = useTransform(scrollYProgress, [0, 1], [1.12, 1], { clamp: true });
  /**
   * The mask. Scroll-linked rather than `whileInView`, for the same reason
   * the crop is: a frame taller than the viewport can go from "below" to
   * "containing" in one jump — an anchor link does exactly that — and an
   * intersection observer never reports it, which would leave the picture
   * masked shut for the rest of the session.
   *
   * The input range spans the full [0, 1] and holds its end value, so the
   * transform is never handed a position outside its own domain.
   */
  const clipPath = useTransform(
    scrollYProgress,
    [0, 0.32, 1],
    ["inset(0% 0% 100% 0%)", "inset(0% 0% 0% 0%)", "inset(0% 0% 0% 0%)"]
  );

  const cropping = treatment === "crop";

  return (
    <figure className={`m-0 ${className}`}>
      <motion.div
        ref={ref}
        className={`relative isolate w-full overflow-hidden ${mask ? "frame-mask" : ""} ${
          RATIO[ratio]
        } ${g.dark ? "bg-on-dark/6" : "bg-on-light/5"} ${mediaClassName}`}
        style={mask ? { clipPath } : undefined}
      >
        <motion.div
          className={`absolute inset-0 ${cropping ? "frame-crop" : ""} ${g.plate}`}
          style={cropping ? { scale } : undefined}
        >
          {children ?? <Plate variant={plate} className="h-full w-full" />}
        </motion.div>

        {treatment === "fade" && (
          <span
            aria-hidden="true"
            className={`absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t ${
              g.dark ? "from-ink" : "from-parchment"
            } to-transparent`}
          />
        )}

        {overlay && <div className="absolute inset-x-0 bottom-0 p-6 md:p-10">{overlay}</div>}
      </motion.div>

      {caption && (
        <figcaption className="mt-4">
          <Meta ground={ground}>{caption}</Meta>
        </figcaption>
      )}
    </figure>
  );
}
