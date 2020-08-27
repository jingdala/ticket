<template>
  <div class="aside">
    <el-menu
      :default-openeds="['1', '3']"
      background-color="rgb(84, 93, 100)"
      text-color="#fff"
      active-text-color="#2ef344"
    >
      <div :index="index + ''" v-for="(item, index) in asideList" :key="index">
        <el-submenu :index="index + ''" v-if="item.children.length > 0">
          <template slot="title">
            <i :class="item.icon"></i>
            {{item.title}}
          </template>
          <el-menu-item
            v-for="(item1, index1) in item.children"
            :key="index1"
            @click="itemClick(item1.path)"
          >
            <template slot="title">{{item1.name}}</template>
          </el-menu-item>
        </el-submenu>
        <el-menu-item v-else @click="itemClick(item.path)">
          <template slot="title">
            <i :class="item.icon"></i>
            {{item.title}}
          </template>
        </el-menu-item>
      </div>
    </el-menu>
  </div>
</template>
<script>
export default {
  name: "HomeAside",
  data() {
    return {
      // 侧边栏信息
      asideList: [
        {
          title: " 展览管理",
          icon: "el-icon-ice-cream-square",
          children: [
            { name: "常规展览", path: "/1" },
            { name: "临时展览", path: "/2" },
            { name: "临展类型", path: "/3" },
          ],
        },
        {
          title: "预约管理",
          icon: "el-icon-tickets",
          children: [],
          path: "/3",
        },
        {
          title: "用户管理",
          icon: "el-icon-user",
          children: [
            { name: "用户列表", path: "" },
            { name: "角色权限", path: "" },
            { name: "编辑角色功能", path: "" },
          ],
        },
        {
          title: "设备管理",
          icon: "el-icon-s-platform",
          children: [
            { name: "广告", path: "" },
            { name: "检票管理", path: "" },
            { name: "设备运行报告", path: "" },
          ],
        },
        {
          title: "数据分析",
          icon: "el-icon-s-data",
          children: [
            { name: "常规统计", path: "" },
            { name: "多次到访", path: "" },
            { name: "场次统计", path: "" },
          ],
        },
        {
          title: "日志管理",
          icon: "el-icon-folder-opened",
          children: [],
          path: "/",
        },
      ],
    };
  },
  methods: {
    itemClick(path) {
      this.$router.push(path);
    },
  },
};
</script>
<style lang="less" scoped>
.aside {
  background-color: rgb(84, 93, 100);
  height: 100%;
}
</style>