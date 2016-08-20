//判断给定的字符串是否是回文
function isPalindrome(text){
    if(text.length <= 1){ return true;} 
    if(text.charAt(0) != text.charAt(text.length-1){return false;}
    return isPalindrome(text.substring(1, text.length - 1));
}   
