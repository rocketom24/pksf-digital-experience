import { type ReactNode } from "react";
import { Reveal } from "@/components/motion/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { THEME_CLASSES, type Theme } from "@/components/editorial/theme";

export type StickyStoryItem = {
  title: string;
  description: ReactNode;
};

type StickyStoryProps = {
  eyebrow?: string;
  heading: string;
  description?: ReactNode;
  items: StickyStoryItem[];
  theme?: Theme;
  className?: string;
};

/**
 * Left heading stays visually anchored (CSS `sticky`, not JS) while story
 * items scroll past on the right. No pinning math, no scroll listeners —
 * the browser does this natively, so nothing to hijack. Reading order in
 * the DOM is heading-then-items either way, so it's identical for screen
 * readers on desktop and mobile.
 */
export function StickyStory({ eyebrow, heading, description, items, theme = "light", className = "" }: StickyStoryProps) {
  const cls = THEME_CLASSES[theme];

  return (
    <div className={`grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16 ${cls.text} ${className}`}>
      <div className="lg:sticky lg:top-32 lg:col-span-4 lg:self-start">
        {eyebrow && <SectionLabel className={`mb-6 ${cls.muted}`}>{eyebrow}</SectionLabel>}
        <h2 className="font-display text-4xl md:text-5xl">{heading}</h2>
        {description && <p className={`mt-6 max-w-sm text-lg ${cls.muted}`}>{description}</p>}
      </div>

      <div className="flex flex-col gap-24 lg:col-span-7 lg:col-start-6">
        {items.map((item, i) => (
          <Reveal key={i}>
            <h3 className="font-display text-2xl md:text-3xl">{item.title}</h3>
            <div className={`mt-4 max-w-lg text-lg ${cls.muted}`}>{item.description}</div>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
