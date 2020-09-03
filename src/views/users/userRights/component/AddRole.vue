<template>
  <div class="edit_basic">
    <!-- 编辑角色弹框 -->
    <el-dialog title="添加/修改系统人员" :visible.sync="dialogVisible">
      <el-form :model="form" :rules="rules">
        <el-form-item label="角色名称" :label-width="formLabelWidth" prop="title">
          <el-input v-model="form.title" style="width: 400px;"></el-input>
        </el-form-item>
        <el-form-item label="编码" :label-width="formLabelWidth" prop="code">
          <el-input v-model="form.code" style="width: 400px;"></el-input>
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
export default {
  name: "AddRole",
  components: {},
  filters: {},
  data() {
    return {
      dialogVisible: false,
      form: {
        id: "",
        name: "",
        code: "",
      },
      rules: {
        name: [{ required: true, message: "请输入角色名称", trigger: "blur" }],
        code: [{ required: true, message: "请输入编码", trigger: "blur" }],
      },
      formLabelWidth: "120px",
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
      if (item) {
        this.form = item;
      }
    },
  },
};
</script>
<style lang="less"></style>
