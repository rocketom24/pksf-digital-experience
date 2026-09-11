export type JourneyMilestone = {
  year: number;
  title: string;
  description?: string;
};

/**
 * Historical timeline. Only verified milestones get a hard year.
 * Do not fabricate dates — add a TODO entry instead and verify against
 * an official PKSF source before publishing.
 */
export const journey: JourneyMilestone[] = [
  {
    year: 1989,
    title: "PKSF established",
  },
  // TODO: verify year — expansion of the Partner Organisation (PO) network.
  // TODO: verify year — introduction of microenterprise and SME-focused financing.
  // TODO: verify year — launch of major disaster/climate resilience programming.
  // TODO: verify year — governance/legal structure milestones.
];
