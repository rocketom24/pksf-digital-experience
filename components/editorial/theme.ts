/** Shared section themes for editorial components — see docs/art-direction.md "Color System". */
export type Theme = "light" | "dark" | "green";

export const THEME_CLASSES: Record<Theme, { bg: string; text: string; muted: string }> = {
  light: { bg: "bg-background", text: "text-ink", muted: "text-muted" },
  dark: { bg: "bg-ink", text: "text-background", muted: "text-background/60" },
  green: { bg: "bg-green-deep", text: "text-background", muted: "text-background/70" },
};
