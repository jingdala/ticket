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
    path: "/",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import("../views/home/Home.vue"),
    redirect: "/exhibition/conventional",
    children: [
      {
        path: "/exhibition/conventional",
        component: () => import("../views/exhibition/conventional"),
      },
      {
        path: "/exhibition/temporary",
        component: () => import("../views/exhibition/temporary"),
      },
      {
        path: "/exhibition/temporaryType",
        component: () => import("../views/exhibition/temporaryType"),
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
