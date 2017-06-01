<template>
    <div>
        <div class="header">
            <div class="header-collapse" @click="showAside">
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
            </div>
            <div class="header-title">
                {{ title }}
            </div>
        </div>
        <div class="mask" @click="hideAside" v-show="aside"></div>
        <div class="aside" :class="{'aside-active': aside}">
            <div class="icon icon-quanbu all">
                <router-link :to="{name: 'list', query: {tab: 'all'}}">全部</router-link>
            </div>
            <div class="icon icon-jinghua good">
                <router-link :to="{name: 'list', query: {tab: 'good'}}">精华</router-link>
            </div>
            <div class="icon icon-fenxiang share">
                <router-link :to="{name: 'list', query: {tab: 'share'}}">分享</router-link>
            </div>
            <div class="icon icon-wenda ask">
                <router-link :to="{name: 'list', query: {tab: 'ask'}}">问答</router-link>
            </div>
            <div class="icon icon-zhaopin job">
                <router-link :to="{name: 'list', query: {tab: 'job'}}">招聘</router-link>
            </div>
            <div class="icon icon-denglu login">
                <router-link :to="{name: 'login'}">登录</router-link>
            </div>
        </div>
    </div>
</template>


<script>
export default {
  name: 'nav-header',
  data () {
      return {
        aside: false
      }
  },
  props: {
      title: {
          type: String,
          default: "全部"
      }
  },
  watch: {
    '$route' (to, from){
        if(to == from) {return false;}
        this.aside = false;
    }
  },
  methods: {
      hideAside () {
          this.aside = false
      },
      showAside () {
          this.aside = true
      }
  }
}
</script>

<style>
.header{
    line-height: 20px;
    padding: 15px;
    background: #333;
}
.header-collapse{
    float: left;
}
.header-collapse span{
    width: 20px;
    height: 3px;
    background: #eee;
    margin: 3px 0;
    display: block;
}
.header-title{
    text-align: center;
    color: #fff;
}
.mask{
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    background: rgba(0, 0, 0, .4);
    bottom: 0;
    /*display: none;*/
}
.aside{
    width: 200px;
    position: fixed;
    background: #fff;
    top: 0;
    left: -200px;
    bottom: 0;
    -webkit-transition: all .5s linear;
    -moz-transition:  all .5s linear;
    transition:  all .5s linear;
    padding-top: 50px;
}
.aside-active{
    left: 0;
}
.aside a{
    line-height: 20px;
    display: block;
    padding: 10px 30px;
    text-decoration: none;
    color: #5256fb;
}
.aside .router-link-exact-active{
    color: green;
}
</style>




