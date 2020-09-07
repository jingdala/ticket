<template>
  <div class="edit_basic">
    <!-- 编辑角色弹框 -->
    <el-dialog title="添加/修改系统人员" :visible.sync="dialogVisible">
      <el-form ref="formRef" :model="form" :rules="rules">
        <el-form-item label="角色名称" :label-width="formLabelWidth" prop="name">
          <el-input v-model="form.name" style="width: 400px;"></el-input>
        </el-form-item>
        <el-form-item label="编码" :label-width="formLabelWidth" prop="code">
          <el-input v-model="form.code" :disabled="this.isEdit" style="width: 400px;"></el-input>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer" v-loading="loading">
        <el-button @click="handleDialogVisible">取 消</el-button>
        <el-button type="primary" @click="handleSubmit">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import * as API from "@/axios/api";

export default {
  name: "AddRole",
  props: {
    getList: {
      type: Function,
    },
  },
  components: {},
  filters: {},
  data() {
    return {
      dialogVisible: false,
      form: {
        name: "",
        code: "",
      },
      rules: {
        name: [{ required: true, message: "请输入角色名称", trigger: "blur" }],
        code: [{ required: true, message: "请输入编码", trigger: "blur" }],
      },
      formLabelWidth: "120px",
      isEdit: false,
      loading: false,
    };
  },
  created() {},
  methods: {
    /**
     * 请求函数 *
     */
    // 新增/编辑角色
    addRole(params) {
      this.loading = true;
      let request = this.isEdit
        ? API.EditSystemRoleData
        : API.InsertSystemRoleData;
      request(params).then((res) => {
        this.loading = false;
        if (res.data.msg === "200") {
          console.log(res);
          this.handleDialogVisible();
          this.getList();
        }
      });
    },
    /**
     * 功能函数 *
     */
    // 点击提交
    handleSubmit() {
      this.$refs.formRef.validate((valid) => {
        if (valid) {
          let params = {
            role_name: this.form.name,
            role_code: this.form.code,
          };
          this.addRole(params);
        }
      });
    },
    /**
     * 监听弹框唤起
     * @param {object} item 票类参数
     */
    handleDialogVisible(item) {
      this.dialogVisible = !this.dialogVisible;
      this.isEdit = false;
      if (item && this.dialogVisible) {
        this.isEdit = true;
        this.form = {
          name: item.role_name,
          code: item.role_code,
        };
      }
    },
  },
};
</script>
<style lang="less"></style>
