

import {getUserList,userCount} from '../../request/user';

//角色请求的状态管理子模块
export default{
    namespaced:true,
    state(){
        return{
            userList:[] ,//存储管理员列表数据
            userCount:0 // 管理员总数

        }
    },
    //mutations是用来改变state里面的数据的，state里面的数据
    //只有mutations才能改变
    mutations:{
        //初始化角色列表
        userInit(state,data){
            state.userList = data
        },
        //设置管理员总数
        setUserCount(state,data){
            state.userCount = data
        }
    },
    actions:{
        //请求管理员数据
        getUserListAction({commit,dispatch},params){
            //使用getRoleList()方法，请求数据
            getUserList(params).then(res=>{
                commit('userInit',res.list)
                dispatch('getUserCountAction')
            })
            
        },
        getUserCountAction({commit}){
            userCount().then(res=>{
                commit('setUserCount',res.list[0].total)
            })
        }
    }
}