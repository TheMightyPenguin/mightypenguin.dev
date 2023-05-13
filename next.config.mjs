// import addMdx from '@next/mdx';
import { createVanillaExtractPlugin } from '@vanilla-extract/next-plugin';
import { withContentlayer } from 'next-contentlayer';
// import emoji from 'remark-emoji';
// import images from 'remark-images';

const withVanillaExtract = createVanillaExtractPlugin();

/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'md', 'mdx'],
  transpilePackages: ['@dessert-box/react'],
  experimental: {
    appDir: true,
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

// addMdx(nextConfig, {
//   extension: /\.mdx?$/,
//   options: {
//     remarkPlugins: [images, emoji],
//     rehypePlugins: [],
//     providerImportSource: '@mdx-js/react',
//   },
// });

export default withVanillaExtract(nextConfig);
