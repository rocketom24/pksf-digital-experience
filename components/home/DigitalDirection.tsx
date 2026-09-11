import { GROUND, type Ground } from "@/components/editorial/grounds";
import { Meta } from "@/components/editorial/SectionHead";
import { ProvenanceMark } from "@/components/home/ProvenanceMark";
import { Reveal } from "@/components/motion/Reveal";
import { digitalDirection } from "@/data/digital";

/**
 * `digitalDirection` is ordered capabilities-first, then the three-stage end
 * state. Splitting it here keeps both groups sourced from the one array — the
 * strings are never restated in this file, and never reworded. "Paperless
 * systems" is displayed as "Paperless systems"; only the casing is a style.
 */
const VISION_STAGE_COUNT = 3;
const capabilities = digitalDirection.slice(0, digitalDirection.length - VISION_STAGE_COUNT);
const visionStages = digitalDirection.slice(-VISION_STAGE_COUNT);

type DigitalDirectionProps = { ground?: Ground; className?: string };

/**
 * The stated end state, given the page's largest type.
 *
 * Three stages down a single ruled column, numbered because the sequence is
 * real: an organisation cannot go cashless before it goes paperless, and
 * cannot be data-intelligent before either. The capabilities below are the
 * means, set small in the mono, so the hierarchy says which is the claim and
 * which is the detail.
 *
 * Every string here is published direction, not a delivered milestone, and
 * the provenance mark says so.
 */
export function DigitalDirection({ ground = "ink", className = "" }: DigitalDirectionProps) {
  const g = GROUND[ground];

  return (
    <div className={className}>
      <Meta ground={ground}>Vision — where it is heading</Meta>

      <ol className="mt-12 md:mt-16">
        {visionStages.map((stage, i) => (
          <li key={stage} className={`border-t ${g.border}`}>
            <Reveal delay={i * 0.12} className="flex items-start gap-6 py-8 md:gap-12 md:py-12">
              <span className={`mt-3 shrink-0 font-mono text-meta uppercase ${g.accent}`}>
                {String(i + 1).padStart(2, "0")}
              </span>
              <p className="font-display text-display font-bold uppercase text-balance">{stage}</p>
            </Reveal>
          </li>
        ))}
        <li className={`border-t ${g.border}`} aria-hidden="true" />
      </ol>

      <Reveal delay={0.12} className="mt-14">
        <h4>
          <Meta ground={ground}>Capabilities named in that direction</Meta>
        </h4>
        <ul className={`mt-6 flex flex-wrap gap-x-8 gap-y-3 ${g.muted}`}>
          {capabilities.map((item) => (
            <li key={item} className="flex items-baseline gap-2 font-mono text-sm">
              <span aria-hidden="true" className={g.accent}>
                ·
              </span>
              {item}
            </li>
          ))}
        </ul>
      </Reveal>

      <ProvenanceMark
        kind="direction"
        ground={ground}
        note="stated direction, not a delivered milestone"
        className="mt-12"
      />
    </div>
  );
}
