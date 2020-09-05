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
        meta: { title: "展览类型", icon: "" },
        path: "/exhibition/temporaryType",
        component: () => import("../views/exhibition/temporaryType"),
      },
      {
        meta: { title: "创建临时展览", icon: "" },
        path: "/exhibition/createTemporary",
        component: () => import("../views/exhibition/createTemporary"),
      },
    ],
  },
  {
    path: "/orderManage",
    meta: { title: "预约管理", icon: "tab" },
    component: () => import("../views/home/Home.vue"),
    redirect: "/orderManage/orderList",
    children: [
      {
        meta: { title: "预约列表", icon: "" },
        path: "/orderManage/orderList",
        component: () => import("../views/orderManage/orderList"),
      },
    ],
  },
  {
    path: "/users",
    redirect: "/users/userList",
    meta: { title: "用户管理", icon: "" },
    component: () => import("../views/home/Home.vue"),
    children: [
      {
        meta: { title: "角色列表", icon: "" },
        path: "/users/userList",
        component: () => import("../views/users/userList"),
      },
      {
        meta: { title: "角色权限", icon: "" },
        path: "/users/userRights",
        component: () => import("../views/users/userRights"),
      },
      {
        meta: { title: "编辑角色功能", icon: "" },
        path: "/users/editRole",
        component: () => import("../views/users/editRole"),
      },
    ],
  },
  {
    path: "/equipManage",
    redirect: "/equipManage/advertisement",
    meta: { title: "设备管理", icon: "tab" },
    component: () => import("../views/home/Home.vue"),
    children: [
      {
        meta: { title: "检票管理", icon: "" },
        path: "/equipManage/equipOperationReport",
        component: () => import("../views/equipManage/equipOperationReport"),
      },
    ],
  },
  {
    path: "/dataAnalysis",
    redirect: "/dataAnalysis/commonCount",
    meta: { title: "数据分析", icon: "tab" },
    component: () => import("../views/home/Home.vue"),
    children: [
      {
        meta: { title: "常规统计", icon: "" },
        path: "/dataAnalysis/commonCount",
        component: () => import("../views/dataAnalysis/commonCount"),
      },
      {
        meta: { title: "多次到访", icon: "" },
        path: "/dataAnalysis/manyVisits",
        component: () => import("../views/dataAnalysis/manyVisits"),
      },
      {
        meta: { title: "场次统计", icon: "" },
        path: "/dataAnalysis/sceneCount",
        component: () => import("../views/dataAnalysis/sceneCount"),
      },
    ],
  },
  {
    path: "/logManage",
    redirect: "/logManage/logList",
    meta: { title: "日志管理", icon: "tab" },
    component: () => import("../views/home/Home.vue"),
    children: [
      {
        meta: { title: "日志列表", icon: "" },
        path: "/logManage/logList",
        component: () => import("../views/logManage/logList"),
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
