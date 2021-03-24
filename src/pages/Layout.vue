<template>
 <div>
    <el-container>
         
        <el-aside :width="this.isShow?'60px':'226px'">
            <h1 class="logo">小U商城后台</h1>
            <!-- :default-active="this.$route.path" 当页面刷新时，保持原来选中的页面 -->
            <el-menu
            :default-active="$route.path"
            class="el-menu-vertical-demo"
            background-color="#333"
            text-color="#fff"
            :collapse-transition="false"
            :collapse="this.isShow"
            :unique-opened = 'true'
            active-text-color="#ffd04b"
            :router='true'
            >
           
                <el-menu-item index="/home">
                    <i class="el-icon-menu"></i>
                    <span slot="title">管理中心</span>
                </el-menu-item>
                <div v-for="(item,index) in menus" :key="item.id">
                    <el-submenu :index="String(index)" v-if="item.type == 1">
                        <template slot="title">
                        <i :class="item.icon"></i>
                        <span>{{item.title}}</span>
                        </template>
                        <el-menu-item v-for="item1 in item.children" :key="item1.id" :index="item1.url">
                            <template slot="title">
                            <span>{{item1.title}}</span>
                            </template>
                        </el-menu-item>
                    </el-submenu>
                    <el-menu-item :index="item.url" v-else>
                    <i :class="item.ico"></i>
                    <span slot="title">{{item.title}}</span>
                </el-menu-item>
                </div>
            </el-menu>
        </el-aside>
        <el-container>
            <el-header>
                <div class="header-left">
                     <el-button  @click="toggle" type="primary" size="mini" class="btn"><i class="el-icon-s-fold"></i></el-button>
                     <el-breadcrumb separator="/">
                        <el-breadcrumb-item :to="{ path: '/' }">管理中心</el-breadcrumb-item>
                        <el-breadcrumb-item>{{this.$route.meta.title}}</el-breadcrumb-item>
                    </el-breadcrumb>
                </div>
                <div class="header-right">
                    <el-dropdown
                    size="medium"
                    >
                        <span class="el-dropdown-link">
                            {{userId}}
                            <i class="el-icon-arrow-down el-icon--right"></i>
                        </span>
                        <el-dropdown-menu slot="dropdown" class="personMsg">
                            <el-dropdown-item ><i class="el-icon-user"></i>个人信息</el-dropdown-item>
                            <el-dropdown-item @click.native='fullScreen'><i class="el-icon-full-screen"></i>全屏预览</el-dropdown-item>
                            <el-dropdown-item @click.native='exit'><i class="el-icon-switch-button"></i>安全退出</el-dropdown-item>
                        </el-dropdown-menu>
                        </el-dropdown>
                </div>
            </el-header>
            <el-main>
                <router-view></router-view>
            </el-main>
        </el-container>
    </el-container>
 </div>
</template>

<script>
//导入screenfull插件
import screenfull from 'screenfull';
export default {
 data(){
 return{
     isShow:false,
     userId:'',
     menus:[]
 }
 },
 created(){
     this.userId = JSON.parse(localStorage.getItem('userInfo'|| '{}')).username
     let userInfo = JSON.parse(localStorage.getItem('userInfo'|| '{}'))
     this.menus = userInfo.menus
     console.log(userInfo);
 },
 methods:{
     toggle(){
         this.isShow = !this.isShow
     },
    
    //全屏预览
    fullScreen(){
        screenfull.toggle()
    },
    //安全退出
     exit(){
         localStorage.removeItem('userInfo')
         this.$router.push('/login')
     }
 },
 components:{}
}

</script>
<style scoped>
.el-header{
    background-color: #fff;
    color: #333;
    text-align: center;
    line-height: 60px;
    display: flex;
    justify-content: space-between;
    box-shadow: 0 0 3px #000;
    z-index: 3;
  }
  
  .el-aside {
    background-color: #333;
    color: #fff;
    line-height: 200px;
  }
  
  .el-main {
    background-color: #E9EEF3;
    color: #333;
  }
  
  .el-container {
    height: 100vh;
    
  }
  .logo{
      width: 100%;
      height: 60px;
      background-color: #666;
      text-align: center;
      line-height: 60px;
      color: #fff;
      font-size: 30px;
      letter-spacing: 5.5px;/* 字体间距 */
      white-space: nowrap;
  }
.el-menu {
    border: none;
}

 .el-dropdown-link {
    cursor: pointer;
    color: #000;
  }
  .el-icon-arrow-down {
    font-size: 12px;
  }
  .header-left{
      display: flex;
      align-items: center;
      
  }
   .header-left .btn{
       margin-right: 10px;
   }
</style>