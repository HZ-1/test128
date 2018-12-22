const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
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
    chunkFilename: '[name].[chunkhash].chunk.js',
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
              //根据中国使用浏览器情况统计，兼容使用率大于百分之0.15的所有浏览器
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
    // 更多关于开发和生产对HtmlWebpackPlugin的配置解释，请看README.md
    new HtmlWebpackPlugin({
      title: 'AICODER 全栈线下实习', // 默认值：Webpack App
      filename: 'indexMyApp.html', // 默认值： 'index.html'
      template: path.resolve(__dirname, 'src/tempHtml.html'),
      inject: false,//关闭插件默认在html中嵌入script或link css链接 // 如果在模板中自定义了script或link css标签，需要关闭默认嵌入
      minify: {
        collapseWhitespace: true,
        removeComments: true, // 是否移除注释
        removeAttributeQuotes: true // 移除属性的引号
      }
    }),
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

module.exports = merge(common, prodConfig);