import { get, post, put } from './http';

const LOGIN_URL = '/user/login';
const NEW_BLOG_URL = '/blog/new';
const LiST_BLOG_URL = '/blog/list';
const DEL_BLOG_URL = '/blog/del';
const VIEW_BLOG_URL = '/blog/details';
const EDIT_BLOG_URL = '/blog/update';
const USER_INFO_URL = '/user/userInfo';
const DATE_LIST_URL = '/blog/date-list';
const TITLE_SEARCH_URL = '/blog/title-search';
const UPDATE_SIGNATURE_URL = '/user/u-signature';
const GET_SIGNATURE_URL = '/user/g-signature';

const login = (params) => {
  return get(LOGIN_URL, params);
};

const newBlog = (params) => {
  return post(NEW_BLOG_URL, params);
}

const listBlog = (params) => {
  return get(LiST_BLOG_URL, params);
}

const deleteBlog = (params) => {
  return post(DEL_BLOG_URL, params);
}

const viewBlog = (params) => {
  return get(VIEW_BLOG_URL, params);
}

const editBlog = (params) => {
  return post(EDIT_BLOG_URL, params);
}

const getUserInfo = () => {
  return get(USER_INFO_URL);
}

const getDateList = (params) => {
  return get(DATE_LIST_URL, params);
}

const getTitleForKey = (params) => {
  return get(TITLE_SEARCH_URL, params);
}

const updateSignature = (params) => {
  return put(UPDATE_SIGNATURE_URL, params);
}

const getSignature = (params) => {
  return get(GET_SIGNATURE_URL, params);
}

const postUserInfo = (params) => {
  return post(USER_INFO_URL, params);
}

export default { 
  login,
  newBlog,
  listBlog,
  deleteBlog,
  viewBlog,
  editBlog,
  getUserInfo,
  getDateList,
  getTitleForKey,
  updateSignature,
  getSignature,
  postUserInfo
}