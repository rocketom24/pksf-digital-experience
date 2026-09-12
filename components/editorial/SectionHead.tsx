import { type ReactNode } from "react";
import { GROUND, type Ground } from "@/components/editorial/grounds";
import { Reveal } from "@/components/motion/Reveal";

type MetaProps = {
  children: ReactNode;
  ground?: Ground;
  className?: string;
};

/**
 * Mono metadata. Section names, indices, years, counts, provenance — every
 * label that would have been written into a register. Never used for prose.
 */
export function Meta({ children, ground = "parchment", className = "" }: MetaProps) {
  return (
    <span
      className={`font-mono text-meta uppercase ${GROUND[ground].muted} ${className}`}
    >
      {children}
    </span>
  );
}

type SectionHeadProps = {
  /** Left: what this section is. Sits against a short accent rule. */
  label: string;
  /** Left, under the label: the section's own headline. */
  heading?: ReactNode;
  /** Right: a single short line stating the section's claim. */
  note?: ReactNode;
  /** Right, under the note: provenance, sources, counts. */
  aside?: ReactNode;
  ground?: Ground;
  className?: string;
};

/**
 * The opening row of every section.
 *
 * Deliberately asymmetric rather than centred: the label and headline hang
 * off the left edge of the grid while the claim and its provenance sit hard
 * right, so the eye crosses the full measure before the section body starts.
 * The consistent row is what makes ten differently-composed sections read as
 * one publication.
 */
export function SectionHead({
  label,
  heading,
  note,
  aside,
  ground = "parchment",
  className = "",
}: SectionHeadProps) {
  const g = GROUND[ground];

  return (
    <div className={className}>
      <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
        <span className="flex items-center gap-3">
          <span aria-hidden="true" className={`h-px w-8 shrink-0 ${g.rule}`} />
          <Meta ground={ground}>{label}</Meta>
        </span>

        {/* Set left-aligned but placed hard right: a right-aligned rag under a
            two-line claim and a wrapping provenance label reads as an
            accident rather than a decision. */}
        {note && (
          <div className="max-w-xs sm:ml-auto">
            <p className={`font-display text-body font-medium ${g.text}`}>{note}</p>
            {aside && <div className="mt-3">{aside}</div>}
          </div>
        )}
      </div>

      {heading && (
        <Reveal className="mt-10 md:mt-14">
          <h2 className="max-w-5xl font-display text-display font-semibold text-balance">
            {heading}
          </h2>
        </Reveal>
      )}
    </div>
  );
}
