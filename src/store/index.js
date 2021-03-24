/* 
  vuex状态管理，用来接收和
  传递数据
*/


//导入
import Vuex from 'vuex';
import Vue from 'vue';

//导入menu子模块
import menu from './modules/menu';
import role from './modules/role';
import user from './modules/user';
import member from './modules/member';
import seck from './modules/seck';
import cate from './modules/cate';
import specs from './modules/specs';
import banner from './modules/banner';
import goods from './modules/goods';
//注册
Vue.use(Vuex)

//创建数据存储对象
let store = new Vuex.Store({
    state:{},
    mutations:{},
    getters:{},
    actions:{},
    modules:{
        menu,role,user,member,seck,cate,specs,banner,goods
    }
})

//导出

export default store
