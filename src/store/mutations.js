const login = (state) => {
  state.auth = true;
};

const loginOut = (state) => {
  state.auth = false;
}

const getUserInfo = (state, userInfo = {}) => {
  state.userInfo = userInfo;
}

const generateUserRoutes = (state, routes) => {
  state.userRoutes = routes;
}

const initUserRole = (state, role) => {
  state.userInfo.role = role;
}

const changeType = (state, type) => {
  state.type = type;
}

const updateUserInfo = (state, userInfo) => {
  Object.assign(state.userInfo, userInfo);
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
