import { GROUND, type Ground } from "@/components/editorial/grounds";
import { Meta } from "@/components/editorial/SectionHead";
import { ProvenanceMark } from "@/components/home/ProvenanceMark";
import { Reveal } from "@/components/motion/Reveal";
import { Rise } from "@/components/motion/Rise";
import { headlineMetrics, impactMetrics } from "@/data/impact";

type ImpactLedgerProps = { ground?: Ground; className?: string };

/**
 * The ledger.
 *
 * Two published figures at the scale a homepage reserves for its headline
 * numbers, and the rest of the at-a-glance set listed beside them. Every
 * figure carries the date PKSF reported it against — a statistic without its
 * reporting period reads as timeless, which none of these are.
 *
 * The figures are set in the mono and are never counted up. A count-up makes
 * a reported balance look like a live meter; these are a snapshot taken on
 * one stated day. What they do instead is rise out from behind their own
 * edge, which is movement without a claim: the number is the number it was
 * on 30 April, whether or not the mask has run.
 */
export function ImpactLedger({ ground = "ink", className = "" }: ImpactLedgerProps) {
  const g = GROUND[ground];

  return (
    <div className={`grid grid-cols-1 gap-16 lg:grid-cols-12 lg:gap-12 ${className}`}>
      {/* The two headline figures. Pinned from `lg`, so they hold while the
          rest of the glance is read against them — and so the column does not
          end 250px short of the list beside it, which is what it did when
          both columns simply ran out at their own length. */}
      <div className="lg:col-span-5">
        <div className="flex flex-col gap-16 lg:sticky lg:top-28 lg:gap-20">
          {headlineMetrics.map((fact, i) => (
            <div key={fact.slug} className={`border-t pt-8 ${g.border}`}>
              <Reveal delay={i * 0.1}>
                <Meta ground={ground}>
                  <span className={g.accent}>{String(i + 1).padStart(2, "0")}</span> /{" "}
                  {String(headlineMetrics.length).padStart(2, "0")}
                </Meta>
              </Reveal>

              {/* The mask has to be deeper than a line of type at this size,
                  and the travel with it — 70px under a 7rem numeral is a
                  nudge, not an arrival. */}
              <Rise className="mt-5" delay={i * 0.1 + 0.06} distance={110}>
                <p className="font-mono text-[clamp(3.5rem,8vw,7rem)] leading-none tracking-[-0.04em]">
                  {fact.value}
                </p>
              </Rise>

              <Reveal delay={i * 0.1 + 0.14}>
                <h3 className="mt-5 max-w-sm font-display text-title font-semibold text-balance">
                  {fact.label}
                </h3>
                {fact.note && <p className={`mt-3 max-w-sm text-body ${g.muted}`}>{fact.note}</p>}
                <ProvenanceMark
                  kind="verified"
                  ground={ground}
                  note={`${fact.source}, as of ${fact.asOf}`}
                  className="mt-5"
                />
              </Reveal>
            </div>
          ))}
        </div>
      </div>

      <div className="lg:col-span-6 lg:col-start-7">
        <Reveal>
          <Meta ground={ground}>The rest of the glance</Meta>
          <p className={`mt-6 max-w-lg text-lead ${g.muted}`}>
            PKSF publishes these against a stated reporting date. They are
            reproduced here at that precision, and none of them is combined
            with a figure from another period.
          </p>
        </Reveal>

        <dl className="mt-12">
          {impactMetrics.map((metric, i) => (
            <Reveal
              key={metric.slug}
              delay={0.06 * i}
              /* `group` and a relative box for the hover rule below. The row
                 is not a link and does not become one — the movement is a
                 reading aid, pointing at the line the pointer is on. */
              className={`group relative grid gap-1 border-t py-6 sm:grid-cols-[1fr_auto] sm:items-baseline sm:gap-8 ${g.border}`}
            >
              {/* The row's own rule, drawn in full ink over the hairline as
                  the pointer arrives. `bg-current` inherits the ground's text
                  colour, so it needs no per-ground variant. */}
              <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-0 top-0 h-px origin-left scale-x-0 bg-current opacity-45 transition-transform duration-500 ease-[var(--ease-editorial)] motion-safe:group-hover:scale-x-100"
              />

              <dt className="font-display text-title font-medium text-balance">
                {metric.label}
                {metric.note && (
                  <span className={`mt-1 block text-body font-normal ${g.muted}`}>
                    {metric.note}
                  </span>
                )}
              </dt>
              {/* The figure itself — the answer the row exists to give — set
                  above reading size and stepped out under the pointer so the
                  eye lands on it. `text-lead` rather than `text-title`: the
                  mono is a wide face and a 2.25rem `BDT 407.38 billion` takes
                  enough of the row to wrap `Member savings` beside it, which
                  makes the figure prominent by breaking the label. */}
              <dd
                className={`font-mono text-lead font-medium transition-transform duration-500 ease-[var(--ease-editorial)] sm:text-right motion-safe:group-hover:-translate-x-1 ${g.accent}`}
              >
                {metric.value}
              </dd>
            </Reveal>
          ))}
          {/* Closes the last row. A `<dl>` may hold `<div>` wrappers, so this
              is one rather than a stray `<span>`. */}
          <div aria-hidden="true" className={`border-t ${g.border}`} />
        </dl>

        <ProvenanceMark
          kind="verified"
          ground={ground}
          note="PKSF — At a Glance, as of 30 April 2026"
          className="mt-6"
        />
      </div>
    </div>
  );
}
