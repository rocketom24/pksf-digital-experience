import { type ReactNode } from "react";
import { GROUND, type Ground } from "@/components/editorial/grounds";

export type Provenance = "verified" | "editorial" | "direction" | "pending";

type ProvenanceMarkProps = {
  kind: Provenance;
  /** Short trailing note — the source, or what is still required. */
  note?: ReactNode;
  ground?: Ground;
  className?: string;
};

const LABEL: Record<Provenance, string> = {
  verified: "Verified",
  editorial: "Editorial reading",
  direction: "Published direction",
  pending: "Awaiting source",
};

/**
 * The mark is shaped, not just coloured: solid for a verified fact, a half
 * for a reading of one, a ring for a stated direction, a dashed ring for a
 * gap. The written label carries the meaning on its own, so the shape is a
 * second channel rather than the only one — but it means the four states are
 * still distinguishable at a glance on every ground.
 */
const SHAPE: Record<Provenance, string> = {
  verified: "bg-current",
  editorial: "bg-gradient-to-r from-current from-50% to-transparent to-50% ring-1 ring-current",
  direction: "ring-1 ring-current",
  pending: "border border-dashed border-current",
};

/**
 * The page's provenance system.
 *
 * This is an independent concept, so nothing on it may read as an official
 * PKSF statement and nothing unverified may read as a fact. Every claim
 * carries one of four labels, in plain text rather than behind a tooltip:
 * the label is content, not a disclosure widget.
 */
export function ProvenanceMark({
  kind,
  note,
  ground = "parchment",
  className = "",
}: ProvenanceMarkProps) {
  const g = GROUND[ground];

  return (
    // A `span`, not a `p` — this sits inside paragraph-level slots, where a
    // nested `<p>` would be invalid HTML and would break hydration.
    // `flex-wrap` with a non-breaking label: on a narrow column the note drops
    // to its own line rather than squeezing the label into two words stacked
    // against it.
    <span
      className={`flex flex-wrap items-baseline gap-x-2.5 gap-y-1 font-mono text-meta leading-relaxed ${g.muted} ${className}`}
    >
      <span
        aria-hidden="true"
        className={`relative top-px size-1.5 shrink-0 rounded-full ${SHAPE[kind]}`}
      />
      <span className="whitespace-nowrap uppercase">{LABEL[kind]}</span>
      {note && <span className="min-w-0 normal-case opacity-75">— {note}</span>}
    </span>
  );
}
