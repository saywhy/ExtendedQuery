import Vue from "vue";
import Router from "vue-router";
import Home from "components/home";
import IP from "components/ip";
import Url from "components/url";
import Domain from "components/domain";
import Hash from "components/hash";
Vue.use(Router);
const router = new Router({
  routes: [
    {
      path: "/", // 默认进入路由
      redirect: "/ip" //重定向
    },
    {
      path: "/home",
      name: "home",
      component: Home
    },
    {
      path: "/ip",
      name: "ip",
      component: IP
    },
    {
      path: "/url",
      name: "url",
      component: Url
    },
    {
      path: "/domain",
      name: "domain",
      component: Domain
    },
    {
      path: "/hash",
      name: "hash",
      component: Hash
    }
  ]
});
export default router;
