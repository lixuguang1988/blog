
//监听扩展发送请求
chrome.extension.onRequest.addListener(
    function(request, sender, sendResponse) {
        console.log(sender.tab ?
        "from a content script:" + sender.tab.url :
            "from the extension");
        if (request.greeting == "hello")
            sendResponse({farewell: document.title});
        else
            sendResponse({}); // snub them.

        //向扩展发一个请求
        chrome.extension.sendRequest({greeting: "hello"}, function(response) {
            console.log(response.farewell);
        });
    });




