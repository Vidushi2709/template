export type Post = {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  content: string;
};

export const posts: Post[] = [
  {
    slug: "hello-sugarangel",
    title: "hello, sugarangel!",
    date: "2025-07-23",
    excerpt: "why i built this pastel nook on the web ✿",
    content:
      "welcome to my pastel nook! i wanted a cozy place to play with ui, pixels, and cute borders. expect tiny widgets and diary-like posts.",
  },
  {
    slug: "design-notes-01",
    title: "design notes 01: borders & bows",
    date: "2025-06-05",
    excerpt: "thoughts on dotted borders and rounded capsules",
    content:
      "dotted borders + soft shadows add dimension. i love mixing cream backgrounds with pink accents to keep contrast comfy yet readable.",
  },
];
