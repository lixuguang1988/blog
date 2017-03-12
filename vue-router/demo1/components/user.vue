<template>
    <div class="user-profile">
        <template v-if="profile">

            <div class="profile-error" v-if="error">
                Oops {{error.toString()}}
            </div>    

            <div class="profile-item">
                <div class="user-profile-name">{{profile.name}}</div>

                <!--foreach-->            
                <template v-for="postion in profile.positions">
                    <div class="postion-item">
                        <div class="postion-item-title">{{postion.company}}</div>
                        <div class="postion-item-range">{{postion.range}}</div>
                    </div>
                </template>   
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
                profile: null,
                uid: this.$route.params.id
            }
        },
        created(){
            console.log("user.created");
            this.fetchData();
        },
        methods: {
            fetchData(){
                this.loading = true;
                this.error = false;
                var vm = this;
                getJSON("../data/profile.json?uid=" + this.uid, function(error){
                    vm.loading = true;
                    vm.error = error;
                    vm.profile = null;
                }, function(data){
                    vm.loading = false;
                    vm.profile = data;
                });
            }
        },
        watch: {
            "$route": "fetchData"
        }
    }
</script>