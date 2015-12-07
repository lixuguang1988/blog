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
//这里面也说明一个问题循环中 var x = [];每次都会返回不同的数组(实例)对象，以后重置数组要用 x.length = 0;
```
     
正则表达式的特殊字符   
<code>^ $ . * + ? = ! : | \ / ( ) [ ] { }</code>   
直接量字符   
<code>\o \t \v \f \r \n \xnn \uxxxx \cX </code>   
    
    
字符类  
将直接量字符单独放到中括号里就组成了的字符类，一个字符类可以匹配它所包含的任意字符   
a-b中的连字符表示范围
```javascript
var regAbc = /[abc]/;  //匹配字符'a', 'b', 'c'中的任意一个
var regNotAbc = /[^abc]/; //匹配除字符'a', 'b', 'c'以外的所有的字符
var regW = /[a-zA-Z0-9]/;匹配a到z, A到Z， 0到9的字符
```
特殊的字符类  
*[...]  匹配...中的任意一个
*[^...] 匹配除...以外的所有字符
*.      匹配任意一个除换行符和Unicode行终止符以外的所有字符
*\w     匹配任意的ASCII字符组成的单词  等同于[a-zA-Z0-9]
*\W     匹配非ASCII字符组成的单词      等同于[^a-zA-Z0-9]
*\s     匹配任意的Unicode空白符    
*\S     匹配任意的非Unicode空白符
*\d     匹配ASCII数字                 等同于[0-9]
*\D     匹配非ASCII数字               等同于[^0-9]
*[\b]   匹配退格符\b(特例)                 不放在字符类里表示边界


