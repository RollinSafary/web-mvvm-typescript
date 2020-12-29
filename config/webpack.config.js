const path = require('path');
const merge = require('webpack-merge');
const webpack = require('webpack');
const packagejson = require('../package.json');
const TerserPlugin = require('terser-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const parts = require('./webpack.parts.config');

const paths = {
  base: path.resolve('src'),
  app: path.resolve('src/index.ts'),
  dist: path.resolve('www'),
  template: path.resolve('template/index.html'),
  tsConfigDev: path.resolve('tsconfig.dev.json'),
};

const commonConfig = merge([
  {
    target: 'web',
    context: paths.base,
    entry: paths.app,
    module: {
      rules: [
        {
          test: /\.css$/,
          use: ['style-loader', 'css-loader'],
        },
      ],
    },
    output: {
      filename: '[name].[hash].js',
      chunkFilename: '[name].[hash].js',
      publicPath: '',
      path: paths.dist,
    },
    resolve: {
      extensions: ['.js', '.ts'],
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: paths.template,
        title: packagejson.name,
        version: packagejson.version,
      }),
      new CaseSensitivePathsPlugin(),
      new CopyWebpackPlugin([
        {
          from: '../assets',
          to: 'assets',
        },
        {
          from: '../template/css',
          to: 'css',
        },
      ]),
    ],
  },

  parts.loadJs({}),
]);

const developmentConfig = merge([
  parts.sourceMaps('cheap-module-source-map'),

  parts.devServer({ host: process.env.HOST, port: process.env.PORT }),

  { plugins: [new webpack.NamedModulesPlugin()] },
]);

const productionConfig = merge([
  parts.sourceMaps('source-map'),

  parts.cleanup([paths.dist]),

  parts.envVar('production'),

  {
    performance: {
      maxEntrypointSize: 1200000,
      maxAssetSize: 1200000,
    },
    optimization: {
      minimizer: [
        new TerserPlugin({
          terserOptions: {
            keep_fnames: true,
            compress: {
              drop_console: true,
            },
            extractComments: 'all',
            output: {
              comments: false,
              beautify: false,
            },
          },
          parallel: true,
          exclude: [/file\.css$/],
        }),
      ],
      splitChunks: {
        chunks: 'async',
        minSize: 30000,
        minChunks: 1,
        maxAsyncRequests: 5,
        maxInitialRequests: 3,
        name: true,
        cacheGroups: {
          commons: {
            test: /[\\/]node_modules[\\/]/,
            name: 'game',
            chunks: 'all',
          },
        },
      },
    },
  },
]);

module.exports = (env, modeConfigs) => {
  //@env type is string, --env value in package.json script
  //@mode type is IWebpackMode, see end of file, generated based on --mode value in package.json script
  const envConfig = merge(
    commonConfig,
    env === 'production' ? productionConfig : developmentConfig,
  );
  const vars = parts.envVar(env, modeConfigs.mode);
  return merge(envConfig, vars);
};

// interface IWebpackMode {
//   cache: null,
//   bail: null,
//   profile: null,
//   color: { level: number, hasBasic: boolean, has256: number, has16m: boolean },
//   colors: { level: number, hasBasic: boolean, has256: number, has16m: boolean },
//   liveReload: boolean,
//   serveIndex: boolean,
//   inline: boolean,
//   info: boolean,
//   config: string, // path to config
//   env: string, // --env value in package json script
//   mode: string, // only development or production
//   host: string, // --host value in package json script
//   https: boolean, // --https existance in package json script
//   infoVerbosity: string,
//   clientLogLevel: string,
// }
