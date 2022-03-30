## webpackHMR原理
1. webpack的watch会监听文件的变化，watch监听到文件变化后，根据配置文件对模块重新编译打包，打包后的代码保存在内存中

2. webpack和webpack-dev-serve的中间件webpack-dev-middleware之间的交互，webpack-dev-middleware调用webpack暴露的API对代码变化进行监控，并且告诉webpack将代码打包到内存中

3. webpack-dev-serve对文件变化进行监控，当我们配置了devServer.watchContentBase: true,Serve会监听这些配置文件中静态文件的变化，变化后会通知浏览器对应用进行live reload，浏览器刷新（不是HRM）

4. 通过webapack-dev-server的依赖sockjs在浏览器端与服务端之间建立一个webScoket长连接，将webpack 编译打包的各个阶段的状态信息告知浏览器，Server监听静态文件变化，浏览器根据socket信息进行不同的操作。当服务端传递的主要信息还是新模块的hash值，后面步骤根据hash值进行热模块替换

5. webpack-dev-server/client端并不能发请求也不会热更新操作，webpack/hot/client根据webpack-dev-server/client传输的数据与dev-server的配置决定刷新浏览器还是进行热模块更新

6. webpack/hot/client将hash值传送给HoteModuleReplacement.runtime,通过JsonpMainTemplate.runtime向server端发送Ajax请求， 服务端返回一个json，该json包含了所有要更新的模块的hash值，获取到更新列表，通过Jsonp请求获取最新模块的代码

7. HotModulePlugin将会对新旧模块进行对比，决定是否更新模块，在决定更新模块后检查模块间的依赖关系，更新模块的同时更新模块间的依赖引用

8. 如果HMR失败，回退到live reload操作浏览器刷新获取最新打包代码



## webpack的构建流程是什么?从读取配置到输出文件这个过程尽量说全

Webpack 的运行流程是一个串行的过程，从启动到结束会依次执行以下流程：

（1）初始化参数：从配置文件和 Shell 语句中读取与合并参数，得出最终的参数；

（2）开始编译：用上一步得到的参数初始化 Compiler 对象，加载所有配置的插件，执行对象的 run 方法开始执行编译；

（3）确定入口：根据配置中的 entry 找出所有的入口文件；

（4）编译模块：从入口文件出发，调用所有配置的 Loader 对模块进行翻译，再找出该模块依赖的模块，再递归本步骤直到所有入口依赖的文件都经过了本步骤的处理；

（5）完成模块编译：在经过第4步使用 Loader 翻译完所有模块后，得到了每个模块被翻译后的最终内容以及它们之间的依赖关系；

（6）输出资源：根据入口和模块之间的依赖关系，组装成一个个包含多个模块的 Chunk，再把每个 Chunk 转换成一个单独的文件加入到输出列表，这步是可以修改输出内容的最后机会；

（7）输出完成：在确定好输出内容后，根据配置确定输出的路径和文件名，把文件内容写入到文件系统。

在以上过程中，Webpack 会在特定的时间点广播出特定的事件，插件在监听到感兴趣的事件后会执行特定的逻辑，并且插件可以调用 Webpack 提供的 API 改变 Webpack 的运行结果。