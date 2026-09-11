import { Stagger } from "@/components/motion/Stagger";
import { organization } from "@/data/organization";

type Stage = { role: string; name: string; description: string };

/**
 * Every line here is a restatement of `organization.mandate` — the relay is
 * the one structural fact about PKSF the concept can state outright: it is
 * an apex body, so it reaches people through Partner Organisations rather
 * than directly. Numbering is used because the sequence is real.
 */
const STAGES: Stage[] = [
  {
    role: "Apex",
    name: organization.shortName,
    description:
      "Channels funds, capacity building and policy support. It does not deliver services to households itself.",
  },
  {
    role: "Network",
    name: "Partner Organisations",
    description:
      "A nationwide network of organisations that receive that support and operate locally, close to the people they serve.",
  },
  {
    role: "Last mile",
    name: "Communities",
    description:
      "Rural and low-income communities receive microfinance, microenterprise and social development services where they live.",
  },
];

/** The PKSF → Partner Organisation → community relay, as an editorial sequence. */
export function MandateRelay({ className = "" }: { className?: string }) {
  return (
    <Stagger
      className={`grid grid-cols-1 border-ink/15 md:grid-cols-3 md:gap-x-8 ${className}`}
      step={0.12}
    >
      {STAGES.map((stage, i) => (
        <div
          key={stage.name}
          className="relative border-l border-ink/15 pb-12 pl-6 last:pb-0 md:border-l-0 md:border-t md:pb-0 md:pl-0 md:pt-10"
        >
          <span
            aria-hidden="true"
            className="absolute left-[-3.5px] top-0 size-1.5 rounded-full bg-green md:left-0 md:top-[-3.5px]"
          />
          <span className="flex items-baseline gap-3 text-xs font-medium uppercase tracking-[0.2em] text-ink/50">
            <span>{String(i + 1).padStart(2, "0")}</span>
            {stage.role}
          </span>
          <h3 className="mt-4 font-display text-3xl md:text-4xl">{stage.name}</h3>
          <p className="mt-4 max-w-sm text-base text-ink/70">{stage.description}</p>
        </div>
      ))}
    </Stagger>
  );
}
