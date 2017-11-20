(function($){
    $.fn.smartInput = function(options){
        var config = $.extend({
            inputSelector: 'input',
            clearSelector: '.form-control-clear'
        }, options);

        return this.each(function(){
            var $input = $(this).find(config.inputSelector),
                $clear = $(this).find(config.clearSelector),
                timer_;

            $input.on('focus keyup', function(){
                clearTimeout(timer_);
                if(this.value === ''){
                    $clear.hide();
                }else{
                    $clear.show();
                }
            }).on('blur', function(){
                timer_ = setTimeout(function(){
                    $clear.hide()
                }, 50);
            });

            $clear.on('click', function(){
                clearTimeout(timer_);
                $input.val('');
                $(this).hide();
            });
        });
    }
})(jQuery);
