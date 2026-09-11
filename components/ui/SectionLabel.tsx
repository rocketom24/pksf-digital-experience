import { type ReactNode } from "react";

type SectionLabelProps = {
  children: ReactNode;
  className?: string;
};

/** Small editorial eyebrow label used to open a section. */
export function SectionLabel({ children, className = "" }: SectionLabelProps) {
  return (
    <span
      className={`inline-flex items-center gap-3 text-xs font-medium uppercase tracking-[0.2em] text-muted ${className}`}
    >
      <span className="h-px w-8 bg-green" aria-hidden="true" />
      {children}
    </span>
  );
}
