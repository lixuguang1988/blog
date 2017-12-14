# 更换 angular cli 包安装工具
```js
ng set --global packageManager  cnpm
```
用cnpm会有问题又改回来
```js
ng set --global packageManager = npm
//提示 Invalid value can only be one of these: npm,cnpm,yarn,default

ng set --global packageManager npm
```
# npm安装ng-zorro-antd 0.5.x的版本(基于angular4(.2.4))
```js
npm install ng-zorro-antd@0.5.x --save
```
