

import {getSeckList} from '../../request/seck';

//秒杀活动请求的状态管理子模块
export default{
    namespaced:true,
    state(){
        return{
            seckList:[] ,//存储秒杀活动列表数据

        }
    },
    //mutations是用来改变state里面的数据的，state里面的数据
    //只有mutations才能改变
    mutations:{
        seckInit(state,data){
            state.seckList = data
        },
    },
    actions:{
        //请求秒杀活动数据
        getSeckListAction({commit}){
            //使用getseckList()方法，请求数据
            getSeckList().then(res=>{
                commit('seckInit',res.list)
                /* console.log(res.list); */
            })
            
        },
    }
}