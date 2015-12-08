(function(){
   var task = {
       _index : 0,
       values : {},
       add : function(title){
           var index = this._index,
               div = document.createElement("div");
           localStorage.setItem("task" + index, JSON.stringify({id : index, title : encodeURIComponent(title), status : 0, pubdate : +new Date()}));

           div.className  = "task-item";
           div.innerHTML = '<input class="task-check" type="checkbox" name="completed" value="' + index + '"><label>' + title + '</label>';
           document.querySelector('.task-items').insertBefore(div, document.querySelector('.task-item'));

           this._index++;
        },
       complete: function(dom, index){
          var task = JSON.parse(localStorage.getItem("task" + index));
           task.status  = -1;
           localStorage.setItem("task" + index, JSON.stringify(task));
           dom.parentNode.classList.add("task-item-completed");
       },
       active: function(dom, index){
           var task = JSON.parse(localStorage.getItem("task" + index));
           task.status  = 0;
           localStorage.setItem("task" + index, JSON.stringify(task));
           dom.parentNode.classList.remove("task-item-completed");
       },
       remove : function(index){
           localStorage.removeItem("task" + index)
       },
       init: function(){
           var taskStr = "",
               i = 0,
               length = localStorage.length,
               key,
               task;
           if(length){
               for( ; i < length; i++){
                   key = localStorage.key(i);
                   task = JSON.parse(localStorage.getItem(key));
                   taskStr = '<div class="task-item' + (task.status == -1 ? " task-item-completed" : "") + '">'
                                 + '<input class="task-check" type="checkbox" ' + (task.status == -1 ? " checked=\"checked\"" : "") + ' name="completed" value="' + task.id + '">'
                                 + '<label>' + decodeURIComponent(task.title) + '</label>'
                       + '</div>' + taskStr;
               }
               this._index = task.id + 1;
           }else {
               taskStr = "赶快添加您的第一条任务吧!"
           }
           document.querySelector('.task-items').innerHTML = taskStr;
       }
   };

    //注册DOMContentloaded事件
    document.addEventListener("DOMContentLoaded", function(){

            //初始化任务清单
            task.init();


            document.querySelector("input").addEventListener("keyup", function(event){
               if(event.keyCode == "13"){
                   task.add(this.value);
                   this.value = "";
               }
            }, false);

            document.addEventListener("change", function(event){
                var target = event.target;
                if(target.classList.contains("task-check")){
                    if(target.checked){
                        task.complete(target, target.value);
                    }else{
                        task.active(target, target.value);
                    }
                }
            }, false);

            document.getElementById("getPageTitle").addEventListener("click", function(){
                //向注入页面的script发送一个请求
                chrome.tabs.getSelected(null, function(tab) {
                    chrome.tabs.sendRequest(tab.id, {greeting: "hello"}, function(response) {
                        document.getElementById("header").innerHTML = response.farewell;
                    });
                });
            }, false);

            //监听注入页面中的script的发送的请求
            chrome.extension.onRequest.addListener(
                function(request, sender, sendResponse) {
                    console.log(sender.tab ?
                    "from a content script:" + sender.tab.url :
                        "from the extension");
                    if (request.greeting == "hello")
                        sendResponse({farewell: "wowow"});
                    else
                        sendResponse({}); // snub them.
                });

    }, false);

}());









