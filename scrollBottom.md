###判断页面是否滚动到页面底部
```javascript
if( document.compatMode == "CSS1Compat" && (document.documentElement.clientHeight + document.body.scrollTop == document.body.scrollTop)){
  console.log("滚动到底了");
}else if(document.documentElement.clientHeight + document.body.scrollTop == document.body.scrollTop){
  console.log("滚动到底了");
}
```
