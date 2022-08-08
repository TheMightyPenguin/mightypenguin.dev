/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-var-requires */

const images = require('remark-images');
const emoji = require('remark-emoji');

// @ts-nocheck
const withMDX = require('@next/mdx')({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [images, emoji],
    rehypePlugins: [],
    providerImportSource: '@mdx-js/react',
  },
});
const withPlugins = require('next-compose-plugins');

const { createVanillaExtractPlugin } = require('@vanilla-extract/next-plugin');
const withVanillaExtract = createVanillaExtractPlugin();

const withTM = require('next-transpile-modules')(['@dessert-box/react']);

/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'md', 'mdx'],
  async rewrites() {
    return [
      {
        source: '/cv',
        destination: '/Victor_Tortolero_CV.pdf',
      },
    ];
  },
};

module.exports = withPlugins([withVanillaExtract, withMDX, withTM], nextConfig);
