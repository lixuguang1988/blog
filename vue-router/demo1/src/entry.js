require("normalize.css"); //怎么能把normalize 引用放在前面
require("./style.css");

import router from "../router/router.js";

//Vue.use(VueRouter);



// router.beforeEach((to, from, next) => {
//     debugger;
//   console.log(to, from, next)
//   next();
// });


var app = new Vue({
    router
}).$mount("#app");

