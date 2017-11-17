# 路由缓存
[通常页面缓存实现方式](https://www.cnblogs.com/sysuhanyf/p/7454530.html)  
如果当前页面跳转/user/hustxiaoc 跳转 /user/dengnan123 
```js
watch: {
  $route(route, old){
    console.log('watch', route,  old);
    var id = route.params.id;
    //首次进来
    if(id == this.userId){ return }
    //从页面出去
    if(!/^\/user\//.test(route.fullPath)){ return }
    this.userId = route.params.id
    this.fetchData();
  }
}
```

完整代码:
```js
import  ListPanel from './listPanel'

export default {
  name: 'User',
  components: {
    listPanel: ListPanel
  },
  data () {
    return {
      user: null,
      userId: this.$route.params.id,
      ajax: true
    }
  },
  created() {
    this.fetchData()
  },
  watch: {
    $route(route, old) {
      console.log('watch', route,  old);
      var id = route.params.id;
      //首次进来
      if(id == this.userId){ return }
      //从页面出去
      if(!/^\/user\//.test(route.fullPath)){return }
      this.userId = route.params.id
      this.fetchData();
    }
  },
  activated(){
    var id = this.$route.params.id
    console.log(this.userId,  id)
    if(this.userId != id){
      this.userId = id
      this.fetchData()
      document.documentElement.scrollTop = 0
    }
  },
  methods: {
    fetchData(){
      this.ajax = true
      fetch('http://cnodejs.org/api/v1/user/' + this.userId)
      .then(function(response) {
        return response.json()
      }).then(json => {
        this.user = json.data
        this.ajax = false
      }).catch(function(ex) {
        console.log('parsing failed', ex)
      })
    }
  }
}
```

```html
<template>
  <div class="container">
    <div v-if="!ajax && user" class="topic">
      <h1>{{user.title}}</h1>
      <div class="user-profile">
        <div class="profile-avatar"><img :src="user.avatar_url" width="60" height="60"></div>
        <div class="profile-name">{{user.loginname}}</div>
        <div class="profile-meta"><span>加入时间:{{user.create_at | dateFormate}}</span><span>经验值:{{user.score}}</span></div>
      </div>
      <list-panel :title="'最近发起的话题'" :items="user.recent_topics"></list-panel>
      <list-panel :title="'最近参与的话题'" :items="user.recent_replies"></list-panel>
    </div>
  </div>
</template>
```

