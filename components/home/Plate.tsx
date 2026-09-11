type PlateProps = {
  variant: "network" | "strata";
  className?: string;
};

const GRID_COLS = 15;
const GRID_ROWS = 10;
const GRID_STEP = 80;

// Weighted to the right half of the viewBox: editorial copy sits on the left,
// and connector lines running through a headline read as strikethroughs.
const HUB = { x: 880, y: 410 };
const NODES = [
  { x: 1150, y: 190 },
  { x: 1110, y: 650 },
  { x: 720, y: 110 },
  { x: 690, y: 700 },
  { x: 900, y: 780 },
  { x: 660, y: 400 },
];

const STRATA = [
  { y: 0, h: 210, fill: "var(--sky)", opacity: 0.55 },
  { y: 210, h: 90, fill: "var(--sand)", opacity: 0.8 },
  { y: 300, h: 40, fill: "var(--clay)", opacity: 0.35 },
  { y: 340, h: 180, fill: "var(--sand)", opacity: 0.45 },
  { y: 520, h: 130, fill: "var(--green-soft)", opacity: 0.9 },
  { y: 650, h: 150, fill: "var(--clay)", opacity: 0.22 },
];

/**
 * Non-photographic editorial plates. The project has no verified imagery,
 * and generic or AI-looking stock is explicitly ruled out by
 * docs/art-direction.md — so composition carries these sections instead.
 *
 * `network` renders in `currentColor`, so it takes the theme from its
 * wrapper's text colour; `strata` uses the fixed supporting palette.
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
          <rect key={band.y} x="0" y={band.y} width="1200" height={band.h} fill={band.fill} opacity={band.opacity} />
        ))}
        {STRATA.slice(1).map((band) => (
          <line
            key={`rule-${band.y}`}
            x1="0"
            x2="1200"
            y1={band.y}
            y2={band.y}
            stroke="var(--ink)"
            strokeOpacity="0.12"
            strokeWidth="1"
          />
        ))}
      </svg>
    );
  }

  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 1200 800"
      preserveAspectRatio="xMidYMid slice"
      className={`h-full w-full ${className}`}
    >
      <g fill="currentColor" opacity="0.16">
        {Array.from({ length: GRID_ROWS }, (_, row) =>
          Array.from({ length: GRID_COLS }, (_, col) => (
            <circle
              key={`${row}-${col}`}
              cx={col * GRID_STEP + GRID_STEP / 2}
              cy={row * GRID_STEP + GRID_STEP / 2}
              r="1.5"
            />
          ))
        )}
      </g>
      <g stroke="currentColor" strokeOpacity="0.28" strokeWidth="1">
        {NODES.map((node) => (
          <line key={`${node.x}-${node.y}`} x1={HUB.x} y1={HUB.y} x2={node.x} y2={node.y} />
        ))}
      </g>
      <g fill="currentColor">
        {NODES.map((node) => (
          <circle key={`n-${node.x}-${node.y}`} cx={node.x} cy={node.y} r="5" opacity="0.55" />
        ))}
        <circle cx={HUB.x} cy={HUB.y} r="9" />
      </g>
    </svg>
  );
}
