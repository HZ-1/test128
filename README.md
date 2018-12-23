npm start 时，如果打开页面出错，解决方式：
- 在浏览器上将域名改为127.0.0.1
- 服务器默认使用index.html，如果你自定义输出文件名，在浏览器上手写自定义文件名

在做自定义合并 webpack-merge时，遇到的问题和体会：
- const mgx = /\.css$/; mgx是一个Object，通过mgx.source去取值，但取出来的值判断是否相等时，一定要加转义符号；
例如 
mgx.source === '\\.css$' //true (加转义符号)
mgx.source === '\.css$' //false

- const merge = require('webpack-merge'); 
单纯使用merge的合并，一般都是两个对象的叠加，相当于push

- 自定义merge合并很好用。

- 有时候配置明明是正确的，npm start还是会出错，这是因为有缓存的缘故，只有重启电脑才能解决

- nodejs的js可以解析es6语法，可以解析例如reduce,map等等es6的方法。(刚开始报错疑问无法解析)
