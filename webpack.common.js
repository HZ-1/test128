const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  resolve: {
    alias: { // 配置别名
      '@': path.resolve(__dirname, 'src/')
    },
    extensions: [".js", ".vue", ".json"] // 默认值: [".js",".json"]  模块名字可以省略的后缀名
  },
  externals: {  // 把一个模块做成外部依赖，不会打包到 js文件中。
    jquery: 'jQuery',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/, // 加快编译速度，不包含node_modules文件夹内容
        use: {
          loader: 'babel-loader',
          options: {
            cacheDirectory: true
          }
        }
      }, {
        test: /\.(png|svg|jpg|gif|jpeg)$/,
        include: [path.resolve(__dirname, 'src/')],
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10000,
              name: 'image/[name]_image.[ext]'//name既可以定义文件名字，也可以定义css生成路径，占位符[ext]是扩展externals的简写指图片扩展名
            }
          }, {
            loader: 'image-webpack-loader',
            options: {
              mozjpeg: {// 压缩 jpeg 的配置
                progressive: true,
                quality: 65
              },
              optipng: {// 使用 imagemin-optipng 压缩 png，enable: false 为关闭
                enabled: false
              },
              pngquant: {// 使用 imagemin-pngquant 压缩 png
                quality: '65-90',
                speed: 4
              },
              gifsicle: {// 压缩 gif 的配置
                interlaced: false
              },
              webp: {// 开启 webp，会把 jpg 和 png 图片压缩为 webp 格式
                quality: 75
              }
            }
          }
        ]
      },
      // 原本生产和开发模式的css处理模式都不一样，不应该在公共配置中写loader处理，但这里为了展示webpack-merge如何自定义合并配置，
      // 在这里写了多余的两个css 处理loader
      // 在开发模式下有对这部分代码的删除过滤，在开发模式下，有对这个代码的自定义合并
      {
        test: /\.scss$/,
        use: [
          'style-loader', 
           'css-loader', 
           'sass-loader'
        ]
      },
      // 如上，多余的loader
      {
        test: /\.css$/,
        loader: ['style-loader', 'css-loader']
      },
      
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'AICODER 全栈线下实习', // 默认值：Webpack App
      filename: 'index.html', // 默认值： 'index.html'
      template: path.resolve(__dirname, 'src/tempHtml.html'),
      minify: {
        collapseWhitespace: true,
        removeComments: true, // 是否移除注释
        removeAttributeQuotes: true // 移除属性的引号
      }
    }),
    new CleanWebpackPlugin(['dist'])
  ]
}