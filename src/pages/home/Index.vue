<template>
 <div>
      
      <el-card>
          <el-divider></el-divider>
          <el-divider></el-divider>
         <Editor/>
     </el-card>
     <el-card>
         <Epie class="pie"/>
     </el-card>
    
     <el-card>
         <Efunnel class="funnel"/>
     </el-card>
     
 </div>
</template>

<script>
import Epie from './Epie';
import Efunnel from './Efunnel';
import Editor from './Editor';
export default {
 data(){
 return{}
 },
 created(){},
 methods:{},
 components:{
     Epie,Efunnel,Editor
 }
}

</script>
<style scoped>
.pie{
    margin: 0 auto;
}
.funnel{
    margin: 0 auto;
}
</style>