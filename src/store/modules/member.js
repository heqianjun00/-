

import {getMemberList} from '../../request/user';

//会员请求的状态管理子模块
export default{
    namespaced:true,
    state(){
        return{
            memberList:[] ,//存储会员列表数据

        }
    },
    //mutations是用来改变state里面的数据的，state里面的数据
    //只有mutations才能改变
    mutations:{
        //初始化会员列表
        memberInit(state,data){
            state.memberList = data
        },
    },
    actions:{
        //请求会员数据
        getMemberListAction({commit}){
            //使用getMemberList()方法，请求数据
            getMemberList().then(res=>{
                commit('memberInit',res.list)
            })
            
        },
    }
}