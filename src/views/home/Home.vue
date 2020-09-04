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
        <el-main>
          <BackTop />
          <breadcrumb />
          <div id="content" class="content">
            <router-view></router-view>
          </div>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import HomeHead from "./childCpns/HomeHead";
import HomeAside from "./childCpns/HomeAside";
import Breadcrumb from "./childCpns/Breadcrumb";
import BackTop from "../../components/BackTop";
export default {
  name: "Home",
  methods: {},
  components: { HomeHead, HomeAside, Breadcrumb, BackTop },
};
</script>
<style lang="less" scoped>
.home {
  width: 100%;
  height: 100%;
  background: #f5f5f5;
}
.content {
  overflow-y: auto;
  height: calc(100vh - 135px);
  background: #f0f2f5;
  padding-top: 20px;
  box-sizing: border-box;
}
</style>
