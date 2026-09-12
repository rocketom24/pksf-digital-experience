"use client";

import { motion, useScroll, useSpring, useTransform, type MotionValue } from "motion/react";
import Image from "next/image";
import { useRef, type ReactNode } from "react";
import { Frame } from "@/components/editorial/Frame";
import { GROUND, type Ground } from "@/components/editorial/grounds";
import { Meta } from "@/components/editorial/SectionHead";
import { Reveal } from "@/components/motion/Reveal";
import { digitalTimeline } from "@/data/digital";
import { digitalEraMedia } from "@/data/digitalMedia";

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
 * the track follows, settling on the true position (see the spring below,
 * which smooths the way there without changing where it ends up).
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

  /**
   * The travel is smoothed, not retimed.
   *
   * Raw `scrollYProgress` follows the wheel exactly, which on a wheel that
   * emits in coarse notches shows up as the track stepping sideways. A spring
   * on the progress itself carries those steps into one continuous movement
   * and still settles on the true scroll position, so the mapping stays 1:1
   * everywhere the scroll is at rest — a fling and a scrollbar drag both end
   * where they should. Nothing is intercepted; there is still no wheel
   * handler.
   *
   * `restDelta` is tight because the value is progress in 0–1, where the
   * default 0.01 is a whole percent of the track — a visible half-panel of
   * slack at the ends.
   */
  const smooth = useSpring(scrollYProgress, {
    stiffness: 160,
    damping: 30,
    mass: 0.35,
    restDelta: 0.0001,
  });
  const x = useTransform(smooth, [0, 1], ["0vw", `-${travel}vw`]);

  return (
    <div className={className}>
      {/* Horizontal track — wide screens with motion allowed. */}
      <div
        ref={trackRef}
        className="hidden motion-safe:lg:block"
        style={{ height: `${100 + travel}vh` }}
      >
        {/* `pt-20` is the navigation bar's clearance. The bar is fixed and
            opaque, and the panels are centred in the viewport, so without it
            the top line of every panel — the index and its "Delivered" label
            — sits behind the bar for the whole length of the track. Padding
            rather than a shorter track: the box the content is centred in is
            what has to shrink, so the panels stay centred in what is left. */}
        {/* `pb-4` and the scrubber's `mt-6` below are the room the picture
            captions take. A panel is ~760px tall with one, and a 900px laptop
            viewport has 772px inside this box — so the gaps, not the frames,
            are what gave way. Nothing about the pictures changed. */}
        <div className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden pt-20 pb-4 md:pt-24">
          <motion.ol
            style={{ x, gap: `${GAP}vw`, paddingInline: `${EDGE}vw` }}
            className="flex items-stretch"
          >
            {digitalTimeline.map((era, i) => (
              <li key={era.period} className="shrink-0" style={{ width: `${PANEL}vw` }}>
                <EraPanel
                  index={i}
                  total={count}
                  era={era}
                  ground={ground}
                  plate={PLATES[i]}
                  progress={smooth}
                />
              </li>
            ))}
          </motion.ol>

          {/* The scrubber. It carries the two end points of the published
              sequence, so the bar says what is being travelled rather than
              only how far along it is. */}
          <div className="mx-[12vw] mt-6 flex items-center gap-6">
            <span className={`shrink-0 font-mono text-meta uppercase ${g.muted}`}>
              {digitalTimeline[0].period}
            </span>
            <span aria-hidden="true" className={`relative h-px flex-1 ${g.rule}`}>
              <motion.span
                className="absolute inset-0 origin-left bg-current opacity-80"
                style={{ scaleX: smooth }}
              />
            </span>
            <span className={`shrink-0 font-mono text-meta uppercase ${g.accent}`}>
              {digitalTimeline[count - 1].period}
            </span>
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
  /**
   * The track's own progress, passed only by the horizontal composition. Its
   * presence is fixed per subtree — the two compositions are separate branches
   * of the tree — so the hook count inside `PlateDrift` never changes.
   */
  progress?: MotionValue<number>;
};

/**
 * One era. Deliberately free of viewport-triggered reveals: inside the
 * horizontal track a panel is translated in from off-screen, and an
 * intersection reveal that mis-fires there would leave the panel's own text
 * at opacity 0 with no way to recover. The horizontal travel is the
 * animation; the content is always painted.
 */
function EraPanel({ index, total, era, ground, plate, progress }: EraPanelProps) {
  const g = GROUND[ground];

  /* PKSF's own photograph, at its own URL. It is a picture *on the subject*,
     not a document of this panel's era — PKSF publishes none from the earlier
     ones — so the caption names the event and date it actually is, and falls
     back to the drawn plate if a slot is ever emptied. */
  const media = digitalEraMedia[era.period];

  const frame = (
    <Frame
      ratio="wide"
      plate={plate}
      ground={ground}
      className="mt-6"
      caption={media?.src ? media.caption : undefined}
    >
      {media?.src ? (
        <Image
          src={media.src}
          alt={media.alt}
          fill
          sizes="(min-width: 1024px) 46vw, 100vw"
          className="object-cover"
        />
      ) : undefined}
    </Frame>
  );

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

      {progress ? (
        <PlateDrift progress={progress} index={index} total={total}>
          {frame}
        </PlateDrift>
      ) : (
        frame
      )}
    </div>
  );
}

type PlateDriftProps = {
  progress: MotionValue<number>;
  index: number;
  total: number;
  children: ReactNode;
};

/**
 * Depth inside the horizontal track.
 *
 * The panels all travel at exactly the rate of the scroll — that 1:1 mapping
 * is the whole point of the track and none of it is touched here. What moves
 * is the plate inside each panel, by a few vw against the direction of
 * travel, and by a different amount per panel. That is what stops five
 * equal-width panels sliding past as one flat sheet.
 *
 * Alternating sign rather than a ramp by index: a ramp makes the last panel
 * the only one that visibly moves, while alternating gives every neighbouring
 * pair a relative motion of twice the offset.
 *
 * The input range is exactly [0, 1] — the source is the same spring-smoothed
 * progress the track rides, so the plates and their panels are never out of
 * step, and an offset outside 0–1 would throw if this ever went back to a
 * raw scroll source handed to WAAPI verbatim. Cancelled under
 * reduced motion by `.scroll-drift` in globals.css, not by rendering a
 * different tree.
 */
function PlateDrift({ progress, index, total, children }: PlateDriftProps) {
  const depth = (index % 2 === 0 ? 1 : -1) * (1.4 + (index / Math.max(1, total - 1)) * 1.1);
  const x = useTransform(progress, [0, 1], [`${depth}vw`, `${-depth}vw`]);

  return (
    <motion.div className="scroll-drift" style={{ x }}>
      {children}
    </motion.div>
  );
}
