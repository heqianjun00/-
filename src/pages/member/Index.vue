<template>
 <div>
     <el-card> 
           <el-divider></el-divider>
           <Table :info='info' :params='params' @setForm="setForm"/>
           <Dialog :info='info' :params='params'  ref="dialog"/>
           <el-divider></el-divider>
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
     },
     form:{},
     params:{
         page:1,
         size:10
     }
 }
 },
 created(){},
 methods:{
       showDialog(){
         this.info.isShow = true
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