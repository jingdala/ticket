<template>
  <div class="column-num">
    <div class="column_chart" style="width:50%;height:450px">
      <div id="column1" style="width:100%;height:450px"></div>
    </div>
    <div class="column_chart" style="width:50%;height:450px">
      <div id="column2" style="width:100%;height:450px"></div>
    </div>
    <div class="column_chart" style="width:50%;height:450px">
      <div id="column3" style="width:100%;height:450px"></div>
    </div>
    <div class="column_chart" style="width:50%;height:450px">
      <div id="column4" style="width:100%;height:450px"></div>
    </div>
  </div>
</template>
<script>
import echarts from "echarts";
export default {
  data() {
    return {
      option1: {
        title: {
          text: "预约到访统计",
          left: "center",
          top: 20,
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow",
          },
        },
        toolbox: {
          show: true,
          feature: {
            saveAsImage: {},
          },
        },
        xAxis: {
          type: "category",
          axisLabel: {
            formatter: "{value}",
          },
          data: ["团队", "个人"],
        },
        yAxis: {
          type: "value",
          axisLabel: {
            formatter: function (value) {
              return "{" + value + "| }\n{value|" + value + "}";
            },
            margin: 20,
            rich: {
              value: {
                lineHeight: 30,
                align: "center",
              },
            },
          },
        },
        series: [
          {
            barWidth: 50,
            name: "预约数量",
            type: "bar",
            data: [165, 170, 30],
            markPoint: {
              symbolSize: 1,
              symbolOffset: [0, "50%"],
              label: {
                formatter: "{a|{a}\n}{b|{b} }{c|{c}}",
                backgroundColor: "rgb(242,242,242)",
                borderColor: "#aaa",
                borderWidth: 1,
                borderRadius: 4,
                padding: [4, 10],
                lineHeight: 26,
                position: "right",
                distance: 20,
                rich: {
                  a: {
                    align: "center",
                    color: "#fff",
                    fontSize: 18,
                    textShadowBlur: 2,
                    textShadowColor: "#000",
                    textShadowOffsetX: 0,
                    textShadowOffsetY: 1,
                    textBorderColor: "#333",
                    textBorderWidth: 2,
                  },
                  b: {
                    color: "#333",
                  },
                  c: {
                    color: "#ff8811",
                    textBorderColor: "#000",
                    textBorderWidth: 1,
                    fontSize: 22,
                  },
                },
              },
            },
          },
          {
            barWidth: 50,
            name: "到访数量",
            type: "bar",
            data: [150, 105, 110],
          },
        ],
      },
    };
  },
  mounted() {
    var myChart = echarts.init(document.getElementById("column1"));
    // var myChart1 = echarts.init(document.getElementById("main3"));
    myChart.setOption(this.option1);
    // myChart1.setOption(this.option2);
  },
};
</script>
<style scoped lang="less">
.column-num {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  .column_chart {
    position: relative;
    background-color: #fff;
  }
  .column_chart:nth-of-type(odd) {
    margin-right: 20px;
  }
}
</style>