import { defineDocumentType, makeSource } from '@contentlayer/source-files';

export const Post = defineDocumentType(() => ({
  name: 'Post',
  filePathPattern: `posts/**/*.mdx`,
  contentType: 'mdx',
  fields: {
    title: { type: 'string', required: true },
    summary: { type: 'string', required: true },
    state: { type: 'string', required: true },
    publishedAt: { type: 'date', required: true },
  },
  computedFields: {
    url: {
      type: 'string',
      resolve: (post) => `/posts/${post._raw.flattenedPath}`,
    },
  },
}));

export const Learning = defineDocumentType(() => ({
  name: 'Learning',
  filePathPattern: `til/**/*.mdx`,
  contentType: 'mdx',
  fields: {
    title: { type: 'string', required: true },
    summary: { type: 'string', required: true },
    state: { type: 'string', required: true },
    publishedAt: { type: 'date', required: true },
  },
  computedFields: {
    url: {
      type: 'string',
      resolve: (post) => `/til/${post._raw.flattenedPath}`,
    },
  },
}));

export default makeSource({
  contentDirPath: 'src/content/',
  documentTypes: [Post, Learning],
});
