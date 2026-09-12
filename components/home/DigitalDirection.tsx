import { GROUND, type Ground } from "@/components/editorial/grounds";
import { Meta } from "@/components/editorial/SectionHead";
import { Odometer } from "@/components/home/Odometer";
import { ProvenanceMark } from "@/components/home/ProvenanceMark";
import { Reveal } from "@/components/motion/Reveal";
import { Rise } from "@/components/motion/Rise";
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
 * cannot be data-intelligent before either. Each stage rises out from behind
 * its own rule as it arrives, and carries its position in the sequence at the
 * far edge of the measure — so a row that was a word floating in the left
 * half of a very wide column now spans it, and the three rows read as a
 * ladder with a direction rather than as three captions.
 *
 * The capabilities below are the means. They are set as a numbered register
 * rather than as a bullet run, because a comma-separated line of five is the
 * one shape that says "and some other things"; these are the five PKSF named.
 *
 * The two figures at the foot are delivered and are marked as verified. The
 * three stages are published direction for 2030 — PKSF has not said the
 * cashless, AI-driven end state exists today, and neither does this page.
 * That is also why only the delivered figures roll: a count-up on a 2030
 * stage would animate a target into looking like a reading.
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

      <ol className="mt-16 md:mt-20">
        {visionStages.map((stage, i) => (
          <li key={stage} className={`border-t ${g.border}`}>
            <div className="flex items-baseline justify-between gap-8 py-10 md:py-14">
              <div className="flex min-w-0 items-baseline gap-6 md:gap-12">
                <span className={`shrink-0 font-mono text-meta uppercase ${g.accent}`}>
                  {String(i + 1).padStart(2, "0")}
                </span>
                <Rise distance={90} delay={i * 0.08}>
                  <p className="font-display text-display font-bold uppercase text-balance">
                    {stage}
                  </p>
                </Rise>
              </div>

              {/* The far edge of the measure, so the row spans the column it
                  is in. It is the stage's own position in the published
                  sequence, not a status — nothing here says a stage is
                  reached. */}
              <Reveal
                delay={i * 0.08 + 0.12}
                className={`hidden shrink-0 font-mono text-meta uppercase lg:block ${g.muted}`}
              >
                Stage {String(i + 1).padStart(2, "0")} of{" "}
                {String(visionStages.length).padStart(2, "0")}
              </Reveal>
            </div>
          </li>
        ))}
        <li className={`border-t ${g.border}`} aria-hidden="true" />
      </ol>

      <Reveal delay={0.12} className="mt-16">
        <h4>
          <Meta ground={ground}>Capabilities named in that direction</Meta>
        </h4>
      </Reveal>

      <ul className={`mt-8 grid border-t sm:grid-cols-2 lg:grid-cols-3 ${g.border}`}>
        {capabilities.map((item, i) => (
          <li key={item} className={`border-b sm:odd:pr-8 lg:nth-[3n+1]:pr-8 ${g.border}`}>
            <Reveal delay={i * 0.05} className="flex items-baseline gap-5 py-5">
              <span className={`shrink-0 font-mono text-meta uppercase ${g.accent}`}>
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="font-display text-body font-medium">{item}</span>
            </Reveal>
          </li>
        ))}
      </ul>

      <ProvenanceMark
        kind="direction"
        ground={ground}
        note={`${digitalHorizon.source} — stated direction, not a delivered milestone`}
        className="mt-10"
      />

      {/* What has actually been delivered, separated from the direction above
          by a rule so the two are never read as one claim. */}
      <div className={`mt-20 border-t pt-12 ${g.border}`}>
        <Reveal>
          <Meta ground={ground}>Delivered so far</Meta>
        </Reveal>

        <dl className="mt-10 grid gap-12 sm:grid-cols-2 lg:gap-20">
          {digitalMetrics.map((metric, i) => (
            <div key={metric.label}>
              {/* Split at the percent sign so the digits roll and the unit is
                  painted. These two are completed measurements rather than a
                  running balance, so arriving at them is honest. */}
              <dt className="font-mono text-[clamp(3rem,6vw,5rem)] leading-none tracking-[-0.03em]">
                <Odometer value={metric.value.replace("%", "")} suffix="%" />
              </dt>
              <dd className="mt-6">
                <Rise delay={i * 0.08}>
                  <span className="block font-display text-headline font-semibold text-balance">
                    {metric.label}
                  </span>
                </Rise>
                <span className={`mt-4 block max-w-xs text-body ${g.muted}`}>{metric.note}</span>
                <ProvenanceMark
                  kind="verified"
                  ground={ground}
                  note={`PKSF — Digital Transformation, ${metric.asOf}`}
                  className="mt-5"
                />
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
}
