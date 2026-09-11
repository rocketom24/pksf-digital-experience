type ScrollCueProps = {
  /** In-page target, so the cue is a working control and not decoration. */
  href: string;
  label?: string;
  className?: string;
};

/** Hero scroll affordance: a travelling hairline plus a real skip-to-section link. */
export function ScrollCue({ href, label = "Scroll", className = "" }: ScrollCueProps) {
  return (
    <a
      href={href}
      className={`inline-flex items-center gap-4 text-xs font-medium uppercase tracking-[0.2em] text-background/70 transition-colors hover:text-background focus-visible:outline-2 focus-visible:outline-current ${className}`}
    >
      <span aria-hidden="true" className="relative block h-10 w-px overflow-hidden bg-background/25">
        <span className="absolute inset-x-0 top-0 block h-full animate-cue bg-background motion-reduce:animate-none" />
      </span>
      {label}
    </a>
  );
}
