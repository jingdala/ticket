import Vue from "vue";
import VueRouter from "vue-router";
import Login from "../views/login/Login.vue";

const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch((err) => err);
};

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    redirect: "/login",
  },
  {
    path: "/login",
    component: Login,
  },
  {
    path: "/home",
    meta: { title: "展览管理", icon: "tab" },
    component: () => import("../views/home/Home.vue"),
    redirect: "/exhibition/conventional",
    children: [
      {
        meta: { title: "常规展览", icon: "" },
        path: "/exhibition/conventional",
        component: () => import("../views/exhibition/conventional"),
      },
      {
        meta: { title: "临时展览", icon: "" },
        path: "/exhibition/temporary",
        component: () => import("../views/exhibition/temporary"),
      },
      {
        meta: { title: "临展类型", icon: "" },
        path: "/exhibition/temporaryType",
        component: () => import("../views/exhibition/temporaryType"),
      },
    ],
  },
  {
    path: "/users",
    redirect: "/users/userList",
    component: () => import("../views/home/Home.vue"),
    children: [
      {
        path: "/users/userList",
        component: () => import("../views/users/userList"),
      },
      {
        path: "/users/userRights",
        component: () => import("../views/users/userRights"),
      },
      {
        path: "/users/editRole",
        component: () => import("../views/users/editRole"),
      },
    ],
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});
// 挂载路由导航守卫
router.beforeEach((to, from, next) => {
  // to 将要访问的路径
  // from 代表从哪个路径跳转而来
  // next 是一个函数，表示放行
  //     next()  放行    next('/login')  强制跳转
  if (to.path === "/login") return next();
  // 获取token
  const tokenStr = window.sessionStorage.getItem("token");
  if (!tokenStr) return next("/login");
  next();
});

export default router;
