/**
 * One published headline figure for a project.
 *
 * The number is carried as the string PKSF publishes, not as a `number`: the
 * separators, the decimal and the order of magnitude are part of the published
 * form, and re-deriving them from a numeric literal is how a figure quietly
 * changes. The digits roll; everything else is painted.
 *
 * `note` is not optional. A bare number set at display size will always be read
 * as a flat claim, and almost every figure PKSF publishes carries a
 * qualification — "over", "at least", "expected by", "as of". The note is where
 * that qualification is kept, next to the number rather than in a footnote.
 */
export type ProjectFigure = {
  /** What this number measures. Doubles as the label on the facet toggle. */
  facet: string;
  /** Painted before the digits — a currency mark, never a rounded value. */
  prefix?: string;
  /** The number exactly as published. Digits roll; separators do not. */
  value: string;
  /** Painted after the digits — a magnitude, a unit. */
  suffix?: string;
  /** The published wording in full, so the bare number cannot overstate it. */
  note: string;
};

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
  /**
   * The project's own page on pksf.org.bd. Only ever a URL that has been
   * opened and confirmed — a project with no page of its own has no link,
   * rather than a guessed one built from its slug.
   */
  href?: string;
  /**
   * One or two published headline figures. Two get a facet toggle; one is set
   * on its own. Never more than two: a third is a table, not a headline.
   */
  figures?: ProjectFigure[];
  /** Reserved for official PKSF imagery. Alt text is required with it. */
  image?: { src: string; alt: string; caption?: string; source: string };
};

/**
 * Current PKSF projects — time-bound and co-financed, as distinct from the
 * standing programmes in `data/programs.ts`.
 *
 * ── Order ─────────────────────────────────────────────────────────────────
 * The order is PKSF's own on pksf.org.bd/projects, which lists its ongoing
 * projects alphabetically by full title. It is kept rather than resequenced
 * for effect, so a reader who has seen the official listing recognises this
 * one. RMTP is the single entry not on that index: it has its own live
 * project page on pksf.org.bd describing ongoing work, so it is carried here
 * in the alphabetical slot the index's own rule would give it, between RHL
 * and the Safe Water Project. Dropping it would be a silent omission; moving
 * it to the end would be an editorial claim about its standing.
 *
 * ── Status ────────────────────────────────────────────────────────────────
 * Status is only ever what PKSF publishes. Where a stated duration has
 * elapsed but PKSF still lists the project as ongoing, the published listing
 * wins and the duration is shown as stated — the discrepancy is left visible
 * rather than resolved by guesswork.
 */
