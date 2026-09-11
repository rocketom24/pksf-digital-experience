import { type ReactNode } from "react";
import { Reveal } from "@/components/motion/Reveal";
import { TextReveal } from "@/components/motion/TextReveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { THEME_CLASSES, type Theme } from "@/components/editorial/theme";

type MediaTextSectionProps = {
  media: ReactNode;
  eyebrow?: string;
  title: string;
  description?: ReactNode;
  cta?: ReactNode;
  mediaPosition?: "top" | "bottom";
  theme?: Theme;
  className?: string;
};

/** Stacked editorial composition: full-width media, then a text block below (or above via `mediaPosition`). */
export function MediaTextSection({ media, eyebrow, title, description, cta, mediaPosition = "top", theme = "light", className = "" }: MediaTextSectionProps) {
  const cls = THEME_CLASSES[theme];

  const textBlock = (
    <div className="mt-10 max-w-2xl">
      {eyebrow && <SectionLabel className={`mb-6 ${cls.muted}`}>{eyebrow}</SectionLabel>}
      <TextReveal as="h3" text={title} className="font-display text-4xl md:text-5xl" />
      {description && (
        <Reveal delay={0.2} className={`mt-6 text-lg ${cls.muted}`}>
          {description}
        </Reveal>
      )}
      {cta && (
        <Reveal delay={0.3} className="mt-8">
          {cta}
        </Reveal>
      )}
    </div>
  );

  const mediaBlock = <Reveal className="overflow-hidden">{media}</Reveal>;

  return (
    <div className={`${cls.text} ${className}`}>
      {mediaPosition === "top" ? (
        <>
          {mediaBlock}
          {textBlock}
        </>
      ) : (
        <>
          {textBlock}
          {mediaBlock}
        </>
      )}
    </div>
  );
}
