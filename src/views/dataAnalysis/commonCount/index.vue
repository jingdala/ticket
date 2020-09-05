<template>
  <div>
    <CommonCountHeader></CommonCountHeader>
    <CommonCountDiagram></CommonCountDiagram>
    <CommonCountPieChart></CommonCountPieChart>
    <CommonCountColumn></CommonCountColumn>
    <CommonCountBottom></CommonCountBottom>
  </div>
</template>
<script>
import CommonCountHeader from "./component/CommonCountHeader";
import CommonCountDiagram from "./component/CommonCountDiagram";
import CommonCountPieChart from "./component/CommonCountPieChart";
import CommonCountColumn from "./component/CommonCountColumn";
import CommonCountBottom from "./component/CommonCountBottom";
// import echarts from "echarts";
export default {
  data() {
    return {};
  },
  mounted() {},
  methods: {},
  components: {
    CommonCountHeader,
    CommonCountDiagram,
    CommonCountPieChart,
    CommonCountColumn,
    CommonCountBottom,
  },
};
</script>
<style scoped lang="less">
.div {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
  .pie {
    position: relative;
    background-color: #fff;
    .select1 {
      position: absolute;
      right: 20px;
      top: 25px;
    }
  }
  .pie:nth-of-type(1) {
    margin-right: 20px;
  }
}
</style>