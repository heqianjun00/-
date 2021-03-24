<template>
  <div class="login-container">
    <div class="login-box">
        <h3>小U商城后台管理</h3>
      <el-form
        :model="loginForm"
        :rules="rules"
        ref="loginForm"
        class="demo-ruleForm"
      >
        <el-form-item  prop="username">
          <el-input
            type="text"
            v-model="loginForm.username"
            autocomplete="off"
          >
           <template slot="prepend"><i class="el-icon-user-solid"></i></template>
          </el-input>
        </el-form-item>
        <el-form-item  prop="password">
          <el-input
            type="password"
            v-model="loginForm.password"
            autocomplete="off"
            show-password
          >
           <template slot="prepend"><i class="el-icon-lock"></i></template>
           </el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('loginForm')"
           class="login-btn" >提交</el-button
          >
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
//导入user.js  
import {userLogin} from '../request/user'; //{userLogin}  解构出user.js中的userLogin方法
export default {
 data() {
      return {
        loginForm: {
          username:'admin',
          password:'admin888'
        },
        rules: {
         username: [
            { required: true, message: '请输入用户名', trigger: 'blur' },
            { min: 2, max: 5, message: '长度在 2 到 5 个字符', trigger: 'blur' }
          ],
         password: [
            { required: true, message: '请输入密码', trigger: 'blur' },
          ],
        }
      };
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
             userLogin(this.loginForm).then(res=>{
                 //判断后端返回来的状态是否是200
                if(res.code == 200){
                    //把后端传回来的数据存储到本地
                    localStorage.setItem('userInfo',JSON.stringify(res.list))
                    //跳转到首页
                    this.$router.push('/')
                    //弹出登录成功的提示信息
                    this.$message({
                        showClose: true,
                        message: res.msg,
                        type: 'success'
                    });
                }else{
                    //弹出登录错误的提示信息
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
    }
  }
</script>
<style scoped>
.login-container {
  width: 100%;
  height: 100vh;
  background: url(../assets/imgs/bg.png);
  display: flex;
  justify-content: center;
  align-items: center;
}
.login-box{
    width: 500px;
    height: 400px;
    border-radius: 10px;
    background: rgba(0,0,0,0.4);
    padding: 30px;
}
.login-box h3{
    text-align: center;
    margin: 40px 0;
    color: skyblue;
}
.login-btn{
    width: 100%;
}
</style>