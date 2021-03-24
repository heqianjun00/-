<template>
 <div>
     <el-dialog
      title="编辑"
      :visible.sync="info.isShow"
      @close="clear"
    >
      <el-divider></el-divider>
      <el-form :model="form" ref="form" label-width="120px">
        <el-form-item label="会员编号" prop="uid">
          <el-input v-model="form.uid" autocomplete="off" disabled></el-input>
        </el-form-item>
         <el-form-item label="昵称" prop="nickname">
          <el-input v-model="form.nickname" autocomplete="off"></el-input>
        </el-form-item>
         <el-form-item label="手机号" prop="phone">
          <el-input v-model="form.phone" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input type="password" v-model="form.password" autocomplete="off" ></el-input>
        </el-form-item>
        <el-form-item label="状态" prop="status">
          <el-radio-group v-model="form.status">
            <el-radio :label="1">正常</el-radio>
            <el-radio :label="2">禁用</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="info.isShow = false">取 消</el-button>
        <el-button type="primary" @click="submit('form')">提 交</el-button>
      </div>
    </el-dialog>
 </div>
</template>

<script>
import { mapActions } from 'vuex';
import {editMember} from '../../request/user';
export default {
props:['info'],
 data(){
 return{
     form:{
         uid:'',
         nickname:'',
         phone:'',
         password:'',
         status:1
     }
 }
 },
 created(){},
 methods:{
   ...mapActions('member',['getMemberListAction']),
   submit(form){
     this.$refs[form].validate((valid)=>{
        if(valid){
          editMember(this.form).then(res=>{
            if(res.code == 200){
               //弹出成功的提示信息
                this.$message({
                    showClose: true,
                    message: res.msg,
                    type: 'success'
                  });
                  //刷新列表
                  this.getMemberListAction()
                  //添加成功后，隐藏弹框
                  this.info.isShow = false
            }else{
               //弹出错误的提示信息
                this.$message({
                    showClose: true,
                    message: res.msg,
                    type: 'error'
                });
            }
          })
        }else{
          return false;
        }
     })
   },
     clear(){},
     //接收Index传过来的数据
    dialog(val){
      //这里赋值时用一下浅拷贝
      this.form = {...val}
    }
 },
 components:{}
}

</script>
<style scoped>
</style>