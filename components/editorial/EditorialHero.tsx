import { type ReactNode } from "react";
import { Reveal } from "@/components/motion/Reveal";
import { TextReveal } from "@/components/motion/TextReveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { THEME_CLASSES, type Theme } from "@/components/editorial/theme";

type EditorialHeroProps = {
  eyebrow?: string;
  title: string;
  description?: ReactNode;
  /** Background media — a placeholder block, gradient, or Image. Rendered behind content. */
  media?: ReactNode;
  theme?: Theme;
  align?: "start" | "center";
  /** CTAs or other trailing content, rendered below the description. */
  children?: ReactNode;
  fullHeight?: boolean;
  className?: string;
};

/** Reusable oversized editorial hero: eyebrow, TextReveal headline, description, optional media and CTAs. */
export function EditorialHero({
  eyebrow,
  title,
  description,
  media,
  theme = "dark",
  align = "start",
  children,
  fullHeight = true,
  className = "",
}: EditorialHeroProps) {
  const cls = THEME_CLASSES[theme];

  return (
    <section
      className={`relative flex flex-col overflow-hidden px-4.5 pb-24 pt-32 md:px-12 ${
        fullHeight ? "min-h-screen" : "min-h-[70vh]"
      } ${align === "center" ? "items-center justify-center text-center" : "justify-end"} ${cls.bg} ${cls.text} ${className}`}
    >
      {media && (
        <div aria-hidden="true" className="absolute inset-0 -z-10">
          {media}
        </div>
      )}

      {eyebrow && (
        <SectionLabel className={`mb-8 ${cls.muted}`}>{eyebrow}</SectionLabel>
      )}
      <TextReveal
        as="h1"
        text={title}
        className={`max-w-5xl font-display text-hero ${align === "center" ? "mx-auto" : ""}`}
      />
      {description && (
        <Reveal delay={0.3} className={`mt-8 max-w-xl text-lg ${cls.muted} ${align === "center" ? "mx-auto" : ""}`}>
          {description}
        </Reveal>
      )}
      {children && (
        <Reveal delay={0.45} className="mt-10">
          {children}
        </Reveal>
      )}
    </section>
  );
}
