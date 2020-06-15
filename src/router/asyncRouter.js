import Admin from "../views/admin/Admin.vue";
import AdminHome from "../views/admin/AdminHome.vue";
import NewBlog from "../views/blog/NewBlog.vue";
import ViewBlog from "../views/blog/ViewBlog.vue";
import EditBlog from "../views/blog/EditBlog.vue";
import UserCenter from "../views/admin/UserCenter.vue";

const asyncRouter = [
  {
    path: "/admin",
    component: Admin,
    children: [
      {
        path: "",
        name: "admin-home",
        component: AdminHome
      }, {
        path: "new",
        name: "new-blog",
        component: NewBlog
      }, {
        path: "details",
        name: "details",
        component: ViewBlog
      }, {
        path: "edit",
        name: "edit",
        component: EditBlog
      }, {
        path: "user",
        name: "user-center",
        component: UserCenter
      }
    ]
  },
  { path: "*", redirect: "/404" }
];

export default asyncRouter;