/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-var-requires */
import addMdx from '@next/mdx';
import { createVanillaExtractPlugin } from '@vanilla-extract/next-plugin';
import withPlugins from 'next-compose-plugins';
import emoji from 'remark-emoji';
import images from 'remark-images';

const withVanillaExtract = createVanillaExtractPlugin();

/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  reactStrictMode: true,
  pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'md', 'mdx'],
  transpilePackages: ['@dessert-box/react'],
  experimental: {
    mdxRs: true,
  },
  async rewrites() {
    return [
      {
        source: '/cv',
        destination: '/Victor_Tortolero_CV.pdf',
      },
    ];
  },
};

addMdx(nextConfig, {
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [images, emoji],
    rehypePlugins: [],
    providerImportSource: '@mdx-js/react',
  },
});

export default withPlugins([withVanillaExtract], nextConfig);
