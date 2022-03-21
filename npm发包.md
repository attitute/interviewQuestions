1. 支持commonJS
  设置 output。libaryTarget='commonjs2'

2. es5编译
    使用babel-loader把ES6代码转换成ES5的代码

3. npm包体积
    Babel把es6转换成es5时会注入一些辅助函数，最终导致每个输出文件中都包含这段辅助函数，修改.babelrc文件添加transform-runtime插件

4. 发布模块不能将依赖模块一起打包
    externals配置项告诉webpack哪些模块不需要打包

5. ui组件类的模块需打包其他资源文件 例如.css等
    通过css-loader和extract-text-webpack-plugin
```javascript

    const ExtractTextPlugin = require('extract-text-webpack-plugin')

    module.exports = {
        module: {
            rules: {
                {
                    text: /\.css/,
                    use: ExtractTextPlugin.extract({
                        use: ['css-loader']
                    })
                }
            }
        },
        plugins: [
            new ExtractTextPlugin({
                filename: 'index.css'
            })
        ]
    }
```
3、有哪些常见的Loader？他们是解决什么问题的？

（1）babel-loader：把es6转成es5；

（2）css-loader：加载css，支持模块化，压缩，文件导入等特性；

（3）style-loader：把css代码注入到js中，通过dom操作去加载css；

（4）eslint-loader：通过Eslint检查js代码；

（5）image-loader：加载并且压缩图片晚间；

（6）file-loader：文件输出到一个文件夹中，在代码中通过相对url去引用输出的文件；

（7）url-loader：和file-loader类似，文件很小的时候可以base64方式吧文件内容注入到代码中。

（8）source-map-loader：加载额外的source map文件，方便调试。

 

4、有哪些常见的Plugin？他们是解决什么问题的？

（1）uglifyjs-webpack-plugin：通过UglifyJS去压缩js代码；

（2）commons-chunk-plugin：提取公共代码；

（3）define-plugin：定义环境变量。

 

5、loader和plugin的不同

作用不同：（1）loader让webpack有加载和解析非js的能力；（2）plugin可以扩展webpack功能，在webpack运行周期中会广播很多事件，Plugin可以监听一些事件，通过webpack的api改变结果。

用法不同：（1）loader在module.rule中配置。类型为数组，每一项都是Object；（2）plugin是单独配置的，类型为数组，每一项都是plugin实例，参数通过构造函数传入。

7、是否写过Loader和Plugin？描述一下编写loader或plugin的思路？

编写Loader时要遵循单一原则，每个Loader只做一种"转义"工作。 每个Loader的拿到的是源文件内容（source），可以通过返回值的方式将处理后的内容输出，也可以调用this.callback()方法，将内容返回给webpack。 还可以通过 this.async()生成一个callback函数，再用这个callback将处理后的内容输出出去。

Plugin的编写就灵活了许多。 webpack在运行的生命周期中会广播出许多事件，Plugin 可以监听这些事件，在合适的时机通过 Webpack 提供的 API 改变输出结果。