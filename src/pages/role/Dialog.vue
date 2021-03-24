<template>
  <div>
    <el-dialog
      :title="this.info.isAdd ? '新增' : '编辑'"
      :visible.sync="info.isShow"
      @close="clear"
    >
      <el-divider></el-divider>
      <el-form :model="form" ref="form" label-width="120px" :rules="rules">
        <el-form-item label="角色名称" prop="rolename">
          <el-input v-model="form.rolename" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="角色权限" prop="menus">
          <el-tree
            :data="menuList"
            show-checkbox
            default-expand-all
            node-key="id"
            ref="tree"
            highlight-current
            :props="defaultProps"
          >
          </el-tree>
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
import { editRole, addRole } from "../../request/role";
export default {
  props: ["info"],
  data() {
    return {
      form: {
        rolename: "",
        menus: "",
        status: "",
      },
      defaultProps: {
        children: "children",
        label: "title",
      },
      rules: {
        rolename: [
          { required: true, message: "请选择角色名称", trigger: "blur" },
        ],
        status: [{ required: true, message: "请选择状态", trigger: "blur" }],
      },
    };
  },
  computed: {
    ...mapState({ menuList: (state) => state.menu.menuList }),
  },
  created() {
    this.getMenuListAction();
  },
  methods: {
    ...mapActions("menu", ["getMenuListAction"]),
    ...mapActions("role", ["getRoleListAction"]),
    submit(form) {
      /* console.log(this.$refs.tree.getCheckedKeys(),this.form); */
      /*      this.$refs.tree.getCheckedKeys():
         若节点可被选择（即 show-checkbox 为 true），
         则返回目前被选中的节点的 key 所组成的数组 */

      this.$refs[form].validate((valid) => {
        if (valid) {
          this.form.menus = this.$refs.tree.getCheckedKeys().join(",");
          //如果是isAdd是true就是新增，否则就是编辑
          if (this.info.isAdd) {
            addRole(this.form).then((res) => {
              if (res.code == 200) {
                //弹出成功的提示信息
                this.$message({
                  showClose: true,
                  message: res.msg,
                  type: "success",
                });
                //刷新列表
                this.getRoleListAction();
                //添加成功后，隐藏弹框
                this.info.isShow = false;
              } 
            });
          } else {
            editRole(this.form).then((res) => {
              if (res.code == 200) {
                //弹出成功的提示信息
                this.$message({
                  showClose: true,
                  message: res.msg,
                  type: "success",
                });
                //刷新列表
                this.getRoleListAction();
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
        rolename: "",
        menus: "",
        status: "",
      };
      //单独清空menus
      this.$refs.tree.setCheckedKeys([]);
    },

    //接收Index传过来的数据
    dialog(val) {
      //这里赋值时用一下浅拷贝
      this.form = { ...val };
      this.$nextTick(() => {
        this.$refs.tree.setCheckedKeys(this.form.menus.split(","));
      });
    },
  },
  components: {},
};
</script>
<style scoped>
</style>