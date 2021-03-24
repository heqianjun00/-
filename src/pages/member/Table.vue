<template>
 <div>
     <el-table
    :data="memberList"
    stripe
    style="width:100%">
    <el-table-column
      prop="addtime"
      label="创建日期"
     >
     <template slot-scope="scope">
      {{scope.row.addtime | standardTime}}
     </template>
    </el-table-column>
    <el-table-column
      prop="nickname"
      label="昵称"
      >
    </el-table-column>
    <el-table-column
      prop="phone"
      label="手机号"
      >
    </el-table-column>
     <el-table-column
      label="操作">
      <template slot-scope="scope">
              <el-button type="success" icon="el-icon-edit" circle size="small" @click="edit(scope.row)"></el-button>
      </template>
    </el-table-column>
  </el-table>
 </div>
</template>

<script>
//vuex中的辅助函数
import {mapActions,mapState} from 'vuex';

export default {
computed:{
  ...mapState({memberList:state=>state.member.memberList})
},
props:['info'],
 data(){
 return{
     form:{
         uid:'',
         nickname:'',
         phone:'',
         password:'',
         status:1
     },
 }
 },
 created(){
     this.getMemberListAction()
 },
 methods:{
     edit(val){
         this.info.isShow = true
         //这里用子传父的方式（自定义事件），将val传个Index组件，然后Index组件再
          //传给他的子组件Dialog （这样做的目的是考虑的数据传递的安全性）
          this.$emit('setForm',val)
     },
     ...mapActions('member',['getMemberListAction'])
 },
 components:{}
}

</script>
<style scoped>
</style>