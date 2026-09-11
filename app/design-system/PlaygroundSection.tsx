import { type ReactNode } from "react";
import { Container } from "@/components/layout/Container";
import { Reveal } from "@/components/motion/Reveal";

type PlaygroundSectionProps = {
  index: string;
  title: string;
  description?: string;
  children: ReactNode;
  className?: string;
};

/** Consistent numbered-heading wrapper for each lab section on /design-system. */
export function PlaygroundSection({ index, title, description, children, className = "" }: PlaygroundSectionProps) {
  return (
    <section id={title.toLowerCase().replace(/[^a-z0-9]+/g, "-")} className={`border-t border-ink/10 py-20 md:py-28 ${className}`}>
      <Container>
        <Reveal className="mb-14 flex flex-col gap-4 md:mb-20 md:flex-row md:items-end md:justify-between">
          <h2 className="font-display text-4xl md:text-5xl">
            <span className="mr-4 text-muted">{index}</span>
            {title}
          </h2>
          {description && <p className="max-w-md text-sm text-muted">{description}</p>}
        </Reveal>
        {children}
      </Container>
    </section>
  );
}
