import { AnimatedNumber } from "@/components/motion/AnimatedNumber";
import { THEME_CLASSES, type Theme } from "@/components/editorial/theme";

type ImpactNumberProps = {
  value: number;
  prefix?: string;
  suffix?: string;
  label: string;
  description?: string;
  /** Matches the surrounding section theme so the label stays legible on dark/green. */
  theme?: Theme;
  /** `plain` for values that must not be comma-grouped, such as a year. */
  format?: "grouped" | "plain";
  className?: string;
};

/**
 * Editorial statistic block: big count-up figure with a label and optional
 * supporting line. Wraps `AnimatedNumber` — never invent the `value` here,
 * source it from verified data (see data/impact.ts).
 */
export function ImpactNumber({
  value,
  prefix = "",
  suffix = "",
  label,
  description,
  theme = "light",
  format,
  className = "",
}: ImpactNumberProps) {
  const cls = THEME_CLASSES[theme];

  return (
    <div className={`${cls.text} ${className}`}>
      <AnimatedNumber
        value={value}
        prefix={prefix}
        suffix={suffix}
        format={format}
        className="font-display text-editorial"
      />
      <p className="mt-3 text-sm font-medium uppercase tracking-[0.15em]">{label}</p>
      {description && <p className={`mt-2 max-w-sm text-sm ${cls.muted}`}>{description}</p>}
    </div>
  );
}
