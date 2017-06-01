<template>
  <div class="">
      <nav-header :title="search.tab | getTabTitle"></nav-header>
      <div class="v-scroller">
        <spinner v-if="ptr_Ok"></spinner>
        <div class="topic-list" v-infiniteload="fetch"
           @touchstart = "ptrStart"
           @touchmove = "ptrMove"
           @touchend = "ptrEnd"
           @mousedown = "ptrStart"
           @mousemove = "ptrMove"
           @mouseup = "ptrEnd"           
           >
            <div class="topic-list-item" v-for="item in topics" :key="item.id"  :data-url="item.id" @click="ptrPrevent">
                <!--<router-link>-->
                  <div class="item-avatar"><img :src="item.author.avatar_url"></div>
                  <div class="item-main">
                    <div class="item-title" :title="item.tab | getTabTitle">{{item.title}}</div>
                    <div class="item-meta">
                      <span>{{ item.reply_count }}/{{ item.visit_count }}</span>
                      <span>{{ item.last_reply_at | timeAgo }}</span>
                    </div>                   
                  </div>
                <!--</router-link>-->
            </div>
        </div>
        <div class="loading" @click="loadMore">{{nomore ? '没有更多了' : ajax ? "努力加载中..." : "加载更多"}}</div>
      </div>
  </div>
</template>

<script>
import NavHeader from '../components/Header.vue'
import spinner from '../components/spinner.vue'




export default {
  name: 'home',
  components: {
    'nav-header': NavHeader,
    'spinner': spinner
  },
  data () {
    return {
      search: {
        page: 1,
        tab:  this.$route.query.tab || 'all',
        limit: 20,
        mdrender: true,
      },
      scroll: 0,
      ajax: false,
      nomore: false,
      topics: [],

      ptr_Start: 0,
      ptr_Enabled: false,
      ptr_LockEnabled: false,
      ptr_Ok: false,
    }
  },
  computed: {
  },
  created () {
    var state = this.$store.state,
        scroll = state.scroll;

    //首页跳转到all
    if(!this.$route.query.tab){
      this.$router.replace({name: "list", query: {tab: 'all'}});
    }

    if(state.topicList && state.search ){
      this.topics = state.topicList;
      this.search.tab = state.search.tab;
      this.search.page = state.search.page;
      this.ajax = false;
      this.nomore = state.nomore;

      this.$nextTick(function(){
          //这个延时时间要大于transition的时间
          setTimeout(function() {
              $(document).scrollTop(scroll);
          }, 600);
      });

      //清除上次的状态
      this.$store.commit("SET_TOPIC_LIST", null);
      this.$store.commit("SET_SEARCH", null);      
      this.$store.commit("SET_SCROLL", 0);
      this.$store.commit("SET_NO_MORE", false);

      return;
    }
    this.fetch();
  },
  watch: {
    '$route' (to, from){

      this.topics = [];
      this.search.page = 1;
      this.search.tab = to.query.tab;
      this.nomore = false;
      this.ajax = true;

      this.fetch();
    }
  },
  beforeRouteLeave (to, from, next) {
    //记录当前的状态
    this.$store.commit("SET_TOPIC_LIST", this.topics);
    this.$store.commit("SET_SEARCH", this.search);
    this.$store.commit("SET_SCROLL", window.pageYOffset);
    this.$store.commit("SET_NO_MORE", this.nomore);

    next();
  },
  methods: {
    fetch () {
      var self = this;
      // $.ajaxSettings.crossDomain = true;
      if(self.ajax || self.nomore){
        return;
      }
      self.ajax = true;
      $.getJSON('https://cnodejs.org/api/v1/topics?' + $.param(this.search), function(data){
          if(!data || !data.success){return }
          self.ajax = false;
          self.topics = self.topics.concat(data.data);
          self.search.page++;
          self.nomore = data.data.length < self.search.limit
      });
    },
    loadMore () {
      this.fetch();
    },


    /*pulltoRefresh*/
    ptrStart: function(event){
      //不上最上面，或者多点
      if(window.pageYOffset > 0 || event.changedTouches && event.changedTouches.length > 1){
          return
      }
      this.ptr_LockEnabled = false;
      this.ptr_Enabled = true
      this.ptr_Start = event.changedTouches ?  event.changedTouches[0].clientY : event.clientY;
    },
    ptrMove: function(event){
        if(!this.ptr_Enabled){
            return
        }

        var diff = (event.changedTouches ?  event.changedTouches[0].clientY : event.clientY) - this.ptr_Start,
            el = event.currentTarget;
        

        //上滑
        if(diff < 0){ return }

        this.ptr_LockEnabled = true;
        event.preventDefault();
        el.style.transform =  'translate3D(0, ' + diff + 'px, 0)';
        this.ptr_Ok = diff > 60;
    },
    ptrEnd: function(event){
        console.log("end");
        if(!this.ptr_Enabled){return}
        this.ptr_Enabled = false;
        var diff = (event.changedTouches ?  event.changedTouches[0].clientY : event.clientY) - this.ptr_Start,
            el = event.currentTarget;

        if(diff > 60){
            el.style.transform =  'translate3D(0, 60px, 0)';
            this.ptrLoad(el);
        }else{
            el.style.transform =  'translate3D(0, 0, 0)';
        }
    },
    ptrPrevent: function(event){
      console.log("click", event.type);
      if(this.ptr_LockEnabled){
        return
      }

      this.$router.push({
        name: 'topic',
        params: {
          id: event.currentTarget.dataset.url
        }
      });
      this.ptr_LockEnabled = false;
    },
    ptrLoad: function(el){
      setTimeout(()=>{
        this.ptr_Ok = false;
        el.style.transform =  'translate3D(0, 0, 0)';
      }, Math.random() * 3000);
    }

  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.v-scroller{
  position: relative;
}
.topic-list{
  transition: all .3s linear;
}
.topic-list-item{
  display: flex;
  padding: 10px;
  border-bottom: 1px solid #eee;
  line-height: 20px;
  color: #333;
  text-decoration: none;
}
.item-avatar img{
  width: 60px;
  height: 60px;
  vertical-align: middle;
}
.item-main{
  flex: auto;
  padding-left: 10px;
  overflow: hidden;
}
.item-title{
  font-size: 16px;
  height: 40px;
  overflow: hidden;
}
.item-title:before{
  content: attr(title);
  font-size: 14px;
  background: green;
  margin-right: 10px;
  color: #fff;
  display: inline-block;
  padding: 0 10px;
  border-radius: 5px;
}
.item-meta{
  font-size: 13px;
  color: #888;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.item-meta span{
  margin-right: 20px;
}
.loading{
  text-align: center;
  padding: 20px;
  color: #888;
  font-size: 13px;
}

</style>
