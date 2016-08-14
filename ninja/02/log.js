function log(){
    try{
        console.log.apply(console, arguments);
    }catch(e){
        try{
            opera.postError.apply(opera, arguments); // 尝试使用opera的postError方法
        }catch(e){
            alert(Array.prototype.join.call(arguments, " "));
        }
    }
}
