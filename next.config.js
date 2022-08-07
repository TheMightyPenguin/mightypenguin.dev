/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-var-requires */

// @ts-nocheck
const withMdxEnhanced = require('next-mdx-enhanced');
const withPlugins = require('next-compose-plugins');

const { createVanillaExtractPlugin } = require('@vanilla-extract/next-plugin');
const withVanillaExtract = createVanillaExtractPlugin();

const withTM = require('next-transpile-modules')(['@dessert-box/react']);
const images = require('remark-images');
const emoji = require('remark-emoji');

const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/cv',
        destination: '/Victor_Tortolero_CV.pdf',
      },
    ];
  },
};

module.exports = withPlugins(
  [
    withVanillaExtract,
    withMdxEnhanced({
      layoutPath: 'src/layouts',
      fileExtensions: ['mdx'],
      remarkPlugins: [images, emoji],
      rehypePlugins: [],
      usesSrc: false,
      reExportDataFetching: false,
    }),
    withTM,
  ],
  nextConfig,
);
