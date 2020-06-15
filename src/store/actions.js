import axios from '../request/api';
import asyncRouter from '../router/asyncRouter';

const login = ({ commit }, params) => {
  commit('login', params);
};

const loginOut = ({ commit }) => {
  commit('loginOut');
}

const getUserInfo = ({ commit }) => {
  return new Promise((resolve, reject) => {
    axios.getUserInfo().then(res => {
      commit('getUserInfo', res.data);
      resolve(res.data);
    }).catch(err => {
      reject(err);
    })
  })
}

const generateUserRoutes = ({ commit }, userInfo) => {
  let routes = asyncRouter.filter(route => {
    return userInfo.menus.some(menu => menu === route.path);
  });
  commit('generateUserRoutes', routes);
}

const initUserRole = ({ commit }, role) => {
  commit('initUserRole', role);
}

const changeType = ({ commit }, type) => {
  commit('changeType', type);
}

const updateUserInfo = ({ commit }, userInfo) => {
  commit('updateUserInfo', userInfo);
}

export {
  login,
  loginOut,
  getUserInfo,
  generateUserRoutes,
  initUserRole,
  changeType,
  updateUserInfo
}
