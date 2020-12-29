const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const firebase = {
  API_KEY: '',
  AUTH_DOMAIN: '',
  PROJECT_ID: '',
};

const symbolsMap = {
  a: 'Ku1',
  b: '2Lq',
  c: 'fEi',
  d: 'LB1',
  e: 'Ctx',
  f: 'kOq',
  g: 'UB9',
  h: 'oZF',
  i: 'hn3',
  j: 'Png',
  k: 'cpQ',
  l: '2XD',
  m: 'ukz',
  n: 'rgh',
  o: 'eZ3',
  p: 'FRl',
  q: '9YV',
  r: 'uZ8',
  s: 'dS0',
  t: 'A3M',
  u: 'i3S',
  v: 'OtL',
  w: 'D9K',
  x: 'goD',
  y: '6cf',
  z: 'fmb',
  A: 'QWH',
  B: 'QKu',
  C: 'AFf',
  D: 'wZE',
  E: '0OX',
  F: '6WD',
  G: '4Vn',
  H: 'PAB',
  I: 'dby',
  J: 'diU',
  K: 'XkO',
  L: 'SLb',
  M: 'sXP',
  N: '7uT',
  O: 'yxh',
  P: '8WK',
  Q: 'frU',
  R: 'peZ',
  S: 'Gcb',
  T: 'PSU',
  U: 'soM',
  V: 'nWM',
  W: 'Dah',
  X: 'TyE',
  Y: 'Jug',
  Z: 'FtR',
  '.': 'WpN',
  ',': 'GtC',
  _: 'irf',
  '-': 'VbC',
  '@': 'PWw',
  ' ': 'vdW',
  '"': 'q9O',
  ':': '55H',
  '{': 'qdS',
  '}': 'kh7',
  '[': '7xO',
  ']': 'rGu',
  1: 'Q4s',
  2: 'hMr',
  3: 'dsw',
  4: 'SDZ',
  5: 'a8V',
  6: 'nb5',
  7: '2HH',
  8: 'igi',
  9: 'g1T',
  0: 'WVT',
  '!': 'HKN',
  '#': 'scP',
  $: 'PRx',
  '%': 'N1t',
  '^': 'yym',
  '&': 'wwG',
  '*': 'GDF',
  '(': 'AiE',
  ')': 'eSm',
  '=': 'fDQ',
  '+': 'dcj',
  '`': 'vOA',
  '~': 'EOW',
  ';': '6Te',
  '|': 'zAZ',
  '?': 'Zwf',
  '/': 'Ux1',
  '\\': 'sTc',
};

exports.devServer = ({ host, port } = {}) => ({
  devServer: {
    stats: 'errors-only',
    host,
    port,
    overlay: {
      errors: true,
      warnings: true,
    },
  },
});

exports.cleanup = paths => ({
  plugins: [
    new CleanWebpackPlugin(paths, { root: process.cwd(), verbose: false }),
  ],
});

exports.loadJs = ({ options }) => ({
  module: {
    rules: [
      {
        test: /\.ts?$/,
        exclude: ['/node_modules/', '/lib/'],
        use: [
          {
            loader: 'ts-loader',
            options: options,
          },
        ],
      },

      {
        test: [/\.vert$/, /\.frag$/],
        use: 'raw-loader',
      },
    ],
  },
});

exports.sourceMaps = method => ({
  devtool: method,
});

exports.envVar = (env, mode) => ({
  plugins: [
    new webpack.DefinePlugin({
      env: JSON.stringify(env),
      mode: JSON.stringify(mode),
      CANVAS_RENDERER: JSON.stringify(true),
      WEBGL_RENDERER: JSON.stringify(true),
      FIREBASE_DB_CONFIG: JSON.stringify(firebase),
      symbolsMap: JSON.stringify(symbolsMap),
    }),
  ],
});

exports.injectVersion = version => ({
  plugins: [
    new webpack.DefinePlugin({
      __APP_VERSION__: JSON.stringify(version),
    }),
  ],
});
