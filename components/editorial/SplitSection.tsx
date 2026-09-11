import { type ReactNode } from "react";
import { Reveal } from "@/components/motion/Reveal";
import { THEME_CLASSES, type Theme } from "@/components/editorial/theme";

type SplitSectionProps = {
  media: ReactNode;
  children: ReactNode;
  /** Puts media on the right instead of the left. */
  reverse?: boolean;
  theme?: Theme;
  className?: string;
};

/** Two-column editorial layout: media on one side, content on the other. Stacks on mobile. */
export function SplitSection({ media, children, reverse = false, theme = "light", className = "" }: SplitSectionProps) {
  const cls = THEME_CLASSES[theme];

  return (
    <div className={`grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-16 ${cls.text} ${className}`}>
      <div className={reverse ? "lg:order-2" : ""}>
        <Reveal className="overflow-hidden">{media}</Reveal>
      </div>
      <div className={reverse ? "lg:order-1" : ""}>
        <Reveal delay={0.15}>{children}</Reveal>
      </div>
    </div>
  );
}
