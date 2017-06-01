<template>
  <div>
      <nav-header title="主题"></nav-header>
      <div class="topic" v-if="topic">
          <div class="topic-header">
              <h1 class="topic-title">{{ topic.title }}</h1>
              <div class="topic-info">
                <span>发布于 {{ topic.create_at | timeAgo }}</span>
                <span>来自 <router-link :to="{name: 'user', params: {username : topic.author.loginname}}">{{ topic.author.loginname}}</router-link></span>
                <span>浏览 {{ topic.visit_count}} 次</span>
              </div>
          </div>
          <div class="topic-content" v-html="topic.content"></div>
      </div>   
      <div class="reply" v-if="topic">
        <div class="reply-header">{{ topic.reply_count }} 回复</div>
        <div class="reply-list">
            <div class="reply-item" v-for="(item, index) in topic.replies" :key="item.id">
              <router-link :to="{name: 'user', params: {username: item.author.loginname} }"><img class="item-avatar" :src="item.author.avatar_url"></router-link>
              <div class="item-main">
                  <div class="item-info">
                    <span class="item-floor">{{index + 1}} 楼</span>
                    <span>{{ item.author.loginname }}</span>
                    <span class="author" v-if="item.author.loginname == topic.author.loginname">作者</span>
                    <span class="pubdate">{{ item.create_at | timeAgo }}</span>
                  </div>
                  <div v-html="item.content"></div>
              </div>
            </div>
            <div class="reply-item disabled" v-if="!topic.replies.length">还没有回复</div>
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
      topic: null
    }
  },
  components: {
    'nav-header': NavHeader
  },
  filters: {

  },
  watch: {
    '$route': function(to, from){
      this.fetch();
    }
  },
  created () {

    this.fetch();
  },
  methods: {
    fetch () {
      var self = this,
          id = this.$route.params.id;
      if(this.$store.state.topics[id]){
        self.topic = this.$store.state.topics[id];
        return;
      }
      self.ajax = true;
      $.getJSON('https://cnodejs.org/api/v1/topic/' + id, function(data){
          if(!data || !data.success){return }
          self.ajax = false;
          self.topic = data.data;
          self.$store.commit("SET_TOPICS", data.data);
      });      
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.topic, .reply{
  padding: 10px;
}
.topic-info{
  font-size: 13px;
  color: #888;
}
.topic-info span{
  margin-right: 10px;
}
.topic-content{
  font-size: 15px;
  line-height: 1.8;
}
.reply-header{
  background:#eee;
  padding: 10px;
  border-radius: 5px 5px 0 0;
}
.reply-list{
  /*padding: 10px 0;*/
  border-left: 1px solid #eee;
  border-right: 1px solid #eee;
}
.reply-item {
  display: flex;
  padding: 10px;
  border-bottom: 1px solid #eee;
  line-height: 20px;
  color: #333;
}
.reply-item.disabled{
  color: #888;
  text-align: center;
  display: block;
}
.item-avatar{
  width: 40px;
  height: 40px;
}
.item-main{
  flex: auto;
  padding-left: 10px;
  overflow: hidden;
}
.item-info{
  font-size: 13px;
}
.item-floor{
  float: right;
}
</style>
