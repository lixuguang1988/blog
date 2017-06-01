var directives = {
    //无限加载
    infiniteload : {
        bind: function(el, binding, vnode){
            $(window).on("scroll.infiniteload", function(){
                if(window.pageYOffset + window.innerHeight >= document.documentElement.scrollHeight){
                binding.value && binding.value.call();
                }
            });
        },
        unbind: function(el, binding, vnode){
            $(window).off("scroll.infiniteload");
        }
    },
}


export default directives;