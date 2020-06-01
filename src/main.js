//main.js才是项目中的主入口
import 'babel-polyfill';
import Vue from 'vue'
import App from './App'
import router from './router'

import VueLazyload from 'vue-lazyload';
import 'assets/scss/index.scss';
import 'swiper/dist/css/swiper.css';

Vue.use(VueLazyload,{
preLoad:1,//表示还没有多少的时候就加载了
error:require('assets/img/error.png'),//失败的时候
loading:require('assets/img/loading.gif'),//成功的时候
attempt:1//尝试加载几次
});
Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
