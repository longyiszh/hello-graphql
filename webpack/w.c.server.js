const { resolve, join } = require('path');
const { readdirSync } = require('fs');

const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const nodeExternals = require('webpack-node-externals');

const { root } = require('../lib/helpers');
const serverpath = root('src/server');

let config = {
  mode:"production",

  entry: {
    'hello-graphql': resolve(serverpath, 'hello-graphql')
  },

  resolve: {
    extensions: ['.ts', '.js']
  },

  target: 'node',

  node: {
    __dirname: false,
    __filename: false
  },

  externals: nodeExternals(),

  devtool: 'source-map',

  module: {
    rules: [
      {
        test: /\.ts$/,
        use: [

          {
            loader: 'ts-loader',
            options: {
              configFile: resolve(serverpath, 'tsconfig.server.json')
            }
          }

        ],
        exclude:  /node_modules/
      },
      {
        test: /\.graphql|\.gql$/,
        use: [
          {
            loader: 'raw-loader'
          }
        ]
      }

    ]
  },

  plugins: [
    new CleanWebpackPlugin([`${root("dist/server")}/**`], {root: root("dist"), verbose: false}),
    new CopyWebpackPlugin([
      { 
        from: resolve(serverpath, "config"),
        to: 'config',
        ignore: [
          ".gitkeep"
        ]
      },
      { 
        from: resolve(serverpath, "static"),
        to: 'static',
        ignore: [
          ".gitkeep"
        ]
      }
    ]),

  ],

  output: {
    path: root('dist/server'),
    publicPath: '/',
    filename: '[name].js',
    chunkFilename: '[id].[hash].chunk.js'
  }


}

module.exports = config;