export const projects: Project[] = [
  {
    slug: "bd-rural-wash",
    name: "BD Rural WASH",
    fullName:
      "Bangladesh Rural Water, Sanitation & Hygiene for Human Capital Development Project",
    interventionSlug: "human-capacity",
    status: "ongoing",
    partners: [
      "Government of Bangladesh",
      "World Bank",
      "Asian Infrastructure Investment Bank",
      "Department of Public Health Engineering",
      "PKSF",
    ],
    targetGroup:
      "Rural populations in selected areas of Bangladesh without access to safely managed water supply and sanitation services",
    summary:
      "Improving access to safely managed water supply and sanitation in selected areas of rural Bangladesh, and strengthening institutional capacity for water and sanitation services. Implemented jointly with the Department of Public Health Engineering.",
    source: "PKSF — BD Rural WASH for HCD Project",
    href: "https://pksf.org.bd/projects/bd-rural-wash-for-hcd-project/",
    figures: [
      {
        facet: "Toilets",
        value: "1,000,000",
        note: "safely managed twin-pit toilets planned at household level, toward SDG Target 6.2",
      },
      {
        facet: "Upazilas",
        value: "182",
        note: "across 30 districts, under all eight divisions",
      },
    ],
  },
  {
    slug: "ecccp-drought",
    name: "ECCCP-Drought",
    fullName: "Extended Community Climate Change Project–Drought",
    interventionSlug: "climate-action",
    status: "ongoing",
    duration: "Through 2027",
    partners: ["PKSF", "18 Implementing Entities"],
    targetGroup:
      "Vulnerable rural communities in drought-prone areas — approximately 215,000 people expected to benefit by project completion",
    summary:
      "Strengthening the resilience of drought-affected communities by enhancing groundwater recharge, improving surface water availability and promoting adaptive agricultural practices — seeking to reduce irrigation water needs by up to 70% during the winter.",
    source: "PKSF — ECCCP-Drought",
    href: "https://pksf.org.bd/extended-community-climate-change-project-drought-ecccp-drought/",
    figures: [
      {
        facet: "People",
        value: "215,000",
        note: "approximately, expected to benefit by project completion",
      },
      {
        facet: "Partners",
        value: "18",
        note: "Implementing Entities delivering the project with PKSF",
      },
    ],
  },
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
    href: "https://pksf.org.bd/growth-for-climate-resilient-and-environmental-entrepreneurship-and-nutrition-green-project/",
    figures: [
      {
        facet: "Families",
        value: "258,000",
        note: "over 258,000 climate-vulnerable families, as published",
      },
      {
        facet: "Financing",
        prefix: "$",
        value: "211.7",
        suffix: "m",
        note: "USD 211.7 million, of which USD 70 million from IFAD",
      },
    ],
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
    href: "https://pksf.org.bd/microenterprise-financing-and-credit-enhancement-mfce-project/",
    figures: [
      {
        facet: "Borrowers",
        value: "100,000",
        note: "at least 100,000 new microenterprise borrowers, at least 80% of them women",
      },
      {
        facet: "Financing",
        prefix: "$",
        value: "200",
        suffix: "m",
        note: "USD 200 million loan, with USD 1 million in technical assistance",
      },
    ],
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
    href: "https://pksf.org.bd/pathways-to-prosperity-for-extremely-poor-people-european-union-ppepp-eu-project/",
    figures: [
      {
        facet: "People",
        value: "860,000",
        note: "approximately, in 215,000 extremely poor households",
      },
      {
        facet: "Districts",
        value: "12",
        note: "northern, southern, haor and ethnic minority regions",
      },
    ],
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
    href: "https://pksf.org.bd/projects/recovery-and-advancement-of-informal-sector-employment-raise/",
    figures: [
      {
        facet: "Beneficiaries",
        value: "400,000",
        note: "over 400,000 direct beneficiaries expected by December 2030",
      },
      {
        facet: "Financing",
        prefix: "$",
        value: "530.65",
        suffix: "m",
        note: "USD 530.65 million over the full period",
      },
    ],
  },
  {
    slug: "rhl",
    name: "RHL",
    fullName:
      "Resilient Homestead and Livelihood Support to the Vulnerable Coastal People of Bangladesh",
    interventionSlug: "building-resilience",
    status: "ongoing",
    duration: "Funding agreement signed 16 July 2023; effective 17 August 2023",
    partners: ["Green Climate Fund", "PKSF"],
    targetGroup:
      "Climate-vulnerable coastal communities in seven districts — Khulna, Bagerhat, Satkhira, Barguna, Patuakhali, Bhola and Cox's Bazar, across 20 upazilas",
    summary:
      "Developing a climate-adaptive coastal community by adopting climate-resilient housing and livelihood technologies, financed through PKSF's Direct Access Entity status with the Green Climate Fund.",
    source: "PKSF — RHL Project",
    href: "https://pksf.org.bd/resilient-homestead-and-livelihood-support-to-the-vulnerable-coastal-people-of-bangladesh-rhl-project/",
    figures: [
      {
        facet: "Participants",
        value: "300,000",
        note: "over 300,000 project participants targeted, in 3,200 Climate Change Adaptation Groups",
      },
      {
        facet: "Districts",
        value: "7",
        note: "Khulna, Bagerhat, Satkhira, Barguna, Patuakhali, Bhola and Cox's Bazar — 20 upazilas",
      },
    ],
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
    source: "PKSF — RMTP; not listed on the current Projects index",
    href: "https://pksf.org.bd/rural-microenterprise-transformation-project-rmtp/",
    figures: [
      {
        facet: "Districts",
        value: "47",
        note: "value-chain work extended across 47 districts, as published",
      },
    ],
  },
  {
    slug: "swp",
    name: "SWP",
    fullName:
      "Access to Safe Drinking Water for the Climate Vulnerable People in Coastal Areas of Bangladesh through Solar-generated Reverse Osmosis Water Treatment Facilities",
    interventionSlug: "climate-action",
    status: "ongoing",
    partners: [
      "Adaptation Fund",
      "PKSF",
      "CODEC",
      "DSK",
      "ESDO",
      "Heed Bangladesh",
      "NGF",
      "SUS",
      "Unnayan Prochesta",
    ],
    targetGroup:
      "180,000 people in coastal areas, with priority to women, youth, extremely poor households, female-headed families and marginalised groups dependent on natural resources",
    budget: "USD 5 million",
    summary:
      "Year-round access to safe and affordable drinking water in the salinity-affected coast: 180 reverse-osmosis desalination plants and three knowledge hubs across six upazilas of Khulna, Bagerhat and Satkhira, about a fifth of them solar-powered.",
    source: "PKSF — Safe Water Project (SWP)",
    href: "https://pksf.org.bd/safe-water-project-swp/",
    figures: [
      {
        facet: "People",
        value: "180,000",
        note: "in three coastal districts — Khulna, Bagerhat and Satkhira",
      },
      {
        facet: "Plants",
        value: "180",
        note: "reverse-osmosis desalination plants and three knowledge hubs; about 20% solar-powered",
      },
    ],
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
    href: "https://pksf.org.bd/skills-for-industry-competitiveness-and-innovation-program-sicip/",
    figures: [
      {
        facet: "Youth",
        value: "20,500",
        note: "12,000 from disadvantaged and low-income communities, 8,500 from marginalised groups; at least 30% women",
      },
      {
        facet: "Trades",
        value: "13",
        note: "high-demand trades, targeting at least 65% job placement among certified trainees",
      },
    ],
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
      "Resource-Efficient and Cleaner Production in the microenterprise sector — climate-resilient technology, environmental compliance, and a green microcredit ecosystem.",
    source: "PKSF — SMART",
    href: "https://pksf.org.bd/sustainable-microenterprise-and-resilient-transformation-smart/",
    figures: [
      {
        facet: "Upazilas",
        value: "237",
        note: "in 54 districts, as of May 2026",
      },
    ],
  },
];
