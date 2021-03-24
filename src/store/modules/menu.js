/* 
    {getMenuList} 解构出../../request/menu里面的方法：getMenuList()
    然后就可以直接使用这个方法了，这个方法是axios请求菜单列表数据
*/

import {getMenuList} from '../../request/menu';

//菜单请求的状态管理子模块
export default{
    namespaced:true,
    state(){
        return{
            menuList:[] //存储菜单列表数据
        }
    },
    //mutations是用来改变state里面的数据的，state里面的数据
    //只有mutations才能改变
    mutations:{
        //初始化菜单列表
        menuInit(state,data){
            state.menuList = data
        }
    },
    actions:{
        //请求菜单数据
        getMenuListAction({commit}){
            //使用getMenuList()方法，请求数据
            getMenuList().then(res=>{
                commit('menuInit',res.list)
            })
        }
    }
}