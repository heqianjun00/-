

import {getSpecsList,specsCount,getSpecs} from '../../request/specs';

//商品规格请求的状态管理子模块
export default{
    namespaced:true,
    state(){
        return{
            specsList:[] ,//存储商品规格列表数据
            specsCount:0 ,// 商品规格
            spcesAllList:[]
        }
    },
    //mutations是用来改变state里面的数据的，state里面的数据
    //只有mutations才能改变
    mutations:{
        //初始化商品规格列表
        specsInit(state,data){
            state.specsList = data
        },
        //设置商品规格总数
        setSpecsCount(state,data){
            state.specsCount = data
        },
        setSpecsList(state,data){
            state.spcesAllList = data
        }
    },
    actions:{
        //请求商品规格数据
        getSpecsListAction({commit,dispatch},params){
            getSpecsList(params).then(res=>{
                commit('specsInit',res.list)
                dispatch('getSpecsCountAction')
            })
            
        },
        getSpecsCountAction({commit}){
            specsCount().then(res=>{
                commit('setSpecsCount',res.list[0].total)
                getSpecs(res.list[0].total).then(res=>{
                    commit('setSpecsList',res.list)
                })
            })
        }
    }
}