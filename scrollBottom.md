###判断页面是否滚动到页面底部
```javascript
if( document.compatMode == "CSS1Compat" && (document.documentElement.clientHeight + (window.pageYOffset ? window.pageYOffset  : document.documentElement.scrollTop) == document.body.scrollHeight)){
  console.log("CSS1Compat,滚动到底了");
}else if(document.body.clientHeight + document.body.scrollTop == document.body.scrollHeight){
  console.log("滚动到底了");
}
```
#####标准模式下 
chrome46.0.2490.86/safari5.1.7/opera33.0.1990.115    
document.documentElement.scrollTop：0   
document.body.scrollTop 516   
   
   
firefox43/IE7~11   
document.documentElement.scrollTop ：330    
document.body.scrollTop ：0

```javascript
//$(window).on("scroll", function(){
//    if( /*这里面加知否正在加载的判断, 有没有新数据了*/){
//        return false;
//    }
//    if($(document).scrollTop() + $(window).height() >= $(document).height()){
//        /*LoadMore();*/
//    }
//});
```