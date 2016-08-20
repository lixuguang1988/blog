/**
 * 为object 重载 name的函数
 * object Object 
 * name   String  方法名
 * fn     Function 函数
**/
functon addMehtod(object, name, fn){
    var old = object[name];
    object[name] = function(){
        if(fn.length == arguments.length){
            return fn.apply(this, arguments)
        }else if(typeof old === "function"){
            return old.apply(this, arguments);
        }
    }
}
