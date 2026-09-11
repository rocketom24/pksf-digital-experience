export type NewsItem = {
  slug: string;
  title: string;
  date: string;
  summary: string;
};

// TODO: populate with verified, officially-sourced PKSF news items.
export const news: NewsItem[] = [];
