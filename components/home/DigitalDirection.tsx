import { GROUND, type Ground } from "@/components/editorial/grounds";
import { Meta } from "@/components/editorial/SectionHead";
import { ProvenanceMark } from "@/components/home/ProvenanceMark";
import { Reveal } from "@/components/motion/Reveal";
import { digitalDirection, digitalHorizon, digitalMetrics } from "@/data/digital";

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
 * The two figures at the foot are delivered and are marked as verified. The
 * three stages are published direction for 2030 — PKSF has not said the
 * cashless, AI-driven end state exists today, and neither does this page.
 */
export function DigitalDirection({ ground = "ink", className = "" }: DigitalDirectionProps) {
  const g = GROUND[ground];

  return (
    <div className={className}>
      <Meta ground={ground}>Vision — where it is heading</Meta>

      <Reveal className="mt-8">
        <p className={`max-w-2xl text-lead ${g.muted}`}>
          &ldquo;{digitalHorizon.statement}&rdquo; — by {digitalHorizon.year}. Three
          stages, in an order that is not interchangeable: nothing goes cashless
          before it goes paperless, and nothing is data-intelligent before either.
        </p>
      </Reveal>

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
            <li key={item} className="flex items-baseline gap-2 font-mono text-body">
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
        note={`${digitalHorizon.source} — stated direction, not a delivered milestone`}
        className="mt-12"
      />

      {/* What has actually been delivered, separated from the direction above
          by a rule so the two are never read as one claim. */}
      <Reveal delay={0.12} className={`mt-16 border-t pt-10 ${g.border}`}>
        <Meta ground={ground}>Delivered so far</Meta>
        <dl className="mt-8 grid gap-10 sm:grid-cols-2">
          {digitalMetrics.map((metric) => (
            <div key={metric.label}>
              <dt className="font-mono text-[clamp(2.5rem,5vw,4rem)] leading-none tracking-[-0.03em]">
                {metric.value}
              </dt>
              <dd className="mt-4">
                <span className="block font-display text-title font-semibold text-balance">
                  {metric.label}
                </span>
                <span className={`mt-2 block max-w-xs text-body ${g.muted}`}>{metric.note}</span>
                <ProvenanceMark
                  kind="verified"
                  ground={ground}
                  note={`PKSF — Digital Transformation, ${metric.asOf}`}
                  className="mt-4"
                />
              </dd>
            </div>
          ))}
        </dl>
      </Reveal>
    </div>
  );
}
