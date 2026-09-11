export type Publication = {
  slug: string;
  title: string;
  year: number;
  type: string;
  url?: string;
};

// TODO: populate with verified, officially-sourced PKSF publications.
export const publications: Publication[] = [];
