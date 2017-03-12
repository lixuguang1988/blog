/**
 * Created by lixuguang on 2016/8/25.
 */

if(!Function.prototype.partial) {
    Function.prototype.partial = function () {
        var fn = this, args = Array.prototype.slice.call(arguments);
        return function () {
            var arg = 0;
            for (var i = 0; i < args.length && i < arguments.length; i++) {
                if (args[i] === undefined) {
                    args[i] = arguments[arg++];
                }
            }
            return fn.apply(this, args);
        }
    };
<<<<<<< HEAD
}
=======
}
>>>>>>> 074f540678585dd1d5d10585bb5fd833ec467ee8
