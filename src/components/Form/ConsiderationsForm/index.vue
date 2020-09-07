<template>
  <div class="considerations">
    <!-- 注意事项form组件 -->
    <div class="other_list" v-for="(item, index) in considerationsList" :key="index">
      <el-input v-model="item.value" style="width: 400px;margin-right: 10px;"></el-input>
      <el-button icon="el-icon-minus" @click="removeOtherItem(index)" v-if="index > 0"></el-button>
      <el-button
        icon="el-icon-plus"
        @click="addOtherItem"
        v-if="index === 0 && considerationsList.length < 5"
      ></el-button>
    </div>
  </div>
</template>

<script>
import * as API from "@/axios/api";

// 注意事项需要传给后台的字段
const otherListArrt = [
  "precautions_one",
  "precautions_two",
  "precautions_three",
  "precautions_four",
  "precautions_five",
];

export default {
  name: "ConsiderationsForm",
  props: {
    onchange: {
      type: Function,
    },
    propsList: {
      type: Object,
    },
  },
  data() {
    return {
      considerationsList: [
        {
          value: "",
        },
      ],
    };
  },
  watch: {
    // 监听父组件的传值
    propsList: {
      handler(newValue, oldValue) {
        if (newValue === oldValue) {
          return;
        }
        let list = [];
        otherListArrt.forEach((el) => {
          if (newValue[el]) {
            list.push({
              value: newValue[key],
            });
          }
        });
        if (list.length > 0) {
          this.considerationsList = list;
        }
      },
    },
    // 深度监听数组类型的值变化
    considerationsList: {
      handler(newValue, oldValue) {
        if (newValue === oldValue) {
          return;
        }
        let data = {};
        newValue.forEach((el, i) => {
          let key = otherListArrt[i];
          data[key] = el.value;
        });
        this.onchange(data);
      },
      deep: true,
    },
  },
  methods: {
    /**
     * 请求函数 *
     */

    /**
     * 功能函数 *
     */
    // 添加注意事项
    addOtherItem() {
      this.considerationsList.push({ value: "" });
    },
    // 删除注意事项
    removeOtherItem(index) {
      this.considerationsList.splice(index, 1);
    },
  },
};
</script>
<style lang="less" scope>
.other_list {
  margin-bottom: 10px;
}
</style>
