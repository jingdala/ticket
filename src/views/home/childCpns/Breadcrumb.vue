<template>
  <div class="breadcrumb-box">
    <span class="breadcrumb-icon">
      <i class="el-icon-location-outline"></i>
    </span>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item v-for="(item, index) in levelList" :key="item.path">
        <span
          v-if="!item.redirect || index == levelList.length - 1"
          class="no-redirect"
        >{{ item.meta.title }}</span>
        <a v-else @click.prevent="handleLink(item)">{{ item.meta.title }}</a>
      </el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>
<script>
import * as pathToRegexp from "path-to-regexp";

export default {
  data() {
    return {
      // 面包屑数据
      levelList: null,
    };
  },
  watch: {
    $route(route) {
      console.log(route);
      // if you go to the redirect page, do not update the breadcrumbs
      if (route.path.startsWith("/redirect/")) {
        return;
      }
      this.getBreadcrumb();
    },
  },
  created() {
    this.getBreadcrumb();
  },
  methods: {
    /**
     * 功能函数 *
     */
    // 获取当前链接的路由层级
    getBreadcrumb() {
      // only show routes with meta.title

      let matched = this.$route.matched.filter(
        (item) => item.meta && item.meta.title
      );

      this.levelList = matched.filter(
        (item) => item.meta && item.meta.title && item.meta.breadcrumb !== false
      );
    },
    // 解析地址
    pathCompile(path) {
      const { params } = this.$route;
      var toPath = pathToRegexp.compile(path);
      return toPath(params);
    },
    // 点击跳转
    handleLink(item) {
      const { redirect, path } = item;
      if (redirect) {
        this.$router.push(redirect);
        return;
      }
      this.$router.push(this.pathCompile(path));
    },
  },
};
</script>
<style lang="less" scoped>
.breadcrumb-box {
  padding-left: 30px;
  position: relative;
  .breadcrumb-icon {
    position: absolute;
    top: 16px;
    left: 4px;
  }
}
</style>
