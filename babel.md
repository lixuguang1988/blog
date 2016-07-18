# babel jsx的用法
1 安装 babel babel-preset-react     
npm install --save babal-cli  
npm install --save babel-preset-react  
2 配置.babelrc  
```javascript
{
  "presets" : ["react"]
}
```
3 terminal里面执行命令   
babel src -d lib //把src目录里面的jsx文件转换到lib里面的普通js文件

# babel 常见的参数
* -d 转换目录 babel src -d lib
* -w 监听  babel src -d  lib -w
* -i 忽略  babel src -d lib -i a.js,b.js
* -o 转换文件 babel src/h.js -o lib/h.js
* -o 转换目录为单个文件 babel src -o lib/base.js 


