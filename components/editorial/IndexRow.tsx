import { type ReactNode } from "react";
import { GROUND, type Ground } from "@/components/editorial/grounds";
import { Reveal } from "@/components/motion/Reveal";

export type IndexRowMeta = { label: string; value: ReactNode };

type IndexRowProps = {
  id?: string;
  /** Mono index. These are numbered sets, not a pile of equivalent things. */
  index: string;
  title: ReactNode;
  /** Sits directly under the title — a full official name, a date, a status. */
  kicker?: ReactNode;
  children?: ReactNode;
  /** Ruled label/value pairs under the body. Durations, partners, budgets. */
  meta?: IndexRowMeta[];
  footer?: ReactNode;
  ground?: Ground;
  className?: string;
};

/**
 * One row of an editorial index.
 *
 * The desk holds four lists — programmes, projects, knowledge, news — and a
 * card grid would say they are four sets of equivalent tiles. A ruled row
 * says index, which is what an apex institution's desk actually is. The same
 * three-part grid carries all four so the lists read as one publication
 * rather than four widgets, and the title keeps real display scale so a
 * programme name is never reduced to a label on a box.
 */
export function IndexRow({
  id,
  index,
  title,
  kicker,
  children,
  meta,
  footer,
  ground = "parchment",
  className = "",
}: IndexRowProps) {
  const g = GROUND[ground];

  return (
    <Reveal className={`group relative scroll-mt-28 border-t ${g.border} ${className}`}>
      {/* The row the pointer is on, drawn over the hairline in full ink. The
          desk is sixteen rows of the same three-part grid — which is the
          point, it is an index — and at that length the eye needs something
          that says which line it is on. It is `bg-current`, so it takes the
          ground's own text colour and needs no per-ground variant, and it
          carries nothing: the row is complete without it. */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-px origin-left scale-x-0 bg-current opacity-45 transition-transform duration-500 ease-[var(--ease-editorial)] motion-safe:group-hover:scale-x-100"
      />

      <div
        id={id}
        className="grid grid-cols-1 gap-4 py-8 md:grid-cols-12 md:gap-8 md:py-10"
      >
        <span className={`font-mono text-meta uppercase md:col-span-1 ${g.accent}`}>{index}</span>

        <div className="md:col-span-5 md:transition-transform md:duration-500 md:ease-[var(--ease-editorial)] motion-safe:md:group-hover:translate-x-2">
          <h4 className="font-display text-headline font-semibold text-balance">{title}</h4>
          {kicker && (
            <p className={`mt-3 max-w-sm font-mono text-meta uppercase ${g.muted}`}>{kicker}</p>
          )}
        </div>

        <div className="md:col-span-6">
          {children && <div className={`max-w-lg text-lead ${g.muted}`}>{children}</div>}

          {meta && (
            <dl className={`mt-6 border-t ${g.border}`}>
              {meta.map((entry) => (
                <div
                  key={entry.label}
                  className={`grid gap-1 border-b py-3 sm:grid-cols-[9rem_1fr] sm:gap-6 ${g.border}`}
                >
                  <dt className={`font-mono text-meta uppercase ${g.muted}`}>{entry.label}</dt>
                  <dd className="text-body">{entry.value}</dd>
                </div>
              ))}
            </dl>
          )}

          {footer && <div className="mt-5">{footer}</div>}
        </div>
      </div>
    </Reveal>
  );
}
