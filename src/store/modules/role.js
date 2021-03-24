/* 
    {getMenuList} 解构出../../request/menu里面的方法：getMenuList()
    然后就可以直接使用这个方法了，这个方法是axios请求菜单列表数据
*/

import {getRoleList} from '../../request/role';

//角色请求的状态管理子模块
export default{
    namespaced:true,
    state(){
        return{
            roleList:[] //存储角色列表数据
        }
    },
    //mutations是用来改变state里面的数据的，state里面的数据
    //只有mutations才能改变
    mutations:{
        //初始化角色列表
        roleInit(state,data){
            state.roleList = data
        }
    },
    actions:{
        //请求角色数据
        getRoleListAction({commit}){
            //使用getRoleList()方法，请求数据
            getRoleList().then(res=>{
                commit('roleInit',res.list)
            })
        }
    }
}