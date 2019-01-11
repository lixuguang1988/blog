function strlen(str){  
    var len = 0;  
    for (var i=0; i<str.length; i++) {   
     var c = str.charCodeAt(i);   
    //单字节加1   
     if ((c >= 0x0001 && c <= 0x007e) || (0xff60<=c && c<=0xff9f)) {   
       len++;   
     }   
     else {   
      len+=2;   
     }   
    }   
    return len;  
} 


function isChinese(temp){
    var re=/[^\u4e00-\u9fa5]/;
    if (re.test(temp)) return false ;
    return true ;
}

//用16位表示的字符上线为16进制FFFF，所有超过这个上限的码位一定有两个编码单位表示
function is32Bit(c){
  return c.codePointAt(0) > 0xFFFF
}
is32Bit("𠮷") // true
is32Bit("啊") // false
is32Bit("a") // false
