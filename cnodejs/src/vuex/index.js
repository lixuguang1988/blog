import Vue from 'vue';
import Vuex from 'vuex';

//安装vuex
Vue.use(Vuex);

var store = new Vuex.Store({
    state: {
        topicList: null,
        topics: {},
        users: {},
        userInfo: {},
        scroll: 0,
        nomore: false,
        search: null
    },
    mutations: {
        //更新topic列表
        SET_TOPIC_LIST (state, list) {
            state.topicList = list;
        },
        SET_SEARCH (state, obj){
            state.search = obj;
        },
        SET_SCROLL (state, top){
            state.scroll = top;
        },
        SET_NO_MORE (state, stats){
            state.nomore = stats;
        },

        //更新访问过得topics
        SET_TOPICS (state, topic){
            state.topics[topic.id] = topic;
        },
        //更新用户信息
        SET_USERINFO (state, userInfo){
            state.userInfo = userInfo
        },

        //更新Users信息
        SET_USERS (state, user){
            state.users[user.loginname] = user
        }        
    }
});

export default store;