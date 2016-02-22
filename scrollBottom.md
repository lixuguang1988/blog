###判断页面是否滚动到页面底部
```javascript
if( document.compatMode == "CSS1Compat" && (document.documentElement.clientHeight + (window.pageYOffset ? window.pageYOffset  : document.documentElement.scrollTop) == document.body.scrollHeight)){
  console.log("CSS1Compat,滚动到底了");
}else if(document.body.clientHeight + document.body.scrollTop == document.body.scrollHeight){
  console.log("滚动到底了");
}
```
标准模式下 
chrome46.0.2490.86  document.documentElement.scrollTop：0 document.body.scrollTop 516   
firefox43/IE7~11  document.documentElement.scrollTop ：330  document.body.scrollTop ：0
