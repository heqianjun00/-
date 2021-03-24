// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
//导入和注册elementui
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);
//导入axios
import './utils/http'
//导入store
import store from './store/index';

Vue.config.productionTip = false


/* 配置一个全局图片地址头imgUrl */
Vue.prototype.$imgUrl = 'http://localhost:3000'


/* 全局过滤器,过滤时间 */
Vue.filter('standardTime', function(val){
  //Number(val) 这里传的val要先转换为Number类型
  let time = new Date(Number(val))
  return time.toLocaleDateString()
})
new Vue({
  el: '#app',
  router,
  //挂载
  store,
  components: { App },
  template: '<App/>'
})
