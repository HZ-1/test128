npm start 时，如果打开页面出错，解决方式：
- 在浏览器上将域名改为127.0.0.1
- 服务器默认使用index.html，如果你自定义输出文件名，在浏览器上手写自定义文件名

AutoDllPlugin (autodll-webpack-plugin)
- 该插件可以提高rebuild速度
- 要求必须要有html-webpack-plugin，且给此插件配置inject: true,
- autodll-webpack-plugin 自身也要设置 inject:true,
- 可以将AutoDllPlugin.entry可以看做是webpack.config.js的entry，配置了AutoDllPlugin.entry自然就形成了chunk，所以AutoDllPlugin实质之一是一次代码分离的行为。
- 设置AutoDllPlugin.inherit:true，可以调试库源码？

