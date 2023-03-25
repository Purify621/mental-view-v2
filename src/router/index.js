import Vue from "vue";
import VueRouter from "vue-router";
import LoginView from "../views/LoginView.vue";
import studentInfo from "../views/StudentInfo.vue";
// import HomeView from "../views/HomeView.vue";
import info from "../views/Info.vue";
import start from "../views/Start.vue";
// 个人中心，以及三个子路由
import my from "../views/My.vue";
import basicData from "@/components/my/basicData";
import consultation from "@/components/my/consultation";
import report from "@/components/my/report";
Vue.use(VueRouter);

// 路由表
const routes = [
  {
    path: "/",
    redirect: "/home",
  },
  {
    path: "/home",
    name: "home",
    component: () => import("@/views/HomeView.vue"),
  },
  {
    path: "/login",
    name: "login",
    component: LoginView,
  },
  {
    path: "/studentInfo",
    name: "studentInfo",
    component: studentInfo,
  },
  {
    path: "/info/:id",
    name: "info",
    component: info,
  },
  {
    path: "/start/:id",
    name: "start",
    component: start,
  },
  {
    path: "/article/:id",
    name: "article",
    component: () => import("@/views/Article.vue"),
  },
  {
    path: "/my",
    name: "my",
    component: my,
    redirect: "/my/basicData", // 重定向到二级路由的基本资料
    // 注意：进行tab栏切换时，二级路由前不能加/
    children: [
      {
        path: "basicData",
        component: basicData,
      },
      {
        path: "consultation",
        component: consultation,
      },
      {
        path: "report",
        component: report,
      },
    ],
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
