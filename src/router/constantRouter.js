import Home from "../views/home/Home.vue";
import Archives from "../views/archives/Archives.vue";
import Login from "../views/login/Login.vue";
import NotFound from "../views/error/NotFound.vue";
import Details from "../views/details/Details.vue";

const constantRouter = [
  {
    path: "/",
    name: "home",
    component: Home
  }, {
    path: "/archives",
    name: "archives",
    component: Archives
  }, {
    path: "/login",
    name: "login",
    component: Login
  }, {
    path: "/details",
    name: "home-details",
    component: Details
  }, {
    path: "/404",
    name: "not-found",
    component: NotFound
  }
];

export default constantRouter;