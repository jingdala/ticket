<template>
  <div>
    <!-- 卡片视图区域 -->
    <el-card class="box-card">
      <el-button type="danger">
        <i class="el-icon-plus"></i> 新增功能
      </el-button>

      <!-- 表格数据区域 -->
      <el-table :data="editRoleList" style="width: 100%;margin-top:20px" data-index="index">
        <el-table-column prop="name" label="名称" style="width:20%"></el-table-column>
        <el-table-column prop="function" label="功能" style="width:20%"></el-table-column>
        <el-table-column label="排序" width="150" type="index"></el-table-column>
        <el-table-column prop="date" label="创建时间" style="width:20%"></el-table-column>
        <el-table-column label="操作" style="width:20%">
          <template>
            <!-- 修改按钮 -->
            <el-button size="mini">编辑</el-button>
            <!-- 删除按钮 -->
            <el-button type="danger" size="mini">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>
<script>
export default {
  data() {
    return {
      // 表格数据列表
      editRoleList: [
        {
          name: "常规展览",
          function: "查看",
          date: "	2020-02-25 18:57:47",
        },
        {
          name: "常规展览",
          function: "添加",
          date: "	2020-02-25 18:57:47",
        },
        {
          name: "常规展览",
          function: "编辑",
          date: "	2020-02-25 18:57:47",
        },
        {
          name: "临时展览",
          function: "查看",
          date: "	2020-02-25 18:57:47",
        },
        {
          name: "常规展览",
          function: "添加",
          date: "	2020-02-25 18:57:47",
        },
        {
          name: "预约列表",
          function: "编辑",
          date: "	2020-02-25 18:57:47",
        },
        {
          name: "用户列表",
          function: "查看",
          date: "	2020-02-25 18:57:47",
        },
        {
          name: "角色权限设置",
          function: "启用禁用",
          date: "	2020-02-25 18:57:47",
        },
        {
          name: "广告",
          function: "编辑",
          date: "	2020-02-25 18:57:47",
        },
        {
          name: "检票管理",
          function: "查看",
          date: "	2020-02-25 18:57:47",
        },
        {
          name: "数据分析",
          function: "启用禁用",
          date: "	2020-02-25 18:57:47",
        },
        {
          name: "日志",
          function: "查看",
          date: "	2020-02-25 18:57:47",
        },
      ],
    };
  },
};
</script>
<style lang="less" scoped>
</style>