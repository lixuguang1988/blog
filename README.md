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

## 上面div层的touch事件 影响下面div层的click事件
在touch事件上调用event.preventDefault()/return false;阻止事件级联

## window.innerWidth, window.innerHeight 得到屏幕的可用宽度和高度的问题(iOS)
在页面底部直接加如下代码, (得到宽度和告诉是document的!!!)
```javascript
alert(window.innerWidth + ":::" + window.innerHeight);
```
   
```javascript
window.onload = function(){
   alert(window.innerWidth + ":::" + window.innerHeight);
}
//or
$(document).ready(function(){
   alert(window.innerWidth + ":::" + window.innerHeight);
});
```

## [iOS里面对竖拍的图片展示位竖的，Android里面展示位横的](./EXIF.md)
iOS里面自动旋转图片，图片的长度和宽度没有一块更新。
   
[java](https://github.com/drewnoakes/metadata-extractor)后台读取图片exif的信息,后台调整图片的方向.   
```html
[Exif] Orientation - Top, left side (Horizontal / normal) 
[Exif] Orientation - Right, top side (Rotate 90 cw) 
```
Orientation Rotate只保存默认的旋转，也就是用户自己保存旋转的是正常的（也就是Top, left side (Horizontal / normal)）。
   
   
## [如何解决failed to push some refs to git](http://jingyan.baidu.com/article/f3e34a12a25bc8f5ea65354a.html?st=2&net_type=&bd_page_type=1&os=0&rst=&word=chegji@gmail.com)
 ```javascript
 //先执行
 git  pull --rebase origin master
 //在执行push
 git push -u origin master
```


## [window中cmd中支持git命令](./cmdEnablegit.md)
1.安装git
2.设置git的环境变量

##[点击textareaIE6/7，textarea会往下面移](./textareablankspace.md)
删除textarea前后的空白

##UC浏览器对rem支持问题
UC的rem二次渲染不行,rem根据html字体大小来计算的，页面加载完成后更改html的字体大小，UC上不起作用。如果要更改html基准字体大小要在head里面就更改，不能到页面加载后更改.

##WebStorm file watcher

##CSS after/before里面用unicode
```css
.close:after{
   content: "\00D7";
}
```
\ + [unicode编码](http://unicode-table.com/cn/)

##iScroll里button的click事件触发两次
```javascript
//单个题目回答情况统计
//.btn 改成div就没问题
$("#hwSubjectsStats").on("click", ".btn", function(e){
    console.log("hwSubjectStats");
    var id = $(this).data("id");
    $("#hwSubjectStats").show().siblings().hide();

    //mainScroll.refresh();
    //控制url
    history.pushState({type: "hwSubjectStats", id: id }, "", "?type=hwSubjectStats&id=" + id);
});
```
解决方法[IScroll5+在ios、android点击（click）事件不兼容解决方法](http://www.52html5.com/?p=2618)
```javascript
function initMain() {
   if(!$("#main").length){return false;}
   mainScroll = new IScroll('#main', { mouseWheel: true , click: iScrollClick(), probeType: 3});
}
function iScrollClick(){
   if (/iPhone|iPad|iPod|Macintosh/i.test(navigator.userAgent)) return false;
   if (/Chrome/i.test(navigator.userAgent)) return (/Android/i.test(navigator.userAgent));
   if (/Silk/i.test(navigator.userAgent)) return false;
   if (/Android/i.test(navigator.userAgent)) {
       var s=navigator.userAgent.substr(navigator.userAgent.indexOf('Android')+8,3);
       return parseFloat(s[0]+s[3]) < 44 ? false : true
   }
}
```

#iScroll 里面:active无效
```css
.index-i-item > div:active{
    transform: scale(.98);
    -webkit-transform: scale(.98);
}
```
iScroll的配置参数preventDefaultException
```javascript
var myScroll = new IScroll('.page-on-center', {
      mouseWheel: true,
      click: true,
      preventDefaultException : { tagName: /^(INPUT|TEXTAREA|BUTTON|SELECT|DIV)$/ }  
});
```

##bootstrap的modal的显示的时候，新弹出窗口中input[type=file]ie8无法选择文件
```javascript
//#editAffiche 为modal的ID
 $('#editAffiche, #addAffiche').on('shown.bs.modal', function() {
     $(document).off('focusin.modal');
 });
```



