npm start 时，如果打开页面出错，解决方式：
1.在浏览器上将域名改为127.0.0.1，
2.服务器默认使用index.html，如果你自定义输出文件名，在浏览器上手写自定义文件名
因此npm start启动，请浏览器输入 http://127.0.0.1:58080/indexMyApp.html

为了在生产模式下，用ejs自定义入口html文件，有以下几个注意：
1、new HtmlWebpackPlugin(),应该在webpack.prod.js与webpack.dev.js上各写一套，而不能在webpack.common.js上写一套new HtmlWebpackPlugin()，然后在webpack.prod.js与webpack.dev.js上各写一套覆盖。
这样是不行的，允许开发模式下的 npm start，这会导致在服务器上生成两个html，而不是覆盖。
2、只有生成模式下，才能使用htmlWebpackPlugin.files.chunks.appIndex.entry这一系列对象，因为这些js都是生成模式才生效的插件生成的，开发模式下无效，没有对应js，因此会报错。