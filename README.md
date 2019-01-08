npm start 时，如果打开页面出错，解决方式：
- 在浏览器上将域名改为127.0.0.1
- 服务器默认使用index.html，如果你自定义输出文件名，在浏览器上手写自定义文件名

AutoDllPlugin (autodll-webpack-plugin)
- 该插件可以提高rebuild速度，所以此插件在开发模式用得多，一般生产可不配置此插件，当然你也可以在生产配置起来，可以百度生成时如何用。
该插件能够快速打包，能把第三方依赖的文件能提前进行预编译打包到一个文件里面去。提高了构建速度。因为很多第三方插件我们并不需要改动它，所以我们想这些第三方库在我们每次编译的时候不要再次构建它就好,可以非常明显提高rebuild速度
- 要求必须要有html-webpack-plugin，且给此插件配置inject: true,
- autodll-webpack-plugin 自身也要设置 inject:true,
- 可以将AutoDllPlugin.entry可以看做是webpack.config.js的entry，配置了AutoDllPlugin.entry自然就形成了chunk，所以AutoDllPlugin实质之一是一次代码分离的行为。
- AutoDllPlugin.inherit是调试依赖库(如react-redux)源码的尖刀利器
      inherit设置为true，是调试源码的尖刀利器，可以调试webpack没有压缩过的依赖库源码sourcemap调试，不过会影响rebuild速度；
      当为false时，速度更快，一般设置为false，只有在需要调试库源码时，才打开

happypack
webpack 只能一个loader处理完后处理下一个loader，这样，速度就慢，为了同时进行多线程loader，同时处理多个loader，可以使用happypack；
配置happypack可以明显提高构建速度。
- 其他的都好配置，就postcss-loader 比较特殊，必须要另外新建 postcss.config.js 否则报错；
- happypack 重写原来loader配置时，基本上就是复制，不改变，只有postcss可能稍微改动下

webpack-parallel-uglify-plugin
```
module.exports = {
  plugins: [
    // 使用 ParallelUglifyPlugin 并行压缩输出JS代码
    new ParallelUglifyPlugin({
      // 传递给 UglifyJS的参数如下：
      uglifyJS: {
        output: {
          /*
           是否输出可读性较强的代码，即会保留空格和制表符，默认为输出，为了达到更好的压缩效果，
           可以设置为false
          */
          beautify: false,
          /*
           是否保留代码中的注释，默认为保留，为了达到更好的压缩效果，可以设置为false
          */
          comments: false
        },
        compress: {
          /*
           是否在UglifyJS删除没有用到的代码时输出警告信息，默认为输出，可以设置为false关闭这些作用
           不大的警告
          */
          warnings: false,

          /*
           是否删除代码中所有的console语句，默认为不删除，开启后，会删除所有的console语句
          */
          drop_console: true,

          /*
           是否内嵌虽然已经定义了，但是只用到一次的变量，比如将 var x = 1; y = x, 转换成 y = 5, 默认为不
           转换，为了达到更好的压缩效果，可以设置为false
          */
          collapse_vars: true,

          /*
           是否提取出现了多次但是没有定义成变量去引用的静态值，比如将 x = 'xxx'; y = 'xxx'  转换成
           var a = 'xxxx'; x = a; y = a; 默认为不转换，为了达到更好的压缩效果，可以设置为false
          */
          reduce_vars: true
        }
      }
    }),
  ]
}

```