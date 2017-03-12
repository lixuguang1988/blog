export function getJSON(url, error, callback){
    var xhr = new XMLHttpRequest();

    url += url.indexOf("?") === -1 ? url + "?" : "&";
    url += "_=" + Math.random() ;

    //打开连接
    xhr.open("GET", url, true);
    
    //设置相应类型json
    xhr.responseType = "json";

    //onload的事件
    xhr.onload = function(){
        callback(xhr.response);
    }
    xhr.onerror = function(error){
        return error;
    }


    //发送请求
    xhr.send(null); 
}