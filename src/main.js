// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import App from "./App";
import router from "./router";
import axios from "axios";
import echarts from "echarts";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import "common/family/font.css";
import "common/family/pingfang.css";
import "swiper/dist/css/swiper.min.css";
// import { dateFilter } from "common/js/dateFilter.js"; // 引入我们刚刚创建的文件
Vue.config.productionTip = false;
// axios.defaults.baseURL = "/api";
// axios.defaults.headers.post["Content-Type"] = "application/json";
Vue.use(ElementUI);
Vue.prototype.$echarts = echarts; //引入组件
Vue.prototype.$axios = axios;
// Vue.prototype.$china = china
/* eslint-disable no-new */
new Vue({
  el: "#app",
  router,
  components: { App },
  template: "<App/>"
});
