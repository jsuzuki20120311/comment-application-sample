const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const TerserPlugin = require("terser-webpack-plugin");


const config = {
  mode: process.env.NODE_ENV,
  // ソースマップ出力設定
  devtool: process.env.NODE_ENV === 'production' ? false : 'source-map',
  entry: {
    'javascripts/index': './src/javascripts/index.js',
    'stylesheets/index': './src/stylesheets/index.css',
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: './[name].js'
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.mjs$/,
        resolve: {
          fullySpecified: false
        }
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          {
            loader: 'css-loader',
            options: {
              import: true,
              modules: "global"
            },
          }
        ],
      }
    ]
  },

  // webpackのプラグインを設定
  plugins: [
    new CopyWebpackPlugin({
      patterns: [
        {
          from: './src/index.html',
          to: 'index.html'
        }
      ]
    }),
    new MiniCssExtractPlugin({
      filename: './[name].css',
      ignoreOrder: true
    })
  ],

  optimization: {
    minimize: process.env.NODE_ENV === 'production',
    minimizer: [
      new TerserPlugin(),
      new CssMinimizerPlugin()
    ],
    splitChunks: {
      cacheGroups: {
        vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: 'javascripts/vendor',
            chunks: 'all'
        }
      }
    }
  },
  resolve: {
    extensions: ['.js', '.css']
  },
};

module.exports = config;
