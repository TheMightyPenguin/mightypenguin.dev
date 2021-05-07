/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-var-requires */

// @ts-nocheck
const withMdxEnhanced = require('next-mdx-enhanced');
const withPlugins = require('next-compose-plugins');
const withTreat = require('next-treat')();

const { VanillaExtractPlugin } = require('@vanilla-extract/webpack-plugin');
const {
  getGlobalCssLoader,
} = require('next/dist/build/webpack/config/blocks/css/loaders');
const {
  default: MiniCssExtractPlugin,
} = require('next/dist/build/webpack/plugins/mini-css-extract-plugin/src');

const images = require('remark-images');
const emoji = require('remark-emoji');

const nextConfig = {
  future: {
    webpack5: true,
  },

  webpack(config, options) {
    const { dev, isServer } = options;

    config.module.rules.push({
      test: /\.css$/i,
      sideEffects: true,
      use: dev
        ? getGlobalCssLoader(
            {
              assetPrefix: options.config.assetPrefix,
              future: {
                webpack5: true,
              },
              isClient: !isServer,
              isServer,
              isDevelopment: dev,
            },
            [],
            [],
          )
        : [MiniCssExtractPlugin.loader, 'css-loader'],
    });

    const plugins = [];

    plugins.push(new VanillaExtractPlugin());

    if (!dev) {
      plugins.push(
        new MiniCssExtractPlugin({
          filename: 'static/css/[contenthash].css',
          chunkFilename: 'static/css/[contenthash].css',
          ignoreOrder: true,
        }),
      );
    }

    config.plugins.push(...plugins);

    return config;
  },

  async rewrites() {
    return [
      {
        source: '/cv',
        destination: '/victor-tortolero_cv.pdf',
      },
    ];
  },
};

module.exports = withPlugins(
  [
    withMdxEnhanced({
      layoutPath: 'src/layouts',
      fileExtensions: ['mdx'],
      remarkPlugins: [images, emoji],
      rehypePlugins: [],
      usesSrc: false,
      reExportDataFetching: false,
    }),
    withTreat,
  ],
  nextConfig,
);
