const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const merge = require('webpack-merge');
const common = require('./webpack.common');

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
    })
  ],
  optimization: {
    minimizer: [
      new OptimizeCSSAssetsPlugin({}), // 压缩CSS插件
      new UglifyJsPlugin({
        cache: true, parallel: true, sourceMap: true // set to true if you want JS source maps
      })
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
// 去掉common.js中的对scss与css的loader处理
common.module.rules = common.module.rules.filter(function(item){
  return !(item.test && ((item.test.source === '\\.scss$') || (item.test.source === '\\.css$')))
})

module.exports = merge(common, prodConfig);