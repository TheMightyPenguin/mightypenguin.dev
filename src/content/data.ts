import { createSource } from 'mdxts';

// title: { type: 'string', required: true },
// summary: { type: 'string', required: true },
// state: { type: 'string', required: true },
// publishedAt: { type: 'date', required: true },

type FrontMatter = {
  title: string;
  state: 'published' | 'draft';
  publishedAt: Date;
  summary?: string;
};

export const allPosts = createSource('posts/*.mdx', {
  baseDirectory: 'posts',
  sort: (a, b) =>
    a.frontMatter.publishedAt.getTime() - b.frontMatter.publishedAt.getTime(),
});

export const allLearnings = createSource('til/*.mdx', {
  baseDirectory: 'til',
  sort: (a, b) =>
    a.frontMatter.publishedAt.getTime() - b.frontMatter.publishedAt.getTime(),
});
