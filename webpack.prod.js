const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const merge = require('webpack-merge');
const common = require('./webpack.common');
const ParallelUglifyPlugin = require('webpack-parallel-uglify-plugin');

let prodConfig = {
  entry: {
    appIndex:'./src/index.js',
    lodashAndAxios:['lodash','axios'],
  },
  mode: 'production',
  output: {
    filename: '[name].[hash].js',
    chunkFilename: '[name].chunk.js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: /\.(sc|c|sa)ss$/,
        use: [
          MiniCssExtractPlugin.loader, {
            loader: 'css-loader',
            options: {
              sourceMap: true
            }
          }, {
            loader: 'postcss-loader',
            options: {
              ident: 'postcss',
              sourceMap: true,
              plugins: (loader) => [require('autoprefixer')({browsers: ['> 0.15% in CN']})]
            }
          }, {
            loader: 'sass-loader',
            options: {
              sourceMap: true
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name][hash].css', // 设置最终输出的文件名
      chunkFilename: '[id][hash].css'
    }),
     // 使用 ParallelUglifyPlugin 并行压缩输出JS代码
     new ParallelUglifyPlugin({
      // 传递给 UglifyJS的参数如下：
      uglifyJS: {
        output: {
         //是否输出可读性较强的代码，即会保留空格和制表符，默认为输出，为了达到更好的压缩效果，可以设置为false
          beautify: false,
         //是否保留代码中的注释，默认为保留，为了达到更好的压缩效果，可以设置为false
          comments: false
        },
        compress: {
         //是否在UglifyJS删除没有用到的代码时输出警告信息，默认为输出，可以设置为false关闭这些作用不大的警告
          warnings: false,
          //是否删除代码中所有的console语句，默认为不删除，开启后，会删除所有的console语句
          drop_console: true,
        }
      }
    }),
  ],
  optimization: {
    minimizer: [
      new OptimizeCSSAssetsPlugin({}), // 压缩CSS插件
      // new UglifyJsPlugin({
      //   cache: true, parallel: true, sourceMap: true // set to true if you want JS source maps
      // })
    ],
    splitChunks: {
      cacheGroups: {
        commons: {
           chunks: 'initial',
           test: 'lodashAndAxios',
           enforce: true,
           name: 'lodashAndAxios',
        }
      }
    }
  }
};

module.exports = merge(common, prodConfig);