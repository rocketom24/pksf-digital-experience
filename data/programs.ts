export type Program = {
  slug: string;
  /** As published on the PKSF Programs page. */
  name: string;
  /** Expansion, where PKSF publishes one. */
  fullName?: string;
  interventionSlug: string;
  summary: string;
  source: string;
};

/**
 * PKSF's own programmes — the standing instruments, as distinct from the
 * time-bound, co-financed projects in `data/projects.ts`.
 *
 * This is the published list from the PKSF Programs page. Names, expansions
 * and scopes are as published; the summaries are shortened, not rewritten.
 */
const SOURCE = "PKSF — Programs";

export const programs: Program[] = [
  {
    slug: "jagoron",
    name: "JAGORON",
    interventionSlug: "inclusive-finance",
    summary:
      "Household-based enterprise development through credit, for rural and urban populations. The general-purpose instrument the rest are read against.",
    source: SOURCE,
  },
  {
    slug: "buniad",
    name: "BUNIAD",
    interventionSlug: "extreme-poverty",
    summary:
      "Microcredit for the extremely poor, addressing social and institutional exclusion as well as the shortage of capital.",
    source: SOURCE,
  },
  {
    slug: "agrosor",
    name: "AGROSOR",
    interventionSlug: "microenterprise-development",
    summary:
      "Enterprise development for members whose businesses have outgrown ordinary microcredit — investment up to BDT 15 lakh.",
    source: SOURCE,
  },
  {
    slug: "sufolon",
    name: "SUFOLON",
    interventionSlug: "agricultural-development",
    summary:
      "Agricultural microcredit across crop cultivation, livestock, fisheries and agro-processing.",
    source: SOURCE,
  },
  {
    slug: "enrich",
    name: "ENRICH",
    fullName: "Enhancing Resources and Increasing Capacities of Poor Households",
    interventionSlug: "extreme-poverty",
    summary:
      "PKSF's flagship human-centred programme, running since 2010 against multidimensional poverty rather than income poverty alone.",
    source: SOURCE,
  },
  {
    slug: "abason",
    name: "ABASON",
    interventionSlug: "inclusive-finance",
    summary:
      "Housing finance for adequate, safe and affordable homes in urban and rural areas.",
    source: SOURCE,
  },
  {
    slug: "agriculture-unit",
    name: "Agriculture Unit",
    interventionSlug: "agricultural-development",
    summary:
      "Extends farming technologies and builds value-chain interventions across crops, fisheries and livestock.",
    source: SOURCE,
  },
  {
    slug: "environment-and-climate-change-unit",
    name: "Environment and Climate Change Unit",
    interventionSlug: "climate-action",
    summary:
      "Environmental assessment, adaptation and mitigation protocols, and the technical side of PKSF's climate work.",
    source: SOURCE,
  },
  {
    slug: "risk-mitigation",
    name: "Risk Mitigation",
    interventionSlug: "building-resilience",
    summary:
      "Reduces livestock morbidity and mortality risk, and introduces agricultural mechanisation services.",
    source: SOURCE,
  },
  {
    slug: "lift",
    name: "LIFT",
    fullName: "Learning and Innovation Fund to Test New Ideas",
    interventionSlug: "knowledge-communication-advocacy",
    summary:
      "Tests new financial and non-financial services across farm and off-farm activity before they become programmes.",
    source: SOURCE,
  },
  {
    slug: "preventive-healthcare",
    name: "Preventive Healthcare",
    interventionSlug: "human-capacity",
    summary:
      "Preventive health services covering approximately 680,000 members.",
    source: SOURCE,
  },
  {
    slug: "program-for-adolescents",
    name: "Program for Adolescents",
    interventionSlug: "human-capacity",
    summary:
      "Youth development through awareness, leadership training, nutrition and cultural activity.",
    source: SOURCE,
  },
];
