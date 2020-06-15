import Vue from "vue";
import VueRouter from "vue-router";
// import store from "../store";
import constantRouter from "./constantRouter";
// import Home from "../views/home/Home.vue";
// import Archives from "../views/archives/Archives.vue";
// import Login from "../views/login/Login.vue";
// import Admin from "../views/admin/Admin.vue";
// import AdminHome from "../views/admin/AdminHome.vue";
// import NewBlog from "../views/blog/NewBlog.vue";
// import ViewBlog from "../views/blog/ViewBlog.vue";
// import EditBlog from "../views/blog/EditBlog.vue";


Vue.use(VueRouter);

const routes = [
  ...constantRouter
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
