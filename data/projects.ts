export type Project = {
  slug: string;
  name: string;
  interventionSlug: string;
  location?: string;
  summary: string;
  coverImage?: string;
};

// TODO: populate with verified, officially-sourced PKSF projects.
// Do not invent project names, locations or outcomes.
export const projects: Project[] = [];
