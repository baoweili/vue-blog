import Vue from "vue";
import Vuex from "vuex";
import * as mutations from './mutations';
import * as actions from './actions';

Vue.use(Vuex);

let storeState = sessionStorage.getItem('store_state');
let initState = {
  auth: false, // 是否登录
  userInfo: {}, // 用户信息
  userRoutes: {}, // 权限路由
  type: '', // 博客列表类型
};

export default new Vuex.Store({
  state: storeState ? Object.assign(JSON.parse(storeState), { type: '' }) : initState,
  mutations: {
    ...mutations
  },
  actions: {
    ...actions
  },
  modules: {}
});
