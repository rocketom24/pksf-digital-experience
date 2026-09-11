export type DigitalEra = {
  period: string;
  title: string;
  description?: string;
};

/**
 * PKSF's published digital transformation timeline, verbatim from the
 * official Digital Transformation page. Do not add milestones.
 */
export const digitalTimeline: DigitalEra[] = [
  {
    period: "1990–2005",
    title: "Foundational Steps",
    description: "Early automation, digitising core organisational processes.",
  },
  {
    period: "2016",
    title: "Integrated Information System",
    description: "A unified data platform, replacing separate registers with one record.",
  },
  {
    period: "2022",
    title: "Amader PKSF Portal",
    description: "Paperless HR and administration.",
  },
  {
    period: "2023–24",
    title: "Full Digital Integration",
    description:
      "All Partner Organisations report digitally by API, so the network can be seen in real time.",
  },
  {
    period: "2025+",
    title: "The Intelligent Era",
    description:
      "Stated direction: psychometric profiling, predictive analytics, GIS-based monitoring and AI-supported decision-making.",
  },
];

/** Two figures PKSF publishes against the transformation. */
export const digitalMetrics = [
  {
    value: "100%",
    label: "Digital reporting",
    note: "Real-time data from every Partner Organisation.",
    asOf: "2023–24",
  },
  {
    value: "85%",
    label: "Fewer manual reporting workdays",
    note: "Reduction reported against the pre-integration baseline.",
    asOf: "2023–24",
  },
];

/**
 * The stated end state: capabilities first, then the three-stage vision.
 * `DigitalDirection` reads the last three as the vision stages, so the order
 * of this array is load-bearing.
 */
export const digitalDirection: string[] = [
  "Psychometric profiling",
  "Predictive analytics",
  "GIS-based monitoring",
  "AI-supported decision-making",
  "Digital financial services",
  "Paperless",
  "Cashless",
  "Data-Intelligent",
];

/** The horizon PKSF attaches to that end state. */
export const digitalHorizon = {
  year: "2030",
  statement:
    "To become a fully Paperless, Cashless, and Data-Intelligent organization",
  source: "PKSF — Digital Transformation",
};
