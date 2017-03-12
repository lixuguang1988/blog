<template>
    <div class="entry-lst">
        <template v-if="posts">
            <div class="entry-error" v-if="error">
                Oops {{error.toString()}}
            </div>    

            <!--foreach-->            
            <template v-for="post in posts">
                <div class="entry-item">
                    <div class="entry-item-title"><router-link :to="'/post/' + post.id">{{post.title}}</router-link></div>
                    <div class="entry-item-content">{{post.desc}}</div>
                    <div class="entry-item-bar">by <router-link :to="'/user/' + post.by">{{post.by}}</router-link></div>
                </div>
            </template>   
            
        </template>

        <div class="entry-loading" v-show="loading">
                loading...
        </div>
        <!--<template v-else>
            no data
        </template>-->
    </div> 
</template>

<script>
    import {getJSON} from '../api/api';


    export default {
        data(){
            debugger;
            console.log("posts")
            return {
                loading: false,
                error: false,
                posts: null,
                // category: $route.param.category
            }
        },
        created(){
            debugger;
            this.fetchData();
        },
        methods: {
            fetchData(){
                this.loading = true;
                this.error = false;
                var vm = this;
                console.log(this.$route);
                getJSON("../data/category.json?type=", function(error){
                    vm.loading = false;
                    vm.error = error;
                    vm.profile = null;
                }, function(data){
                    vm.loading = false;
                    vm.posts = data;
                });
            }
        },
        watch: {
            "$route": "fetchData"
        }
    }
</script>