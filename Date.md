###Date.parse, Date.toISOString
ES5里规定 Date.parse 要能解析Date.toISOString出来的字符串。IE6里面不能解析  
* new Date("2015-01-09") IE6不能正常解析
* new Date("2015/01/09") new Date("2015/1/9") 都能解析

