

import {getGoodsList,goodsCount,getSpecs} from '../../request/goods';


export default{
    namespaced:true,
    state(){
        return{
            goodsList:[] ,//
            goodsCount:0, // 
            

        }
    },
    //mutations是用来改变state里面的数据的，state里面的数据
    //只有mutations才能改变
    mutations:{
       
        goodsInit(state,data){
            state.goodsList = data
        },
        setGoodsCount(state,data){
            state.goodsCount = data
        },
       
    },
    actions:{
        getGoodsListAction({commit,dispatch},params){
            getGoodsList(params).then(res=>{
                commit('goodsInit',res.list)
                dispatch('getGoodsCountAction')
            })
            
        },
        getGoodsCountAction({commit}){
            goodsCount().then(res=>{
                commit('setGoodsCount',res.list[0].total)
               
            })
        }
    }
}