export type DigitalEra = {
  period: string;
  title: string;
  description?: string;
};

/** Verified PKSF digital transformation timeline. Do not add milestones. */
export const digitalTimeline: DigitalEra[] = [
  { period: "1990–2005", title: "Foundational Steps" },
  { period: "2016", title: "Integrated Information System" },
  { period: "2022", title: "Amader PKSF Portal" },
  { period: "2023–24", title: "Full Digital Integration" },
  { period: "2025+", title: "Intelligent Era" },
];

/** Published direction for the Intelligent Era — not yet realised milestones. */
export const digitalDirection: string[] = [
  "Psychometric profiling",
  "Predictive analytics",
  "GIS-based monitoring",
  "AI-supported decision-making",
  "Paperless systems",
  "Cashless ecosystem",
  "Data intelligence",
];
