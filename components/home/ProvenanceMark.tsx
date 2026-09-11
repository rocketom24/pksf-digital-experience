import { type ReactNode } from "react";

export type Provenance = "verified" | "editorial" | "direction" | "pending";

type ProvenanceMarkProps = {
  kind: Provenance;
  /** Short trailing note, e.g. the source or what is still required. */
  note?: ReactNode;
  /** `dark` for use on the ink / deep-green themes. */
  tone?: "light" | "dark";
  className?: string;
};

const MARKS: Record<Provenance, { label: string; dot: string }> = {
  verified: { label: "Verified", dot: "bg-green" },
  editorial: { label: "Editorial reading", dot: "bg-clay" },
  direction: { label: "Published direction", dot: "bg-sky" },
  pending: { label: "Awaiting source", dot: "border border-current" },
};

const TONE = {
  light: "text-ink/70",
  dark: "text-background/70",
} as const;

/**
 * The page's provenance system. Every factual claim on the homepage is
 * labelled with where it comes from — this is an independent concept, so
 * nothing may read as an official PKSF statement, and nothing unverified
 * may read as a fact. Plain text, not a tooltip: the label is the content.
 */
export function ProvenanceMark({ kind, note, tone = "light", className = "" }: ProvenanceMarkProps) {
  const mark = MARKS[kind];

  return (
    // A `span`, not a `p` — this sits inside paragraph-level slots such as
    // StickyStory's `description`, where a nested `<p>` would be invalid HTML
    // and would break hydration.
    <span className={`flex items-baseline gap-2 text-[11px] leading-relaxed ${TONE[tone]} ${className}`}>
      <span
        aria-hidden="true"
        className={`relative -top-px size-1.5 shrink-0 rounded-full ${mark.dot}`}
      />
      <span className="font-medium uppercase tracking-[0.18em]">{mark.label}</span>
      {note && <span className="opacity-80">— {note}</span>}
    </span>
  );
}
