import Vue from 'vue'
import Router from 'vue-router'
import Layout from '../pages/Layout.vue';
import Login from '../pages/Login.vue';
import Mune from '../pages/mune/Index.vue';
import User from '../pages/user/Index.vue';
import Role from '../pages/role/Index.vue';
import Register from '../pages/Register.vue';
import Member from '../pages/member/Index.vue';
import Seck from '../pages/seck/Index.vue';
import Home from '../pages/home/Index.vue';
import Cate from '../pages/cate/Index.vue';
import Specs from '../pages/spces/Index.vue';
import Banner from '../pages/banner/Index.vue';
import Goods from '../pages/goods/Index.vue';
import Nofind from '../pages/Nofind.vue';

//导入进度条插件
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

Vue.use(Router)

let router =  new Router({
  routes: [
    {
      path: '/',
      name: 'Layout',
      component: Layout,
      meta:{
        title:'小U后台管理系统'
      },
      redirect:'/home',
      children:[
        {
          path:'/home',
          name:'Home',
          component:Home,
          meta:{
            title:'首页'
          }
        },
        {
          path:'/menu',
          name:'Mune',
          component:Mune,
          meta:{
            title:'菜单管理'
          }
        },
        {
          path:'/role',
          name:'Role',
          component:Role,
          meta:{
            title:'角色管理'
          }
        },
          {
            path:'/admin',
            name:'User',
            component:User,
            meta:{
              title:'管理员管理'
            }
        },
            {
              path:'/category',
              name:'Cate',
              component:Cate,
              meta:{
                title:'商品分类'
              }
          },
          {
            path:'/specs',
            name:'Specs',
            component:Specs,
            meta:{
              title:'商品规格'
            }
        },
        {
          path:'/goods',
          name:'Goods',
          component:Goods,
          meta:{
            title:'商品管理'
          }
      },
        {
          path:'/member',
          name:'Member',
          component:Member,
          meta:{
            title:'会员管理'
          }
        },
        {
          path:'/banner',
          name:'Banner',
          component:Banner,
          meta:{
            title:'轮播图管理管理'
          }
        },
        {
          path:'/seckill',
          name:'Seck',
          component:Seck,
          meta:{
            title:'秒杀活动'
          },
        }
      ]
    },
    {
      path:'/login',
      name:'Login',
      component:Login,
      meta:{
        title:'登录页面'
      }
    },
    {
      path:'/register',
      name:'Register',
      component:Register,
      meta:{
        title:'注册页面'
      }
    },
    {
      path:'/nofind',
      name:'Nofind',
      component:Nofind,
      meta:{
        title:'404'
      }
    }
  ]
})

//前置守卫
router.beforeEach((to,from,next)=>{
  NProgress.start()
  let userInfo = JSON.parse(localStorage.getItem('userInfo'|| '{}'))
  if(to.path != '/login'){
    if(!userInfo.token){
       return next('/login')
    }
  }

  if(to.path !='/home'&&to.path !='/login'&&to.path !='/nofind'){
    if(userInfo.menus_url.indexOf(to.path) == -1){
      return next('/nofind')
    }
  }
  document.title = to.meta.title
  next()
})
router.afterEach(() => {
  NProgress.done()
})
export default router