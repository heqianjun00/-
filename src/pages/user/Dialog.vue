<template>
  <div>
    <el-dialog
      :title="this.info.isAdd ? '新增' : '编辑'"
      :visible.sync="info.isShow"
      @close="clear"
    >
      <el-divider></el-divider>
      <el-form :model="form" ref="form" label-width="120px">
       <el-form-item label="角色" >
      <el-select v-model="form.roleid" placeholder="请选择角色">
        <el-option v-for='item in roleList' :key="item.id" :label="item.rolename" :value="item.id"></el-option>
      </el-select>
    </el-form-item>
        <el-form-item label="账号" prop="username">
          <el-input v-model="form.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input type="password" v-model="form.password" autocomplete="off" :placeholder="info.isAdd?'请输入密码':'密码为空表示不修改'"></el-input>
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
import { mapState, mapActions } from "vuex";
import { editUser, addUser } from "../../request/user";
export default {
  props: ["info",'params'],
  data() {
    return {
      form: {
        roleid: "",
        username: "",
        password:'',
        status: 1,
      },
      defaultProps: {
        children: "children",
        label: "title",
      },
    };
  },
  computed: {
    ...mapState({ roleList: (state) => state.role.roleList }),
  },
  created() {
    this.getRoleListAction();
  },
  methods: {
    ...mapActions("user", ["getUserListAction"]),
    ...mapActions("role", ["getRoleListAction"]),
    submit(form) {
    
      this.$refs[form].validate((valid) => {
        if (valid) {
          //如果是isAdd是true就是新增，否则就是编辑
          if (this.info.isAdd) {
            addUser(this.form).then((res) => {
              if (res.code == 200) {
                //弹出成功的提示信息
                this.$message({
                  showClose: true,
                  message: res.msg,
                  type: "success",
                });
                //刷新列表
                this.getUserListAction(this.params);
                //添加成功后，隐藏弹框
                this.info.isShow = false;
              } 
            });
          } else {
            editUser(this.form).then((res) => {
              if (res.code == 200) {
                //弹出成功的提示信息
                this.$message({
                  showClose: true,
                  message: res.msg,
                  type: "success",
                });
                //刷新列表
                this.getUserListAction(this.params);
                //编辑成功后，隐藏弹框
                this.info.isShow = false;
              } else {
                //弹出错误的提示信息
                this.$message({
                  showClose: true,
                  message: res.msg,
                  type: "error",
                });
              }
            });
          }
        } else {
          return false;
        }
      });
    },
    //弹框消失后重置弹框中输入的数据
    clear() {
      this.form = {
         roleid: "",
        username: "",
        password:'',
        status: 1,
      };
    },

    //接收Index传过来的数据
    dialog(val) {
      //这里赋值时用一下浅拷贝
      this.form = { ...val };
      this.form.password = ''
    },
  },
  components: {},
};
</script>
<style scoped>
</style>