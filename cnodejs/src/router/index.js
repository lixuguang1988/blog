import Vue from 'vue'
import Router from 'vue-router'
import List from '@/views/List'
import Topic from '@/views/Topic'
import Login from '@/views/Login'
import User from '@/views/User'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      redirect: 'list',
    },
    {
      path: '/list',
      name: 'list',
      component:  List
    },
    {
      path: '/topic/:id',
      name: 'topic',
      component: Topic
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/user/:username',
      name: 'user',
      component: User
    }
  ],
  exact: true,
  scrollBehavior (to, from, savedPosition){
    if(savedPosition){
      return savedPosition;
    }
    return {
      x : 0,
      y : 0
    }
  }
})
