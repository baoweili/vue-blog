import Vue from "vue";
import { Button, Pagination, Input, Avatar, Select, Option, Message, Dialog, Upload } from "element-ui";
import axios from '@/request/api'
import App from "./App.vue";
import store from "./store";
import router from "./router";
import "styles/iconfont.css";
import "./plugins/element.js";
import 'styles/variations.scss';

Message.install = function(Vue, options) {
  Vue.prototype.$message = Message;
}

Vue.config.productionTip = false;
Vue.use(Button);
Vue.use(Pagination);
Vue.use(Input);
Vue.use(Avatar);
Vue.use(Select);
Vue.use(Option);
Vue.use(Dialog);
Vue.use(Message);
Vue.use(Upload);

Vue.prototype.$axios = axios;
const whiteList = ['/login', '/', '/archives', '/details', '/404'];
const isIncludePath = (path, next) => {
  return whiteList.includes(path) ? next() : next('/login'); 
}

const removeCurrentPage = (tPath, fPath) => {
  let pageMap = {
    '/': 'homeCurrentPage',
    '/admin': 'adminCurrentPage'
  }
  if(tPath !== fPath && (fPath === '/' || fPath === '/admin')) {
    sessionStorage.removeItem(pageMap[fPath]);
  }
}

router.beforeEach((to, from, next) => {
  removeCurrentPage(to.path, from.path);
  const state = store.state;
  if(state.auth) {
    // 神来之笔 感动！
    if(!state.userInfo.role) { // 刷新时注意，把role清空
      store.dispatch('getUserInfo').then(res => {
        store.dispatch('generateUserRoutes', res);
        router.addRoutes(state.userRoutes);
        next({ ...to, replace: true });
      }).catch(err => {
        next({ ...to, replace: true });
      });
    } else {
      if(to.path === '/login') {
        Message({ type: 'success', message: '已经登录' })
        next('/admin');
      } else {
        next();
      }
    }
  } else {
    isIncludePath(to.path, next);
  }
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
