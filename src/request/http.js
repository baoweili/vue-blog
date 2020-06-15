import axios from 'axios';
import router from '@/router';
import store from '@/store';
import { Message } from 'element-ui';

axios.defaults.baseURL = '/api';
axios.defaults.timeout = 3000;
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=utf-8';

axios.interceptors.request.use(config => {
  const token = sessionStorage.getItem('token');
  token && (config.headers.Authorization = `bearer ${token}`);
  return config;
}, err => {
  return Promise.reject(err);
});

axios.interceptors.response.use(res => {
  if(res.status === 200) {
    if(res.data.code === 1) {
      return Promise.resolve(res.data);
    }
  }
  return Promise.reject({ msg: '获取失败' });
}, err => {
  let status = err.response.status;
  if(status) {
    switch(status) {
      case 401: 
        store.dispatch('loginOut');
        sessionStorage.getItem('token') && sessionStorage.removeItem('token');
        Message({ type: 'warning', message: '没有访问权限，请登录'});
        router.replace({ path: '/login' });
        break;
      default: 
        break;
    }
  }
  return Promise.reject(err.response);
})

const get = (url, params) => {
  return new Promise((resolve, reject) => {
    axios.get(url, {
      params
    }).then(res => {
      resolve(res);
    }).catch(err => {
      reject(err);
    });
  });
}

const post = (url, params) => {
  return new Promise((resolve, reject) => {
    axios.post(url, params).then(res => {
      resolve(res);
    }).catch(err => {
      reject(err);
    });
  });
}

const put = (url, params) => {
  return new Promise((resolve, reject) => {
    axios.put(url, params).then(res => {
      resolve(res);
    }).catch(err => {
      reject(err);
    });
  });
}

export {
  get,
  post,
  put
}