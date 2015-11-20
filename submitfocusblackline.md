##input[type="submit"]和button[type="submit"]在IE6-7下会出现黑边，就算是你在样式中重置了一个border属性也是如此
1.要解决这样的bug最好的方法就是在button和input的标签外添加一个标签，然后将样式写在这个标签上，并且把button和input的默认样式都去除  
2.<code>input {filter:chroma(color=#000000);}</code>  tips:input的字体颜色是白色
