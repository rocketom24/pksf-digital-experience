"use client";

import { motion, useScroll, useTransform, type MotionValue } from "motion/react";
import { useRef } from "react";
import {
  buildDelta,
  channelOpacity,
  channelWidth,
  DELTA_VIEWBOX,
  generationDepth,
  type Channel,
  type DeltaOptions,
} from "@/components/delta/channels";
import { DURATION, EASE_EDITORIAL } from "@/components/motion/tokens";
import { rampRange } from "@/components/motion/scrollRange";

type DeltaChannelsProps = DeltaOptions & {
  /**
   * `scroll` draws the channels against scroll position, `entrance` draws
   * them once on mount (for the hero, which is already in view), `static`
   * paints them complete. Reduced motion is handled in CSS rather than here
   * — see the `.delta-channel` override in app/globals.css.
   */
  motionMode?: "scroll" | "entrance" | "static";
  /** Flips the flow so channels converge upward instead of branching down. */
  flip?: boolean;
  /** Marks where channels divide — the nodes of the relay. */
  nodes?: "none" | "junctions" | "all";
  className?: string;
};

/**
 * The page's signature: a set of distributary channels drawn in
 * `currentColor`, so each ground supplies its own channel tone through
 * `GROUND[...].channel`.
 *
 * Drawing is driven by `useScroll`, never by `whileInView`. An
 * IntersectionObserver reveal on an element taller than the viewport never
 * fires when the scroll position jumps straight from "below" to "containing"
 * — an anchor link does exactly that — and with `once: true` it never
 * recovers. `useScroll` recomputes on every scroll event, so a jump is just
 * another position. This layer is decorative and `aria-hidden` regardless:
 * no text ever depends on it having run.
 */
export function DeltaChannels({
  motionMode = "scroll",
  flip = false,
  nodes = "none",
  className = "",
  ...options
}: DeltaChannelsProps) {
  const ref = useRef<HTMLDivElement>(null);
  const channels = buildDelta(options);
  const generations = options.branching?.length ?? 3;

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 95%", "end 35%"],
  });

  const lastGeneration = generations - 1;
  const marked =
    nodes === "none"
      ? []
      : channels.filter((c) => (nodes === "all" ? true : c.generation < lastGeneration));

  return (
    // The outer element takes the caller's classes untouched — including its
    // `position`. An earlier version hard-coded `relative` here, which lost to
    // nothing and won against the caller's `absolute`: the layer dropped into
    // normal flow, the SVG resolved to its 1:1 intrinsic ratio, and it pushed
    // a full viewport of empty space above the hero copy.
    <div ref={ref} aria-hidden="true" className={`pointer-events-none ${className}`}>
      <div className={`relative h-full w-full ${flip ? "rotate-180" : ""}`}>
        <svg
          viewBox={DELTA_VIEWBOX}
          preserveAspectRatio="none"
          fill="none"
          className="absolute inset-0 h-full w-full"
        >
          {channels.map((channel, i) => (
            <ChannelPath
              key={i}
              channel={channel}
              index={i}
              generations={generations}
              mode={motionMode}
              progress={scrollYProgress}
            />
          ))}
        </svg>

        {/* Junction markers sit at the downstream end of a channel — exactly
            where it divides. They are HTML rather than SVG circles because the
            viewBox is stretched with `preserveAspectRatio="none"`, which would
            squash a real circle into an ellipse. */}
        {marked.map((channel, i) => (
          <span
            key={`n${i}`}
            className="absolute size-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-current opacity-70"
            style={{
              left: `${channel.outlet * 100}%`,
              top: `${generationDepth(channel.generation, generations) * 100}%`,
            }}
          />
        ))}
      </div>
    </div>
  );
}

type ChannelPathProps = {
  channel: Channel;
  index: number;
  generations: number;
  mode: "scroll" | "entrance" | "static";
  progress: MotionValue<number>;
};

/**
 * One channel. Split out so each path owns exactly one `useTransform` call —
 * calling hooks inside the parent's `.map` would make the hook count depend
 * on the `generations` prop.
 */
function ChannelPath({ channel, index, generations, mode, progress }: ChannelPathProps) {
  // Upstream generations finish before their distributaries start, so the
  // delta fills the way water would rather than all at once.
  const slice = 1 / (generations + 1);
  const start = channel.generation * slice;
  const [points, values] = rampRange(start, start + slice * 1.6);
  const drawn = useTransform(progress, points, values, { clamp: true });

  const shared = {
    d: channel.d,
    // The class is the hook the reduced-motion rule in app/globals.css uses to
    // force the channel fully drawn, whichever mode it was rendered in.
    className: "delta-channel",
    stroke: "currentColor",
    strokeWidth: channelWidth(channel.generation),
    strokeOpacity: channelOpacity(channel.generation),
    strokeLinecap: "round" as const,
    vectorEffect: "non-scaling-stroke" as const,
  };

  if (mode === "static") return <path {...shared} />;

  if (mode === "entrance") {
    return (
      <motion.path
        {...shared}
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{
          duration: DURATION.cinematic,
          delay: 0.35 + channel.generation * 0.18 + index * 0.01,
          ease: EASE_EDITORIAL,
        }}
      />
    );
  }

  return <motion.path {...shared} style={{ pathLength: drawn }} />;
}
