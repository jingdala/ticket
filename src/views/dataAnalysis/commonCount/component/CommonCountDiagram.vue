<template>
  <div class="charts">
    <div id="main1"></div>
    <div class="select">
      <el-select v-model="value" placeholder="请选择">
        <el-option
          v-for="item in options1"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>
      <el-select v-model="value1" placeholder="请选择">
        <el-option
          v-for="item in options2"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>
    </div>
  </div>
</template>
<script>
import echarts from "echarts";
export default {
  data() {
    return {
      options: {
        title: [
          {
            text: "到访游客人数统计",
            subtext: "统计单位:天、周、月",
            left: "center",
          },
        ],
        tooltip: {
          trigger: "axis",
          formatter: "{a} <br/>{b} : {c}",
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "10%",
          containLabel: true,
        },
        xAxis: {
          type: "category",
          data: [
            "2020-07-09",
            "2020-07-17",
            "2020-07-18",
            "2020-07-25",
            "2020-08-01",
            "2020-08-09",
            "2020-08-15",
          ],
        },
        yAxis: {
          type: "value",
        },
        series: [
          {
            data: [10, 32, 55, 43, 87, 113, 123],
            type: "line",
            smooth: true,
          },
        ],
      },
      options1: [
        { value: "选项1", label: "天" },
        { value: "选项2", label: "周" },
        { value: "选项3", label: "月" },
      ],
      options2: [
        { value: "选项1", label: "近七天" },
        { value: "选项2", label: "近一月" },
        { value: "选项3", label: "近三月" },
        { value: "选项4", label: "近半年" },
        { value: "选项5", label: "近一年" },
      ],
      value1: "",
      value: "",
    };
  },
  created() {
    this.value = this.options1[0].value;
    this.value1 = this.options2[0].value;
  },
  mounted() {
    var myChart = echarts.init(document.getElementById("main1"));
    myChart.setOption(this.options);
  },
};
</script>
<style lang="less" scoped>
.charts {
  position: relative;
  #main1 {
    height: 300px;
    background: #fff;
    margin-top: 20px;
    width: 100%;
  }
  .select {
    position: absolute;
    right: 20px;
    top: 5px;
    // width: 92px;
    height: 32px !important;
    .el-select {
      width: 92px;
      margin: 0 2px;
      .el-input__inner {
        height: 32px !important;
      }
    }
  }
}
</style>