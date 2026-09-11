import { type ReactNode } from "react";
import { THEME_CLASSES, type Theme } from "@/components/editorial/theme";

type SectionLabelProps = {
  children: ReactNode;
  /** Matches the surrounding section theme. */
  theme?: Theme;
  className?: string;
};

/**
 * Small editorial eyebrow label used to open a section.
 *
 * The colour comes from `theme`, not from a caller-supplied `text-*` class:
 * two text-colour utilities on one element resolve by stylesheet order, not
 * by the order they appear in `className`, so an override passed in here
 * silently lost to the default and left dark-section labels unreadable.
 */
export function SectionLabel({ children, theme = "light", className = "" }: SectionLabelProps) {
  const cls = THEME_CLASSES[theme];

  return (
    <span
      className={`inline-flex items-center gap-3 text-xs font-medium uppercase tracking-[0.2em] ${cls.muted} ${className}`}
    >
      <span
        className={`h-px w-8 ${theme === "light" ? "bg-green" : "bg-current"}`}
        aria-hidden="true"
      />
      {children}
    </span>
  );
}
