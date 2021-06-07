const path = require('path');
const webpack = require('webpack');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

const isDevelopment = process.env.NODE_ENV !== 'production';

const config = {
  mode: isDevelopment ? 'development' : 'production',

  entry: path.join(__dirname, 'src', 'index.jsx'),

  output: {
    path: path.join(__dirname, 'dist'),
    publicPath: '/',
    filename: '[name].[contenthash].js',
    chunkFilename: 'chunks/[contenthash].js',
    assetModuleFilename: 'assets/[contenthash:8][ext]',
    clean: true,
  },

  module: {
    rules: [
      {
        test: /\.m?js/,
        resolve: {
          fullySpecified: false,
        },
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.(png|jpg|jpeg|gif|svg)$/i,
        type: 'asset/resource',
      },
    ],
  },

  resolve: {
    alias: {
      assets: path.join(__dirname, 'src', 'assets'),
      components: path.join(__dirname, 'src', 'components'),
      lib: path.join(__dirname, 'src', 'lib'),
      hooks: path.join(__dirname, 'src', 'hooks'),
      services: path.join(__dirname, 'src', 'services'),
      store: path.join(__dirname, 'src', 'store'),
      style: path.join(__dirname, 'src', 'style'),
      utils: path.join(__dirname, 'src', 'utils'),
    },
    extensions: ['.js', '.jsx'],
    symlinks: false,
  },

  optimization: {
    runtimeChunk: 'single',
    moduleIds: 'deterministic',
    splitChunks: {
      cacheGroups: {
        vendor: {
          name: 'vendors',
          chunks: 'all',
          test: /[\\/]node_modules[\\/]/,
        },
      },
    },
  },

  plugins: [
    new HtmlWebpackPlugin({
      title: 'Tetris Overload',
    }),
    new CompressionPlugin(),
    new webpack.DefinePlugin({ __webpack_devmode__: isDevelopment }),
  ],
};

if (isDevelopment) {
  config.devServer = {
    contentBase: './dist',
    hot: true,
    clientLogLevel: 'silent',
    historyApiFallback: true,
    compress: true,
  };

  config.module.rules[1].use.options = {
    plugins: ['react-refresh/babel'],
  };

  config.plugins.push(new ReactRefreshWebpackPlugin());

  config.devtool = 'eval-source-map';

  config.target = 'web';
} else {
  config.target = 'browserslist';
}

module.exports = config;
