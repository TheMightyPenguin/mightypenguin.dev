const { createVanillaExtractPlugin } = require('@vanilla-extract/next-plugin');
const { withContentlayer } = require('next-contentlayer');

const withVanillaExtract = createVanillaExtractPlugin();

/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
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

module.exports = withContentlayer(withVanillaExtract(nextConfig));
