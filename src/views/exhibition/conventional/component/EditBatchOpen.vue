<template>
  <div class="edit_basic">
    <!-- 批量开馆弹框 -->
    <el-dialog title="批量开馆" :visible.sync="dialogVisible">
      <el-form :model="form" :rules="rules">
        <el-form-item
          label="开馆时间"
          :label-width="formLabelWidth"
          prop="date"
        >
          <el-date-picker
            v-model="form.date"
            type="monthrange"
            range-separator="至"
            start-placeholder="开始月份"
            end-placeholder="结束月份"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item
          label="默认票数"
          :label-width="formLabelWidth"
          prop="number"
        >
          <el-input-number
            v-model="form.number"
            :min="0"
            :max="1000"
            style="width: 400px;"
          ></el-input-number>
        </el-form-item>
        <el-form-item
          label="默认星期几闭馆"
          :label-width="formLabelWidth"
          prop="weekVal"
        >
          <el-radio-group v-model="form.weekVal">
            <!-- :label="3" -->
            <el-radio
              v-for="item in weeks"
              :key="item.value"
              :label="item.label"
              >{{ item.value }}</el-radio
            >
          </el-radio-group>
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
const weeks = [
  { value: "一", label: 1 },
  { value: "二", label: 2 },
  { value: "三", label: 3 },
  { value: "四", label: 4 },
  { value: "五", label: 5 },
  { value: "六", label: 6 },
  { value: "日", label: 7 },
  { value: "无", label: 0 },
];

export default {
  name: "EditBatchOpen",
  components: {},
  filters: {},
  data() {
    return {
      dialogVisible: false,
      form: {
        date: "",
        number: 1000,
        weekVal: 1,
      },
      rules: {
        date: [{ required: true, message: "请选择时间", trigger: "blur" }],
        weekVal: [
          { required: true, message: "请选择默认闭馆时间", trigger: "blur" },
        ],
        number: [
          { required: true, message: "请输入默认票数", trigger: "blur" },
        ],
      },
      formLabelWidth: "140px",
      weeks: weeks,
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
    handleDialogVisible() {
      this.dialogVisible = !this.dialogVisible;
    },
  },
};
</script>
<style lang="less"></style>
