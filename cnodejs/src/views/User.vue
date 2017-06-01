<template>
  <div>
      <nav-header :title="user ? user.loginname + '的个人主页' : '个人主页'"></nav-header>
      <div class="profile" v-if="user">
              <img class="profile-avatar" :src="user.avatar_url">
              <h1 class="profile-title">{{ user.loginname }}</h1>
              <div class="profile-meta">
                {{ user.score }}  积分
              </div>
              <div class="profile-info">
                发布于 {{ user.create_at | timeAgo }}
              </div>
      </div>   
      <div class="recent" v-if="user">
        <div class="recent-header">最近创建的话题</div>
        <div class="recent-list">
              <router-link  class="recent-item" v-for="item in user.recent_topics" :to="{name: 'topic', params: {id: item.id} }"  :key="item.id">
                <img class="item-avatar" :src="item.author.avatar_url">
                <div class="item-title">{{ item.title }}</div>
                <div class="item-pubdate">{{ item.last_reply_at | timeAgo }}</div>
              </router-link>
              <div  class="recent-item disabled"  v-if="!user.recent_topics.length">TA没创建过话题</div>
        </div>
      </div>  
      <div class="recent" v-if="user">
        <div class="recent-header">最近参与的话题</div>
        <div class="recent-list">
              <router-link  class="recent-item" v-for="item in user.recent_replies" :to="{name: 'topic', params: {id: item.id} }" :key="item.id">
                <img class="item-avatar" :src="item.author.avatar_url">
                <div class="item-title">{{ item.title }}</div>
                <div class="item-pubdate">{{ item.last_reply_at | timeAgo }}</div>
              </router-link>
              <div class="recent-item disabled" v-if="!user.recent_replies.length">TA没参与过话题讨论</div>
        </div>
      </div>        
  </div>
</template>

<script>
import NavHeader from '../components/Header.vue'

export default {
  name: 'topic',
  data () {
    return {
      ajax: false,
      user: null
    }
  },
  components: {
    'nav-header': NavHeader
  },
  filters: {

  },
  watch: {
    '$route': function(to, from){
      if(to.params.username == from.params.username){
        return;
      }
      this.fetch();
    }
  },
  created () {
    this.fetch();
  },
  methods: {
    fetch () {
      var username = this.$route.params.username;
      if(this.$store.state.users[username]){
        this.user = this.$store.state.users[username];
        return;
      }
      self.ajax = true;
      $.getJSON('https://cnodejs.org/api/v1/user/' + username, (data) => {
          this.ajax = false;
          if(!data || !data.success){return }
          this.user = data.data;
          this.$store.commit("SET_USERS", data.data);
      });      
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.profile, .recent{
  padding: 10px;
}
.profile-info{
  font-size: 13px;
  color: #888;
  margin-top: 20px;
}
.profile-title{
  margin: 0 0 20px;
}
.profile:after{
  content: " ";
  display: table;
  clear: both;
}
.profile-avatar{
  float: right;
}
.recent-header{
  background:#eee;
  padding: 10px;
  border-radius: 5px 5px 0 0;
}
.recent-list{
  /*padding: 10px 0;*/
  border-left: 1px solid #eee;
  border-right: 1px solid #eee;
}
.recent-item {
  display: flex;
  padding: 10px;
  border-bottom: 1px solid #eee;
  line-height: 30px;
  color: #5256fb;
  text-decoration: none;
}
.recent-item.disabled{
  color: #888;
  text-align: center;
  display: block;
}
.item-avatar{
  width: 30px;
  height: 30px;
  flex: none;
}
.item-title{
  flex: auto;
  padding-left: 10px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.item-pubdate{
  text-align: right;
  font-size: 13px;
  color: #888;
  flex: none;
}
</style>
