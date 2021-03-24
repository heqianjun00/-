
import {getCateList} from '../../request/cate';

//菜单请求的状态管理子模块
export default{
    namespaced:true,
    state(){
        return{
            cateList:[] //存储菜单列表数据
        }
    },
    //mutations是用来改变state里面的数据的，state里面的数据
    //只有mutations才能改变
    mutations:{
        //初始化菜单列表
        cateInit(state,data){
            state.cateList = data
        }
    },
    actions:{
        //请求菜单数据
        getCateListAction({commit}){
            //使用getCateList()方法，请求数据
            getCateList().then(res=>{
                commit('cateInit',res.list)
            })
        }
    }
}