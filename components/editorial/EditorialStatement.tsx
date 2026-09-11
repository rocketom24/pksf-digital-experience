import { type ReactNode } from "react";
import { Reveal } from "@/components/motion/Reveal";
import { TextReveal } from "@/components/motion/TextReveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { THEME_CLASSES, type Theme } from "@/components/editorial/theme";

type EditorialStatementProps = {
  eyebrow?: string;
  text: string;
  description?: ReactNode;
  align?: "start" | "center";
  theme?: Theme;
  className?: string;
};

/** Large centered/left editorial statement — the "big line" that carries a section. */
export function EditorialStatement({ eyebrow, text, description, align = "start", theme = "light", className = "" }: EditorialStatementProps) {
  const cls = THEME_CLASSES[theme];
  const alignClass = align === "center" ? "mx-auto text-center" : "";

  return (
    <div className={`${cls.text} ${className}`}>
      {eyebrow && (
        <SectionLabel theme={theme} className={`mb-6 ${alignClass}`}>
          {eyebrow}
        </SectionLabel>
      )}
      <TextReveal as="h2" text={text} className={`max-w-4xl font-display text-editorial ${alignClass}`} />
      {description && (
        <Reveal delay={0.25} className={`mt-8 max-w-xl text-lg ${cls.muted} ${alignClass}`}>
          {description}
        </Reveal>
      )}
    </div>
  );
}
