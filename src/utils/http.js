//导入axios
import axios from 'axios';
import Vue from 'vue';

import router from '../router';
//全局配置
axios.defaults.baseURL = 'http://localhost:3000/api'

//请求拦截器
axios.interceptors.request.use(function(config){
  if(config.url != '/userLogin'){
    //设置请求头
    let userInfo = JSON.parse(localStorage.getItem('userInfo')||'{}')
    let token = userInfo.token
    config.headers.authorization = token
  }
  return config
})

//响应拦截器
axios.interceptors.response.use(function (response) {
  //登录过期 返回 403 就跳转到登录页
  if(response.data.code == 403){
    router.push('/login')
  }
    return response.data
  })

//将axios挂载到vue原型上
Vue.prototype.$http = axios

//导出
export default axios

