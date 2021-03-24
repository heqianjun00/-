

import {getBannerList,bannerCount} from '../../request/banner';

export default{
    namespaced:true,
    state(){
        return{
            bannerList:[] ,
            bannerCount:0 

        }
    },
    //mutations是用来改变state里面的数据的，state里面的数据
    //只有mutations才能改变
    mutations:{
        bannerInit(state,data){
            state.bannerList = data
        },
        setBannerCount(state,data){
            state.bannerCount = data
        }
    },
    actions:{
  
        getBannerListAction({commit},params){
 
            getBannerList(params).then(res=>{
                commit('bannerInit',res.list)

            })
            
        },
    }
}