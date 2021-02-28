/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-var-requires */

// @ts-nocheck
const withMdxEnhanced = require('next-mdx-enhanced');
const withPlugins = require('next-compose-plugins');
const withTreat = require('next-treat')();

const images = require('remark-images');
const emoji = require('remark-emoji');

module.exports = withPlugins([
  withMdxEnhanced({
    layoutPath: 'src/layouts',
    fileExtensions: ['mdx'],
    remarkPlugins: [images, emoji],
    rehypePlugins: [],
    usesSrc: false,
    reExportDataFetching: false,
  }),
  withTreat,
]);
