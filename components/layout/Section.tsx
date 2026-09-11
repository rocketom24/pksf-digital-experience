import { type ReactNode } from "react";

type SectionProps = {
  children: ReactNode;
  id?: string;
  className?: string;
  /** Storytelling sections use larger vertical rhythm; false for tighter utility sections. */
  spacious?: boolean;
};

/** Consistent vertical rhythm for page sections — see docs/art-direction.md "Spacing". */
export function Section({
  children,
  id,
  className = "",
  spacious = true,
}: SectionProps) {
  return (
    <section
      id={id}
      className={`${spacious ? "py-24 md:py-32 lg:py-48" : "py-12 md:py-16"} ${className}`}
    >
      {children}
    </section>
  );
}
