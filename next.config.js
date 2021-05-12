/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-var-requires */

// @ts-nocheck
const withMdxEnhanced = require('next-mdx-enhanced');
const withPlugins = require('next-compose-plugins');

const { VanillaExtractPlugin } = require('@vanilla-extract/webpack-plugin');
const {
  getGlobalCssLoader,
} = require('next/dist/build/webpack/config/blocks/css/loaders');
const {
  default: MiniCssExtractPlugin,
} = require('next/dist/build/webpack/plugins/mini-css-extract-plugin/src');

const withTM = require('next-transpile-modules')(['dessert-box']);
const images = require('remark-images');
const emoji = require('remark-emoji');

const nextConfig = {
  future: {},

  webpack(config, options) {
    const { dev, isServer } = options;

    config.module.rules.push({
      test: /\.css$/i,
      sideEffects: true,
      use: dev
        ? getGlobalCssLoader(
            {
              assetPrefix: options.config.assetPrefix,
              future: {},
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
        destination: '/Victor_Tortolero_CV.pdf',
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
    withTM,
  ],
  nextConfig,
);
