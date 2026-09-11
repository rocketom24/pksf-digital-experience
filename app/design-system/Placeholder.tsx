type PlaceholderProps = {
  label?: string;
  className?: string;
  tone?: "sand" | "clay" | "sky" | "green";
};

const TONES: Record<NonNullable<PlaceholderProps["tone"]>, string> = {
  sand: "bg-sand",
  clay: "bg-clay",
  sky: "bg-sky",
  green: "bg-green-soft",
};

/**
 * Safe stand-in for imagery that doesn't exist yet (see docs/art-direction.md
 * "Image Direction" — no generic stock or AI-looking placeholders are used
 * even here; this is intentionally abstract, labeled as a placeholder).
 */
export function Placeholder({ label = "Placeholder — imagery pending", className = "", tone = "sand" }: PlaceholderProps) {
  return (
    <div className={`flex aspect-[4/3] w-full items-center justify-center ${TONES[tone]} ${className}`}>
      <span className="px-6 text-center text-xs font-medium uppercase tracking-[0.2em] text-ink/50">{label}</span>
    </div>
  );
}
