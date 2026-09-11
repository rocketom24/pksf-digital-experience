export type Program = {
  slug: string;
  name: string;
  interventionSlug: string;
  summary: string;
};

// TODO: populate with verified, officially-sourced PKSF programs.
// Do not invent program names, scopes or dates.
export const programs: Program[] = [];
