<template>
  <div class="aside">
    <el-menu
      :default-openeds="['1']"
      background-color="rgb(84, 93, 100)"
      text-color="#fff"
      active-text-color="#2ef344"
    >
      <div :index="index + ''" v-for="(item, index) in asideList" :key="index">
        <el-submenu :index="index + ''" v-if="item.children.length > 0">
          <template slot="title">
            <i :class="item.icon"></i>
            {{ item.title }}
          </template>
          <el-menu-item
            v-for="(item1, index1) in item.children"
            :key="index1"
            @click="itemClick(item1.path)"
          >
            <template slot="title">{{ item1.name }}</template>
          </el-menu-item>
        </el-submenu>
        <el-menu-item v-else @click="itemClick(item.path)">
          <template slot="title">
            <i :class="item.icon"></i>
            {{ item.title }}
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
            { name: "常规展览", path: "/exhibition/conventional" },
            { name: "临时展览", path: "/exhibition/temporary" },
            { name: "展览类型", path: "/exhibition/temporaryType" },
          ],
        },
        {
          title: "预约管理",
          icon: "el-icon-tickets",
          children: [],
          path: "/orderManage/orderList",
        },
        {
          title: "用户管理",
          icon: "el-icon-user",
          children: [
            { name: "用户列表", path: "/users/userList" },
            { name: "角色权限", path: "/users/userRights" },
            { name: "编辑角色功能", path: "/users/editRole" },
          ],
        },
        {
          title: "设备管理",
          icon: "el-icon-s-platform",
          children: [
            { name: "广告", path: "/equipManage/advertisement" },
            { name: "检票管理", path: "/equipManage/equipOperationReport" },
            { name: "设备运行报告", path: "/equipManage/ticketCheckManage" },
          ],
        },
        {
          title: "数据分析",
          icon: "el-icon-s-data",
          children: [
            { name: "常规统计", path: "/dataAnalysis/commonCount" },
            { name: "多次到访", path: "/dataAnalysis/manyVisits" },
            { name: "场次统计", path: "/dataAnalysis/sceneCount" },
          ],
        },
        {
          title: "日志管理",
          icon: "el-icon-folder-opened",
          children: [],
          path: "/logManage/logList",
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
  .el-menu {
    border-right: none;
  }
}
.el-submenu__title i,
.el-menu-item i {
  color: #fff;
}
</style>
