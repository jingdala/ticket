<template>
  <div class="home">
    <el-container>
      <!-- 头部区域 -->
      <el-header>
        <home-head></home-head>
      </el-header>
      <el-container>
        <!-- 侧边栏区域 -->
        <el-aside width="200px">
          <home-aside></home-aside>
        </el-aside>
        <!-- 主体内容区域 -->
        <el-main>Main</el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import HomeHead from "./childCpns/HomeHead";
import HomeAside from "./childCpns/HomeAside";
export default {
  name: "Home",
  methods: {},
  components: { HomeHead, HomeAside },
};
</script>
<style lang="less" scoped>
.home {
  width: 100%;
  height: 100%;
 
}
</style>
