"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { Frame } from "@/components/editorial/Frame";
import { GROUND, type Ground } from "@/components/editorial/grounds";
import { Meta } from "@/components/editorial/SectionHead";
import { Reveal } from "@/components/motion/Reveal";
import { digitalTimeline } from "@/data/digital";

/** Panel geometry, in vw. The track height is derived from these, so the
 *  horizontal travel is exactly 1:1 with vertical scroll — a screen of
 *  scrolling moves the track by a screen. */
const PANEL = 46;
const GAP = 4;
const EDGE = 12;

const PLATES = ["strata", "weave", "delta", "weave", "delta"] as const;

type DigitalTimelineProps = { ground?: Ground; className?: string };

/**
 * The five published eras of PKSF's digital transformation.
 *
 * On a wide screen the eras run sideways: the page scrolls down natively and
 * that scroll is mapped onto horizontal travel, so the timeline is read the
 * way a timeline is drawn. Nothing is intercepted — no wheel handler, no
 * scroll hijack — the user can fling through it or drag the scrollbar and
 * the track follows position exactly.
 *
 * Below `lg`, and whenever reduced motion is requested, the same five eras
 * are a vertical sequence instead. That swap is done in CSS rather than from
 * a media-query hook, so the server and client render the same tree and the
 * tall track costs no layout height when it is not the active composition.
 *
 * Periods and titles come from `data/digital.ts` verbatim. No era, date or
 * milestone is added here.
 */
export function DigitalTimeline({ ground = "ink", className = "" }: DigitalTimelineProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const g = GROUND[ground];
  const count = digitalTimeline.length;

  const span = EDGE * 2 + count * PANEL + (count - 1) * GAP;
  const travel = span - 100;

  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ["start start", "end end"],
  });
  const x = useTransform(scrollYProgress, [0, 1], ["0vw", `-${travel}vw`]);

  return (
    <div className={className}>
      {/* Horizontal track — wide screens with motion allowed. */}
      <div
        ref={trackRef}
        className="hidden motion-safe:lg:block"
        style={{ height: `${100 + travel}vh` }}
      >
        <div className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden">
          <motion.ol
            style={{ x, gap: `${GAP}vw`, paddingInline: `${EDGE}vw` }}
            className="flex items-stretch"
          >
            {digitalTimeline.map((era, i) => (
              <li key={era.period} className="shrink-0" style={{ width: `${PANEL}vw` }}>
                <EraPanel index={i} total={count} era={era} ground={ground} plate={PLATES[i]} />
              </li>
            ))}
          </motion.ol>

          <div
            aria-hidden="true"
            className={`mx-[12vw] mt-16 h-px ${g.rule}`}
          >
            <motion.span
              className="block h-full origin-left bg-current opacity-70"
              style={{ scaleX: scrollYProgress }}
            />
          </div>
        </div>
      </div>

      {/* Vertical sequence — narrow screens, and reduced motion at any width. */}
      <ol className="motion-safe:lg:hidden">
        {digitalTimeline.map((era, i) => (
          <li key={era.period} className={`border-t py-12 first:border-t-0 first:pt-0 ${g.border}`}>
            <Reveal delay={i * 0.04}>
              <EraPanel index={i} total={count} era={era} ground={ground} plate={PLATES[i]} />
            </Reveal>
          </li>
        ))}
      </ol>
    </div>
  );
}

type EraPanelProps = {
  index: number;
  total: number;
  era: (typeof digitalTimeline)[number];
  ground: Ground;
  plate: (typeof PLATES)[number];
};

/**
 * One era. Deliberately free of viewport-triggered reveals: inside the
 * horizontal track a panel is translated in from off-screen, and an
 * intersection reveal that mis-fires there would leave the panel's own text
 * at opacity 0 with no way to recover. The horizontal travel is the
 * animation; the content is always painted.
 */
function EraPanel({ index, total, era, ground, plate }: EraPanelProps) {
  const g = GROUND[ground];

  return (
    <div>
      <div className="flex items-baseline gap-4">
        <span className={`font-mono text-meta uppercase ${g.accent}`}>
          {String(index + 1).padStart(2, "0")}
        </span>
        <Meta ground={ground}>
          {index === total - 1 ? "Stated direction" : "Delivered"}
        </Meta>
      </div>

      {/* The period is set in the mono, at display scale. The face carries
          every dated, counted thing on this page — the same lineage the
          timeline itself describes, from paper ledger to data. */}
      <p className="mt-6 font-mono text-[clamp(2rem,4.6vw,4rem)] leading-none tracking-[-0.03em]">
        {era.period}
      </p>

      <h3 className="mt-6 max-w-md font-display text-title font-semibold text-balance">
        {era.title}
      </h3>

      {era.description && <p className={`mt-4 max-w-md text-body ${g.muted}`}>{era.description}</p>}

      <Frame ratio="wide" plate={plate} ground={ground} className="mt-10" />
    </div>
  );
}
