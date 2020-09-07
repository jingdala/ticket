<template>
  <div>
    <!-- 时间选择器 -->
    <el-select
      v-model="time1"
      placeholder="请选择"
      style="width: 180px;margin-right: 10px;"
    >
      <el-option
        v-for="item in times"
        :key="item.value"
        :label="item.value"
        :value="item.value"
      ></el-option> </el-select
    >至
    <el-select
      v-model="time2"
      placeholder="请选择"
      style="width: 180px;margin-left: 10px;"
    >
      <el-option
        v-for="item in times"
        :key="item.value"
        :label="item.value"
        :value="item.value"
      ></el-option>
    </el-select>
  </div>
</template>

<script>
const times = [
  { value: "09:00" },
  { value: "09:30" },
  { value: "10:00" },
  { value: "10:30" },
  { value: "11:00" },
  { value: "11:30" },
  { value: "12:00" },
  { value: "12:30" },
  { value: "13:00" },
  { value: "13:30" },
  { value: "14:00" },
  { value: "14:30" },
  { value: "15:00" },
  { value: "15:30" },
  { value: "16:00" },
  { value: "16:30" },
  { value: "17:00" },
  { value: "17:30" },
  { value: "18:00" },
];

export default {
  name: "TimesSelectForm",
  props: {
    propsValue: {
      type: Array,
    },
  },
  data() {
    return {
      times,
      time1: "9:00",
      time2: "18:00",
      timeList: ["", ""],
    };
  },
  computed: {},
  watch: {
    time1(val) {
      console.log(val);
      this.timeList[0] = val;
      this.emitInput(this.timeList);
    },
    time2(val) {
      console.log(val);
      this.timeList[1] = val;
      this.emitInput(this.timeList);
    },
    // 监听父组件的传值
    propsValue: {
      handler(newValue, oldValue) {
        console.log(newValue);
        if (newValue === oldValue || !newValue) {
          return;
        }
        if (newValue.length > 1 && newValue[0] && newValue[1]) {
          this.time1 = newValue[0];
          this.time2 = newValue[1];
        } else {
          console.log("TimesSelectForm 参数传递错误！");
        }
      },
    },
  },
  mounted() {
    // 设置默认值
    if (!this.values) {
      this.emitInput([this.time1, this.time2]);
    }
  },
  methods: {
    /**
     * 功能函数 *
     */
    // 传值给父组件
    emitInput(val) {
      this.$emit("onchange", val);
    },
  },
};
</script>

<style lang="less" scoped></style>
