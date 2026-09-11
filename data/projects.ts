export type Project = {
  slug: string;
  /** The acronym PKSF uses. */
  name: string;
  /** The official full title. */
  fullName: string;
  interventionSlug: string;
  /** As published. Never inferred from the dates. */
  status: "ongoing" | "completed";
  /** Stated duration, where PKSF publishes one. */
  duration?: string;
  /** Financing and implementing partners, as officially stated. */
  partners?: string[];
  /** Who the project is for, where officially stated. */
  targetGroup?: string;
  /** Total budget or financing, where officially stated. */
  budget?: string;
  summary: string;
  source: string;
  /** Reserved for official PKSF imagery. Alt text is required with it. */
  image?: { src: string; alt: string; caption?: string; source: string };
};

/**
 * Current PKSF projects — time-bound and co-financed, as distinct from the
 * standing programmes in `data/programs.ts`.
 *
 * Status is only ever what PKSF publishes. Where a stated duration has
 * elapsed but PKSF still lists the project as ongoing, the published listing
 * wins and the duration is shown as stated — the discrepancy is left visible
 * rather than resolved by guesswork.
 */
export const projects: Project[] = [
  {
    slug: "green",
    name: "GREEN",
    fullName:
      "Growth for Climate Resilient and Environmental Entrepreneurship and Nutrition",
    interventionSlug: "climate-action",
    status: "ongoing",
    duration: "2026–2031",
    partners: ["IFAD", "PKSF", "Partner Organisations"],
    targetGroup:
      "Over 258,000 climate-vulnerable families in the haor, coastal, Barind and char regions — including women, youth, small ethnic communities and microentrepreneurs",
    budget: "USD 211.7 million, of which USD 70 million from IFAD",
    summary:
      "Climate-resilient and inclusive rural transformation: digital financing, agroecological farming, agriculture-based microenterprise, local agro-processing, safe and nutritious food systems, solar power and a circular economy.",
    source: "PKSF — GREEN Project announcement, 30 July 2026",
  },
  {
    slug: "raise",
    name: "RAISE",
    fullName: "Recovery and Advancement of Informal Sector Employment",
    interventionSlug: "human-capacity",
    status: "ongoing",
    duration: "2022–2030",
    partners: ["World Bank", "Government of Bangladesh", "PKSF", "Partner Organisations"],
    targetGroup:
      "Unemployed youth aged 15–35 from low-income households, young and climate-vulnerable microentrepreneurs, and master craftspersons — over 400,000 direct beneficiaries expected by December 2030",
    budget: "USD 530.65 million over the full period",
    summary:
      "Earning opportunities for low-income urban and rural youth, through skills training, entrepreneurship support, inclusive finance and employment linkage. Running through 89 Partner Organisations.",
    source: "PKSF — RAISE",
  },
  {
    slug: "mfce",
    name: "MFCE",
    fullName: "Microenterprise Financing and Credit Enhancement Project",
    interventionSlug: "microenterprise-development",
    status: "ongoing",
    duration: "16 May 2023 – 30 June 2028",
    partners: ["Asian Development Bank", "PKSF"],
    targetGroup:
      "At least 100,000 new microenterprise borrowers, at least 80% of them women; 60,000 women borrowers also receive entrepreneurship training",
    budget: "USD 200 million loan and USD 1 million technical assistance",
    summary:
      "Addresses the financing constraint on microenterprise growth through 118 Partner Organisations, weighted toward poverty-stricken and climate-vulnerable areas.",
    source: "PKSF — MFCE Project",
  },
  {
    slug: "smart",
    name: "SMART",
    fullName: "Sustainable Microenterprise and Resilient Transformation",
    interventionSlug: "microenterprise-development",
    status: "ongoing",
    partners: ["PKSF", "Partner Organisations"],
    targetGroup:
      "Microenterprises in agribusiness, manufacturing and services, with particular outreach to women-owned enterprises in climate-vulnerable regions",
    summary:
      "Resource-Efficient and Cleaner Production in the microenterprise sector — climate-resilient technology, environmental compliance, and a green microcredit ecosystem. Implemented across 237 upazilas in 54 districts as of May 2026.",
    source: "PKSF — SMART",
  },
  {
    slug: "rmtp",
    name: "RMTP",
    fullName: "Rural Microenterprise Transformation Project",
    interventionSlug: "agricultural-development",
    status: "ongoing",
    partners: ["IFAD", "DANIDA", "PKSF"],
    targetGroup:
      "Small and marginal farmers, entrepreneurs and other market actors in the value chains of selected high-value agricultural products",
    summary:
      "Value-chain development across livestock, crops and horticulture, and fisheries and aquaculture — efficient production, international food-safety compliance, and stronger market connection.",
    source: "PKSF — RMTP",
  },
  {
    slug: "sicip",
    name: "SICIP",
    fullName: "Skills for Industry Competitiveness and Innovation Program",
    interventionSlug: "human-capacity",
    status: "ongoing",
    duration: "2025–2028",
    partners: ["Government of Bangladesh", "Asian Development Bank", "PKSF"],
    targetGroup:
      "20,500 youth — 12,000 from disadvantaged and low-income communities and 8,500 from marginalised groups including ethnic minorities, persons with disabilities and third-gender people; at least 30% women",
    summary:
      "Competency-based technical training across 13 high-demand trades, targeting at least 65% job placement among certified trainees, with counselling, employer engagement and entrepreneurship finance behind it.",
    source: "PKSF — SICIP",
  },
  {
    slug: "ppepp-eu",
    name: "PPEPP-EU",
    fullName: "Pathways to Prosperity for Extremely Poor People – European Union",
    interventionSlug: "extreme-poverty",
    status: "ongoing",
    duration: "October 2022 – September 2025 as published",
    partners: ["European Union", "PKSF"],
    targetGroup:
      "Approximately 860,000 extremely poor people in 215,000 households across 12 districts — northern, southern, haor and ethnic minority regions",
    summary:
      "Enterprise development, nutrition, healthcare, inclusive finance, disability support, women's empowerment and community mobilisation, delivered together rather than separately.",
    source: "PKSF — PPEPP-EU Project",
  },
  {
    slug: "rhl",
    name: "RHL",
    fullName: "Resilient Homestead and Livelihood Support",
    interventionSlug: "building-resilience",
    status: "ongoing",
    partners: ["Green Climate Fund", "PKSF"],
    targetGroup: "Climate-vulnerable coastal communities",
    summary:
      "Climate-adaptive homesteads and livelihoods on the coast, financed through PKSF's Direct Access Entity status with the Green Climate Fund.",
    source: "PKSF — Ongoing Projects",
  },
];
