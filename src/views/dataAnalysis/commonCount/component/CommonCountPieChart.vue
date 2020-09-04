<template>
  <div class="pie_Chart">
    <div class="pie" style="width:50%;height:450px">
      <div id="main2" style="width:100%;height:450px"></div>
      <div class="select1">
        <el-select v-model="value" placeholder="请选择" style="width:92px">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </div>
    </div>
    <div class="pie" style="width:50%;height:450px">
      <div id="main3" style="width:100%;height:450px"></div>
      <div class="select1">
        <el-select v-model="value" placeholder="请选择" style="width:92px">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </div>
    </div>
  </div>
</template>
<script>
import echarts from "echarts";
export default {
  name: "CommonCountPieChart",
  data() {
    return {
      option1: {
        color: ["#BF4F4D", "#e542e2"],
        title: {
          text: "游客来源统计",
          left: "center",
          top: 40,
        },
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)",
        },
        series: [
          {
            name: "游客来源",
            type: "pie",
            radius: "55%",
            center: ["50%", "60%"],
            data: [
              { value: 0, name: "设备" },
              { value: 15, name: "pc" },
              { value: 258, name: "微信" },
            ],
          },
        ],
      },
      option2: {
        color: ["#BF4F4D", "#e542e2"],
        title: {
          text: "取票方式统计",
          left: "center",
          top: 40,
        },
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)",
        },
        series: [
          {
            name: "游客来源",
            type: "pie",
            radius: "55%",
            center: ["50%", "60%"],
            data: [
              { value: 282, name: "预约出票" },
              { value: 1620, name: "现场出票" },
            ],
          },
        ],
      },
      options: [
        { value: "选项1", label: "全部" },
        { value: "选项2", label: "近三年" },
        { value: "选项3", label: "近一年" },
        { value: "选项4", label: "近半年" },
        { value: "选项5", label: "近三月" },
        { value: "选项6", label: "近半月" },
      ],
      value: "",
    };
  },
  mounted() {
    var myChart = echarts.init(document.getElementById("main2"));
    var myChart1 = echarts.init(document.getElementById("main3"));
    myChart.setOption(this.option1);
    myChart1.setOption(this.option2);
  },
  components: {},
};
</script>
<style scoped lang="less">
.pie_Chart {
  display: flex;
  justify-content: space-between;
  margin: 20px 0;
  .pie {
    position: relative;
    background-color: #fff;
    .select1 {
      position: absolute;
      right: 20px;
      top: 25px;
    }
  }
  .pie:first-of-type {
    margin-right: 20px;
  }
}
</style>