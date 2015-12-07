##正则表达式
ES3和ES5中对于正则表达式直接量返回的对象定义不一致问题:   
ES3对同一段正则表达式返回同一正则表达式对象，ES5每个正则表达式都会返回不同的实例对象(IE6~8按ES5的规范实现，firefox4,chrome)
```javascript
function reReg(){
	var reg = /RegExp/;
	reg.foo = "foo";
	return reg;
}
var reg = reReg();
var reg2 = reReg();
//ES3里面reg和reg2是同一个对象 ES5里面是不同的对象
//当前的现代浏览器基本都实现了ES5的规范
```
     
正则表达式的特殊字符
^ $ . * + ? = ! : | \ / ( ) [ ] { }



