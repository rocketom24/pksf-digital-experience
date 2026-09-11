export type JourneyMilestone = {
  year: number;
  title: string;
  description?: string;
  source: string;
};

/**
 * Institutional milestones with a verified year attached.
 *
 * Only entries PKSF dates itself. The digital milestones live in
 * `data/digital.ts` and are not repeated here.
 */
export const journey: JourneyMilestone[] = [
  {
    year: 1989,
    title: "PKSF established",
    description:
      "Formally came into being on 13 November 1989, after the President of Bangladesh approved the proposal.",
    source: "PKSF — About Us",
  },
  {
    year: 2001,
    title: "Microenterprise programme launched",
    description:
      "Financing for members whose activities had outgrown ordinary microcredit.",
    source: "PKSF — Microenterprise",
  },
  {
    year: 2010,
    title: "ENRICH begins",
    description:
      "The flagship human-centred programme against multidimensional poverty.",
    source: "PKSF — Programs",
  },
  {
    year: 2025,
    title: "Strategic Plan 2025–2030 adopted",
    description: "‘Financing Inclusive Growth’ — three strategic objectives to 2030.",
    source: "PKSF Strategic Plan 2025–2030",
  },
];
