const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const Dotenv = require('dotenv-webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { DefinePlugin } = require('webpack');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const isProd = process.env.NODE_ENV === 'production';

// prod 에선 .env 안 씀
const envPlugin = isProd
  ? new DefinePlugin({
      'process.env.GIPHY_API_KEY': JSON.stringify(process.env.GIPHY_API_KEY)
    })
  : new Dotenv();

const analyzerPlugin = isProd ? false : new BundleAnalyzerPlugin();

console.log(process.env.NODE_ENV);
console.log('envPlugin:', envPlugin);
console.log('analyzerPlugin:', analyzerPlugin);

const DEV_URL = 'http://localhost:8080';
const PROD_URL = 'https://perf-mission.vercel.app';
const URL = isProd ? PROD_URL : DEV_URL;

module.exports = {
  entry: './src/index.tsx',
  resolve: { extensions: ['.ts', '.tsx', '.js', '.jsx'] },
  output: {
    filename: 'bundle.js',
    path: path.join(__dirname, '/dist'),
    clean: true
  },
  devServer: {
    hot: true,
    open: true,
    historyApiFallback: true,
    host: '0.0.0.0'
  },
  devtool: 'source-map',
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      custom: `<link rel="preload" as="image" href="${URL}/static/hero.jpg">`,
      template: './index.html'
    }),
    new HtmlWebpackPlugin({
      filename: 'search.html',
      template: './index.html'
    }),
    new CopyWebpackPlugin({
      patterns: [{ from: './public', to: './public' }]
    }),
    envPlugin,
    analyzerPlugin
  ].filter(Boolean),
  module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)$/i,
        exclude: /node_modules/,
        use: {
          loader: 'ts-loader'
        }
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif)$/i,
        loader: 'file-loader',
        options: {
          name: 'static/[name].[ext]'
        }
      }
    ]
  }
};
