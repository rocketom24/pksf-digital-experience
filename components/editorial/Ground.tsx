import { type ReactNode } from "react";
import { GROUND, type Ground as GroundName } from "@/components/editorial/grounds";

type GroundProps = {
  ground: GroundName;
  children: ReactNode;
  id?: string;
  /** Draws the hairline that marks the change of register at the top edge. */
  rule?: boolean;
  /**
   * Section index, set oversized and straddling the top edge so the new
   * section begins before its ground does. The numbers are the ones the
   * navigation uses, so this marks position in a real sequence rather than
   * decorating the seam.
   */
  marker?: string;
  className?: string;
};

/**
 * A full-bleed band of one ground colour.
 *
 * The background is painted statically. Phase 3 animated it in on
 * `whileInView` and the reveal silently failed whenever the viewport jumped
 * inside the section, leaving light text on a light ground for the rest of
 * the session. Nothing that carries contrast is allowed to depend on an
 * animation having run; the transition between sections is carried by type
 * and by the delta instead.
 *
 * `overflow-x: clip` rather than `overflow-hidden`: clip is not a scroll
 * container, so oversized display type can hang past the viewport edge
 * without `position: sticky` breaking for anything nested inside.
 */
export function Ground({
  ground,
  children,
  id,
  rule = false,
  marker,
  className = "",
}: GroundProps) {
  const g = GROUND[ground];

  return (
    <section
      id={id}
      className={`relative isolate overflow-x-clip ${g.bg} ${g.text} ${id ? "scroll-mt-16" : ""} ${className}`}
    >
      {rule && <span aria-hidden="true" className={`absolute inset-x-0 top-0 h-px ${g.rule}`} />}

      {/* Vertical overflow is deliberately not clipped, so the numeral paints
          over the section above and the two grounds are bridged by one
          element. It is set in this section's own ink at low opacity: faint
          on the ground above, resolving as the new ground arrives. */}
      {marker && (
        <span
          aria-hidden="true"
          className="pointer-events-none absolute left-4.5 top-0 -translate-y-1/2 select-none font-mono text-colossal font-medium leading-none tracking-tighter opacity-[0.11] md:left-12"
        >
          {marker}
        </span>
      )}

      {children}
    </section>
  );
}
