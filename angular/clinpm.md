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
