#
   
##[手机软键盘遮挡输入框](./scrollIntoView.md)
```html
<input type="text" value="" id="content" name="content">
```
```javascript
document.querySelector("#content").addEventListener("focus", function(){
       var that = this;
       //等待软键盘弹出
       setTimeout(function(){
           that.scrollIntoView();
       }, 200);                   
}, false);
```
   
   
## [git bash(terminal)配置无密码提交/同步](./gitbashnopassphrase.md)
git bash(terminal) 上pull/push的时候每次提交都会显示 Enter passphrase for key '/c/Users/xxx/.ssh/id_rsa':  

## [parseInt("09")ie8(包括以前)返回0](./parseInt-ie8-error.md)
parseInt("09"), parseFloat("09"), Number("09")  
IE8的返回值 0, 9, 9

## [上面div层的touch事件 影响下面div层的click事件](移动端触发touch事件同时触发click事件的相关解决方法)

## window.innerWidth, window.innerHeight 得到屏幕的可用宽度和高度的问题(iOS)
在页面底部加如下代码
```javascript
alert(window.innerWidth + ":::" + window.innerHeight);
```
得到宽度和告诉是document的
```javascript
window.onload = function(){
   alert(window.innerWidth + ":::" + window.innerHeight);
}
//or
$(document).ready(function(){
   alert(window.innerWidth + ":::" + window.innerHeight);
});
```


