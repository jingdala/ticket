<template>
  <div class="edit_basic">
    <!-- 编辑系统角色弹框 -->
    <el-dialog title="添加/修改系统角色" :visible.sync="dialogVisible">
      <el-form :model="form" :rules="rules">
        <el-form-item label="名称" :label-width="formLabelWidth" prop="name">
          <el-input v-model="form.name" style="width: 400px;"></el-input>
        </el-form-item>
        <el-form-item label="账号" :label-width="formLabelWidth" prop="account">
          <el-input v-model="form.account" style="width: 400px;"></el-input>
        </el-form-item>
        <el-form-item label="密码" :label-width="formLabelWidth" prop="password">
          <el-input v-model="form.password" style="width: 400px;"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" :label-width="formLabelWidth" prop="rePassword">
          <el-input v-model="form.rePassword" style="width: 400px;"></el-input>
        </el-form-item>
        <el-form-item label="角色" :label-width="formLabelWidth">
          <el-select v-model="form.role" placeholder="请选择角色" style="width: 400px;">
            <el-option
              v-for="item in types"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="handleDialogVisible">取 消</el-button>
        <el-button type="primary" @click="handleDialogVisible">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
const types = [{ label: "安保", value: 0 }];

export default {
  name: "AddSystemAccount",
  components: {},
  filters: {},
  data() {
    return {
      dialogVisible: false,
      form: {
        id: "",
        name: "",
        account: "",
        password: "",
        rePassword: "",
        role: 0,
      },
      rules: {
        name: [{ required: true, message: "请输入名称", trigger: "blur" }],
        account: [{ required: true, message: "请输入账号", trigger: "blur" }],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
        rePassword: [
          { required: true, message: "请再次确认密码", trigger: "blur" },
        ],
      },
      formLabelWidth: "120px",
      types: types,
    };
  },
  created() {},
  methods: {
    /**
     * 功能函数 *
     */
    /**
     * 监听弹框唤起
     * @param {object} item 票类参数
     */

    handleDialogVisible(item) {
      this.dialogVisible = !this.dialogVisible;
      if (item && this.dialogVisible) {
        this.form = item;
      }
    },
  },
};
</script>
<style lang="less"></style>
