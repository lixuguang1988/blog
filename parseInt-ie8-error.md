##parseInt("09"), parseFloat("09"), Number("09")的返回值
###chrome, IE9+, firefox, opera, safari返回
9, 9, 9
###ie8/ie6/ie7返回
0, 9, 9

```javascript
console.log(parseInt("09"));  
console.log(parseFloat("09"));  
console.log(Number("09"));  
```

IE8(ES3)会把parseInt("09")当成8进制来解析. parseInt("0xf")当成16进制来解析
ES5中直接parseInt不指定第二个参数是按照10进制来解析的   
避免上面的问题，指定parseInt的第二个参数
```javascript
console.log(parseInt("09", 10));  
console.log(parseFloat("09"));  
console.log(Number("09"));  
```
