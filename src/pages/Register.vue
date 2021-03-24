<template>
 <div class="container">
     <el-card shadow='hover'>
         <h2>小U商城会员注册</h2>
         <el-form
        :model="registerForm"
        :rules="rules"
        ref="registerForm"
        class="demo-ruleForm"
      >
        <el-form-item  prop="nickname">
          <el-input
            type="text"
            v-model="registerForm.nickname"
            autocomplete="off"
            placeholder="请输入昵称"
          >
           <template slot="prepend"><i class="el-icon-user-solid"></i></template>
          </el-input>
        </el-form-item>
        <el-form-item  prop="phone">
          <el-input
            type="text"
            v-model="registerForm.phone"
            autocomplete="off"
            placeholder="请输入手机号码"
          >
           <template slot="prepend"><i class="el-icon-phone"></i></template>
          </el-input>
        </el-form-item>
        <el-form-item  prop="password">
          <el-input
            type="password"
            v-model="registerForm.password"
            autocomplete="off"
            show-password
            placeholder="请输入密码"
          >
           <template slot="prepend"><i class="el-icon-lock"></i></template>
           </el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('registerForm')"
           class="register-btn" >注册</el-button
          >
        </el-form-item>
      </el-form>
     </el-card>
 </div>
</template>

<script>
import {register} from '../request/user';
export default {
 data(){
 return{
      registerForm: {
          phone:'',
          nickname:'',
          password:''
          
        },
        rules: {
         nickname: [
            { required: true, message: '请输入昵称', trigger: 'blur' },
          ],
          phone: [
            { required: true, message: '请输入电话号码', trigger: 'blur' },
          ],
         password: [
            { required: true, message: '请输入密码', trigger: 'blur' },
          ],
        }
 }
 },
 created(){},
 methods:{
     submitForm(registerForm) {
        this.$refs[registerForm].validate((valid) => {
          if (valid) {
             register(this.registerForm).then(res=>{
                 //判断后端返回来的状态是否是200
                if(res.code == 200){
                    //弹出注册成功的提示信息
                    this.$message({
                        showClose: true,
                        message: res.msg,
                        type: 'success'
                    });
                }else{
                    //弹出注册错误的提示信息
                    this.$message({
                        showClose: true,
                        message: res.msg,
                        type: 'error'
                    });
                }
             })
          } else {
            return false;
          }
        });
      }, 
 },
 components:{}
}

</script>
<style scoped>
.container{
        width: 100%;
        height: 100vh;
        background: url(../assets/imgs/bg.png);
        display: flex;
        justify-content: center;
        align-items: center;
}
.el-card{
    border: none;
    background: rgba(0,0,0,0.4);
    width: 500px;
    height: 400px;
}
h2{
    color: #fff;
    margin: 40px 0;
    text-align: center;
    letter-spacing: 5px;
    font-weight: 400;
}
.register-btn{
    width: 100%;
}
</style>