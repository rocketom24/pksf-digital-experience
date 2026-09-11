import { GROUND, type Ground } from "@/components/editorial/grounds";
import { Meta } from "@/components/editorial/SectionHead";
import { ProvenanceMark } from "@/components/home/ProvenanceMark";
import { Reveal } from "@/components/motion/Reveal";
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
 * one stated day.
 */
export function ImpactLedger({ ground = "ink", className = "" }: ImpactLedgerProps) {
  const g = GROUND[ground];

  return (
    <div className={`grid grid-cols-1 gap-16 lg:grid-cols-12 lg:gap-12 ${className}`}>
      <div className="flex flex-col gap-14 lg:col-span-5">
        {headlineMetrics.map((fact, i) => (
          <Reveal key={fact.slug} delay={i * 0.1}>
            <p className="font-mono text-[clamp(3.5rem,8vw,7rem)] leading-none tracking-[-0.04em]">
              {fact.value}
            </p>
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
        ))}
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
              className={`grid gap-1 border-t py-5 sm:grid-cols-[1fr_auto] sm:items-baseline sm:gap-8 ${g.border}`}
            >
              <dt className="font-display text-title font-medium text-balance">
                {metric.label}
                {metric.note && (
                  <span className={`mt-1 block text-body font-normal ${g.muted}`}>
                    {metric.note}
                  </span>
                )}
              </dt>
              <dd className={`font-mono text-sm sm:text-right ${g.accent}`}>{metric.value}</dd>
            </Reveal>
          ))}
        </dl>

        <ProvenanceMark
          kind="verified"
          ground={ground}
          note="PKSF — At a Glance, as of 30 April 2026"
          className={`mt-6 border-t pt-6 ${g.border}`}
        />
      </div>
    </div>
  );
}
