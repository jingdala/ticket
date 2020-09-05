<template>
  <div class="column-num">
    <div class="column_chart">
      <div id="column1" style="width:100%;height:450px;"></div>
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
    <div class="column_chart">
      <div id="column2" style="width:100%;height:450px"></div>
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
    <div class="column_chart">
      <div id="column3" style="width:100%;height:450px"></div>
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
    <div class="column_chart">
      <div id="column4" style="width:100%;height:450px"></div>
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
            // margin: 20,
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
            barWidth: 45,
            name: "预约数量",
            type: "bar",
            data: [36, 1879],
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
            barWidth: 45,
            name: "到访数量",
            type: "bar",
            data: [7, 1155],
          },
        ],
      },
      option2: {
        title: {
          text: "展览类型统计",
          left: "center",
          top: 20,
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow",
          },
        },
        xAxis: {
          type: "category",
          axisLabel: {
            formatter: "{value}",
          },
          data: ["画展", "陶瓷"],
        },
        yAxis: {
          type: "value",
          axisLabel: {
            formatter: function (value) {
              return "{" + value + "| }\n{value|" + value + "}";
            },
            // margin: 20,
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
            barWidth: 45,
            name: "预约数量",
            type: "bar",
            data: [51, 40],
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
            barWidth: 45,
            name: "到访数量",
            type: "bar",
            data: [10, 9],
          },
        ],
      },
      option3: {
        title: {
          text: "到访游客性别、年龄统计",
          left: "center",
          top: 20,
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow",
          },
        },
        xAxis: {
          type: "category",
          axisLabel: {
            formatter: "{value}",
          },
          data: ["12以下", "12-18", "18-32", "32-48", "49-65", "65以上"],
        },
        yAxis: {
          type: "value",
          axisLabel: {
            formatter: function (value) {
              return "{" + value + "| }\n{value|" + value + "}";
            },
            // margin: 20,
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
            barWidth: 18,
            name: "总数",
            type: "bar",
            data: [29, 117, 527, 841, 345, 127],
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
            barWidth: 18,
            name: "男性",
            type: "bar",
            data: [15, 59, 264, 421, 173, 62],
          },
          {
            barWidth: 18,
            name: "女性",
            type: "bar",
            data: [14, 58, 263, 420, 172, 65],
          },
        ],
      },
      option4: {
        title: {
          text: "当天各时段到访统计",
          left: "center",
          top: 20,
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow",
          },
        },
        xAxis: {
          type: "category",
          axisLabel: {
            formatter: "{value}",
          },
          data: [
            "9:00",
            "10:00",
            "11:00",
            "12:00",
            "13:00",
            "14:00",
            "15:00",
            "16:00",
            "17:00",
          ],
        },
        yAxis: {
          type: "value",
          axisLabel: {
            formatter: function (value) {
              return value;
            },
            // margin: 20,
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
            barWidth: 45,
            name: "",
            type: "bar",
            data: [0, 0, 0, 0, 0, 0, 0, 0, 0],
            markPoint: {
              symbolSize: 1,
              symbolOffset: [0, "50%"],
              label: {
                formatter: "{a}",
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
          // {
          //   barWidth: 45,
          //   name: "到访数量",
          //   type: "bar",
          //   data: [0],
          // },
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
    var myChart = echarts.init(document.getElementById("column1"));
    var myChart1 = echarts.init(document.getElementById("column2"));
    var myChart2 = echarts.init(document.getElementById("column3"));
    var myChart3 = echarts.init(document.getElementById("column4"));
    myChart.setOption(this.option1);
    myChart1.setOption(this.option2);
    myChart2.setOption(this.option3);
    myChart3.setOption(this.option4);
  },
};
</script>
<style scoped lang="less">
.column-num {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  overflow: hidden;
  .column_chart {
    position: relative;
    width: 49%;
    height: 450px;
    background-color: #fff;
    margin-bottom: 20px;
    .select1 {
      position: absolute;
      right: 30px;
      top: 12px;
    }
  }
}
</style>