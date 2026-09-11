import { buildDelta, channelOpacity, channelWidth, DELTA_VIEWBOX } from "@/components/delta/channels";

export type PlateVariant = "delta" | "strata" | "weave";

type PlateProps = {
  variant: PlateVariant;
  className?: string;
};

/**
 * Non-photographic plates.
 *
 * There is no verified PKSF imagery for this concept, and generic stock of
 * rural Bangladesh would read as real beneficiaries and real projects — the
 * one invention that would do actual harm. So the image slots are held by
 * drawn plates taken from the delta: its channels, its sediment bands, and
 * the weave of the fibre crops grown on it. Each is a `Frame` fallback, so
 * swapping in a real photograph later is a one-line change with no layout
 * consequences.
 *
 * `delta` and `weave` render in `currentColor` and take their tone from the
 * ground; `strata` uses the fixed earth palette.
 */
export function Plate({ variant, className = "" }: PlateProps) {
  if (variant === "strata") {
    return (
      <svg
        aria-hidden="true"
        viewBox="0 0 1200 800"
        preserveAspectRatio="xMidYMid slice"
        className={`h-full w-full ${className}`}
      >
        {STRATA.map((band) => (
          <rect
            key={band.y}
            x="0"
            y={band.y}
            width="1200"
            height={band.h}
            fill={band.fill}
            opacity={band.opacity}
          />
        ))}
        {STRATA.slice(1).map((band) => (
          <line
            key={`rule-${band.y}`}
            x1="0"
            x2="1200"
            y1={band.y}
            y2={band.y}
            stroke="var(--ink)"
            strokeOpacity="0.1"
            strokeWidth="1"
          />
        ))}
      </svg>
    );
  }

  if (variant === "weave") {
    return (
      <svg
        aria-hidden="true"
        viewBox="0 0 1200 800"
        preserveAspectRatio="xMidYMid slice"
        className={`h-full w-full ${className}`}
      >
        <g stroke="currentColor" strokeOpacity="0.26" strokeWidth="1">
          {Array.from({ length: 25 }, (_, i) => (
            <line key={`v${i}`} x1={i * 50} y1="0" x2={i * 50} y2="800" />
          ))}
          {Array.from({ length: 17 }, (_, i) => (
            <line key={`h${i}`} x1="0" y1={i * 50} x2="1200" y2={i * 50} />
          ))}
        </g>
        <g fill="currentColor" opacity="0.45">
          {WEAVE_SLUBS.map(([x, y, w]) => (
            <rect key={`${x}-${y}`} x={x} y={y} width={w} height="4" rx="2" />
          ))}
        </g>
      </svg>
    );
  }

  return (
    <svg
      aria-hidden="true"
      viewBox={DELTA_VIEWBOX}
      preserveAspectRatio="none"
      fill="none"
      className={`h-full w-full ${className}`}
    >
      {buildDelta({ branching: [3, 2, 2], spread: 1000, seed: 7 }).map((channel, i) => (
        <path
          key={i}
          d={channel.d}
          stroke="currentColor"
          strokeWidth={channelWidth(channel.generation)}
          strokeOpacity={channelOpacity(channel.generation) * 0.7}
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
        />
      ))}
    </svg>
  );
}

/**
 * Sediment bands: silt, sand, clay, the green line of cultivation.
 *
 * These are the one plate set in fixed palette colours rather than
 * `currentColor`, so the opacities have to clear the darkest ground they land
 * on — under about 0.4 a band disappears into moss and the plate reads as a
 * wash rather than as layers.
 */
const STRATA = [
  { y: 0, h: 190, fill: "var(--mist)", opacity: 0.72 },
  { y: 190, h: 96, fill: "var(--silt)", opacity: 0.58 },
  { y: 286, h: 44, fill: "var(--clay)", opacity: 0.46 },
  { y: 330, h: 186, fill: "var(--silt)", opacity: 0.44 },
  { y: 516, h: 128, fill: "var(--moss)", opacity: 0.85 },
  { y: 644, h: 156, fill: "var(--clay)", opacity: 0.38 },
];

/** Irregular thickenings in the weave — jute slubs. Fixed, never random. */
const WEAVE_SLUBS: [number, number, number][] = [
  [100, 148, 150],
  [450, 98, 100],
  [750, 248, 200],
  [250, 398, 100],
  [900, 448, 150],
  [550, 598, 250],
  [150, 648, 100],
  [1000, 98, 100],
];
