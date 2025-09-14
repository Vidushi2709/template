export type Post = {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  content: string;
  type?: 'local' | 'medium';
  externalLink?: string;
};

export const posts: Post[] = [
  // Local posts removed - now using Medium integration
];
