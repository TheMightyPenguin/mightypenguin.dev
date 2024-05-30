import { createMdxtsPlugin } from 'mdxts/next';
import { createVanillaExtractPlugin } from '@vanilla-extract/next-plugin';

const withVanillaExtract = createVanillaExtractPlugin();

const withMdxts = createMdxtsPlugin({
  theme: 'github-dark',
  gitSource: 'https://github.com/TheMightyPenguin/mightypenguin.dev',
});

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

export const configWithPlugins = withMdxts(withVanillaExtract(nextConfig));

export default configWithPlugins;
