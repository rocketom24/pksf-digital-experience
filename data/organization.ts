export type Organization = {
  fullName: string;
  shortName: string;
  founded: number;
  mandate: string;
  /** TODO: verify precise legal/governance structure from an official PKSF source. */
  legalStatus: string;
  /** TODO: verify current headquarters address from an official PKSF source. */
  headquarters: string;
};

export const organization: Organization = {
  fullName: "Palli Karma-Sahayak Foundation",
  shortName: "PKSF",
  founded: 1989,
  mandate:
    "PKSF is an apex development organisation in Bangladesh that channels funds, capacity building and policy support to a nationwide network of Partner Organisations (POs), which in turn deliver microfinance, microenterprise and social development services directly to rural and low-income communities.",
  legalStatus: "TODO: verify",
  headquarters: "TODO: verify",
};
