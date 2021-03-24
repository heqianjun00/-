<template>
 <div>
     <el-card> 
          <el-button type="primary" @click="showDialog"><i class="el-icon-circle-plus"></i> 新增</el-button>
           <el-divider></el-divider>
           <Table :info='info'  @setForm="setForm"/>
           <Dialog :info='info' ref="dialog"/>
     </el-card>
 </div>
</template>

<script>
import Table from './Table';
import Dialog from './Dialog';
export default {
 data(){
 return{
        info:{
         isShow:false, //显示弹框
         isAdd:true // 新增
     },
     form:{}
 }
 },
 created(){},
 methods:{
       showDialog(){
         this.info.isShow = true
         this.info.isAdd = true
     },
       setForm(val){
         //数据传给Dialog  通过ref调用Dialog下面的方法dialog()进行传值
         this.$refs.dialog.dialog(val)
     }
 },
 components:{
     Table,Dialog
 }
}

</script>
<style scoped>
</style>