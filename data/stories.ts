export type Story = {
  slug: string;
  name: string;
  location?: string;
  interventionSlug: string;
  summary: string;
  image?: string;
};

// TODO: populate with real, consented human stories from verified sources.
// Never invent names or narratives.
export const stories: Story[] = [];
