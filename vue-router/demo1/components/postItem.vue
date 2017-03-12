<template>
    <div class="archive">
        <template v-if="archive">

            <div class="profile-error" v-if="error">
                Oops {{error.toString()}}
            </div>    

            <div class="archive-main">
                <div class="archive-title">{{archive.title}}</div>
                <div class="archive-info">
                    <span class="archive-pubdate">发布时间：{{formateDate}}</span>
                    <router-link :to="'/user/' + archive.by">{{archive.by}}</router-link>
                </div>
                <div class="archive-content markdown-section" v-html="content"></div>
                <!--foreach archiv.tags-->  
                <div class="archive-tag" v-if="archive.tags">
                    <span v-for="tag in archive.tags">{{tag}}</span>  
                </div> 
            </div>
            
        </template>
        
        <div class="profile-loading" v-show="loading">
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
            console.log("user")
            return {
                loading: false,
                error: false,
                archive: null,
                id: this.$route.params.id
            }
        },
        created(){
            console.log("user.created");
            this.fetchData();
        },
        computed:{
             formateDate(){
                 return this.archive.date;
            },
            content(){
                return this.archive.content
            }
        },
        methods: {
            fetchData(){
                this.loading = true;
                this.error = false;
                var vm = this;
                getJSON("../data/archive.json?uid=" + this.id, function(error){
                    vm.loading = true;
                    vm.error = error;
                    vm.archive = null;
                }, function(data){
                    vm.loading = false;
                    vm.archive = data;
                });
            }
        },
        watch: {
            "$route": "fetchData"
        }
    }
</script>