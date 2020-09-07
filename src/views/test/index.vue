<template>
  <div>
    <div>
      <el-button
        v-for="(item, index) in list"
        :key="index"
        @click="setActive(item.id)"
        :type="item.id === checkedId ? 'primary' : ''"
        >{{ item.text }}</el-button
      >
    </div>
    <div class="block">
      <!-- v-if每次执行，div 组件就会重新加载，假如里边有函数请求，也会初始化执行 -->
      <div v-if="checkedId === 0">块11111111111111</div>
      <div v-if="checkedId === 1">块22222222222222</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "test",
  props: {},
  data() {
    return {
      list: [
        { text: "选项1", id: 0 },
        { text: "选项2", id: 1 },
      ],
      checkedId: 0,
    };
  },
  computed: {},
  watch: {},
  methods: {
    // 设置选中
    setActive(id) {
      this.checkedId = id;
    },
  },
};
</script>

<style lang="less" scoped>
.block {
  > div {
    width: 100%;
    height: 400px;
    border: 1px solid #ccc;
  }
}
</style>
