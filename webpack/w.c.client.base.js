const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const { AngularCompilerPlugin } = require('@ngtools/webpack');
const { root } = require('../lib/helpers');
require('babel-polyfill');

const globalscss = [
  root('src/client/styles.scss')
];

let config = {
  entry: {
    'polyfills': root('src/client/polyfills.ts'),
    'vendor': root('src/client/vendor.ts'),
    'app': [
      'babel-polyfill',
      root('src/client/main.ts')
    ]
  },

  resolve: {
    extensions: ['.ts', '.js']
  },

  module: {
    rules: [
      {
        test: /(?:\.ngfactory\.js|\.ngstyle\.js|\.ts)$/,
        use: [
          {
            loader: '@ngtools/webpack',
            options: {
              sourceMap: true
            }
          }
        ]
      },
      {
        test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)$/,
        use: 'file-loader?name=assets/[name].[hash].[ext]'
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader',
            options: {
              minimize: false // workaround for ng2
            }
          }
        ]
      },
      {
        /* Scoped scss */
        test: /\.scss$/,
        include: root('src/client/app'),
        use: ['raw-loader', 'postcss-loader', 'sass-loader']
      },
      {
        /* Global scss */
        test: /\.scss$/,
        include: globalscss,
        use: ExtractTextPlugin.extract(
          {
            fallback: 'style-loader',
            use: ['css-loader?sourceMap', 'postcss-loader', "sass-loader"]
          }
        )
      },
      {
        test: /\.(graphql|gql)$/,
        exclude: /node_modules/,
        use: 'graphql-tag/loader'
      }
    ]
  },

  devServer: {
    historyApiFallback: true,
    stats: 'minimal',
    port: 4199,
    overlay: {
      errors: true,
      warnings: false
    }
  },

  optimization: {
    runtimeChunk: true,
    splitChunks: {
      name: true,
      cacheGroups: {
        app: {
          name: "app"
        },
        vendor: {
          name: "vendor"
        },
        polyfills: {
          name: "polyfills"
        },
      }
    }
  },

  plugins: [

    // Workaround for angular/angular#11580
    new webpack.ContextReplacementPlugin(
      // The (\\|\/) piece accounts for path separators in *nix and Windows
      /angular(\\|\/)core(\\|\/)@angular/,
      root('src/client'), 
      {} // a map of your routes
    ),

    new AngularCompilerPlugin({
      tsConfigPath: root('src/client/tsconfig.client.json'),
      entryModule: root('src/client/app/app.module#AppModule')
    }),

    new HtmlWebpackPlugin({
      template: root('src/client/index.html')
    }),

    new ExtractTextPlugin('styles.[hash].css')
  ]

  
};

module.exports = config;
