import { GROUND, type Ground } from "@/components/editorial/grounds";

type ScrollCueProps = {
  /** In-page target, so the cue is a working control and not decoration. */
  href: string;
  label?: string;
  ground?: Ground;
  /**
   * `full` sets the cue in the ground's primary ink rather than its muted
   * one. Over a photograph the muted inks are a step too quiet to clear AA
   * against the worst pixel the image can put behind them.
   */
  tone?: "muted" | "full";
  className?: string;
};

/** A travelling hairline plus a real skip-to-section link — an affordance, not an ornament. */
export function ScrollCue({
  href,
  label = "Scroll",
  ground = "ink",
  tone = "muted",
  className = "",
}: ScrollCueProps) {
  const g = GROUND[ground];

  return (
    <a
      href={href}
      data-cursor="interactive"
      className={`inline-flex items-center gap-4 font-mono text-meta uppercase transition-opacity duration-200 hover:opacity-100 ${
        tone === "full" ? g.text : g.muted
      } ${className}`}
    >
      <span aria-hidden="true" className={`relative block h-12 w-px overflow-hidden ${g.rule}`}>
        <span className="absolute inset-x-0 top-0 block h-full animate-cue bg-current opacity-90 motion-reduce:animate-none" />
      </span>
      {label}
    </a>
  );
}
