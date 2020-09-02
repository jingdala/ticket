<template>
  <div class="edit_basic">
    <!-- 编辑临展类型弹框 -->
    <el-dialog title="添加/修改临展类型" :visible.sync="dialogVisible">
      <el-form :model="form" :rules="rules">
        <el-form-item
          label="临展类型"
          :label-width="formLabelWidth"
          prop="type"
        >
          <el-input v-model="form.type" style="width: 400px;"></el-input>
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
  name: "EditTemporaryType",
  components: {},
  filters: {},
  data() {
    return {
      dialogVisible: false,
      form: {
        type: "",
      },
      rules: {
        type: [
          { required: true, message: "请输入临展类型名称", trigger: "blur" },
        ],
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
