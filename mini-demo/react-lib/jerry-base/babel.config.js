const path = require('path');
const pkg = require('./package.json');

module.exports = {
  presets: [
    ['@babel/preset-env', { targets: { node: 'current' } }],
    '@babel/preset-typescript',
  ],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src'],
        alias: {
          '@/(.+)': './src/\\1',
          [pkg.name]: path.resolve(__dirname, './src'),
        },
      },
    ],
  ],
};
