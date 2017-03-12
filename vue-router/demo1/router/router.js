import Posts from "../components/posts.vue";
import PostItem from "../components/postItem.vue";
import User from "../components/user.vue";




export default new VueRouter({
    //mode: 'history',
    routes: [
        {
            path: "/hot", component: Posts
        },
        {
            path: "/post/:id", component: PostItem
        },        
        {
            path: "/user/:id", component: User
        },
        {
            path: "/", redirect: '/hot' 
        }                
    ]
});




