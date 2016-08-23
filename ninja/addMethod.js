/**
 * 为object 重载 name的函数
 * object Object 
 * name   String  方法名
 * fn     Function 函数
**/
function addMehtod(object, name, fn){
    //保存原来的函数
    var old = object[name];
    object[name] = function(){
        //函数形参的数量等于实参的数量，就调用该函数
        if(fn.length == arguments.length){
            return fn.apply(this, arguments);
            //如果传入参数不匹配调用原来的方法
        }else if(typeof old === "function"){
            return old.apply(this, arguments);
        }
    }
}

