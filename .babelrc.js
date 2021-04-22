const isDevelopment = process.env.NODE_ENV !== 'production';

const presets = [
  [
    '@babel/preset-env',
    {
      useBuiltIns: 'usage',
      corejs: '3.10',
    }
  ],
  '@babel/preset-react'
];

const plugins = [
  [
    'babel-plugin-styled-components',
    {
      ssr: false,
      displayName: isDevelopment,
      minify: !isDevelopment,
      transpileTemplateLiterals: !isDevelopment
    }
  ]
];

module.exports = { presets, plugins };
