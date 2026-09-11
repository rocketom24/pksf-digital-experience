import { Reveal } from "@/components/motion/Reveal";
import { Stagger } from "@/components/motion/Stagger";
import { ProvenanceMark } from "@/components/home/ProvenanceMark";
import { digitalDirection } from "@/data/digital";

/**
 * `digitalDirection` is ordered capabilities-first, then the three-stage
 * end state. Splitting it here keeps both groups sourced from the one
 * array — the strings are never restated in this file.
 */
const VISION_STAGE_COUNT = 3;
const capabilities = digitalDirection.slice(0, digitalDirection.length - VISION_STAGE_COUNT);
const visionStages = digitalDirection.slice(-VISION_STAGE_COUNT);

/** The published direction for the intelligent era — stated as direction, never as achieved milestones. */
export function DigitalDirection({ className = "" }: { className?: string }) {
  return (
    <div className={className}>
      <Reveal>
        <h3 className="font-display text-3xl md:text-4xl">Where it is heading</h3>
      </Reveal>

      <Stagger className="mt-12 grid grid-cols-1 gap-px overflow-hidden sm:grid-cols-3" step={0.12}>
        {visionStages.map((stage, i) => (
          <div key={stage} className="h-full bg-background/5 px-6 py-8 sm:px-7 sm:py-10">
            <span className="text-xs font-medium tracking-[0.2em] text-background/40">
              {String(i + 1).padStart(2, "0")}
            </span>
            <p className="mt-5 font-display text-2xl md:text-3xl">{stage}</p>
          </div>
        ))}
      </Stagger>

      <Reveal delay={0.15} className="mt-14">
        <h4 className="text-xs font-medium uppercase tracking-[0.2em] text-background/50">
          Capabilities named in that direction
        </h4>
        <ul className="mt-6 flex flex-wrap gap-x-3 gap-y-3">
          {capabilities.map((item) => (
            <li
              key={item}
              className="rounded-full border border-background/25 px-4 py-2 text-sm text-background/80"
            >
              {item}
            </li>
          ))}
        </ul>
      </Reveal>

      <ProvenanceMark
        kind="direction"
        tone="dark"
        note="stated direction, not a delivered milestone"
        className="mt-10"
      />
    </div>
  );
}
