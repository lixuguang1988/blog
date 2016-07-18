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


