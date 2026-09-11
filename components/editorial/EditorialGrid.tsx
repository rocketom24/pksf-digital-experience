import { type ReactNode } from "react";
import { Stagger } from "@/components/motion/Stagger";

type EditorialGridProps = {
  children: ReactNode;
  /** Columns at the lg breakpoint; mobile is always 1, tablet 2. */
  columns?: 2 | 3 | 4;
  className?: string;
};

const LG_COLS: Record<2 | 3 | 4, string> = {
  2: "lg:grid-cols-2",
  3: "lg:grid-cols-3",
  4: "lg:grid-cols-4",
};

/** Responsive editorial grid with a staggered viewport reveal of each cell. */
export function EditorialGrid({ children, columns = 3, className = "" }: EditorialGridProps) {
  return (
    <Stagger className={`grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 ${LG_COLS[columns]} ${className}`}>
      {children}
    </Stagger>
  );
}
