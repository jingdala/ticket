<template>
  <div>
    <!-- 卡片视图区域 -->
    <el-card class="box-card">
      <el-button type="danger" @click="addClick">
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

    <!-- 新增功能对话框 -->
    <el-dialog title="添加/修改功能" :visible.sync="adddialogVisible" width="40%" @closed="handleClose">
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="菜单选择" prop="menu">
          <el-select v-model="ruleForm.menu" placeholder="请选择" style="width:100%">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="功能" prop="func">
          <el-input v-model="ruleForm.func"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="adddialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="adddialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
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
      // 新增对话显示与隐藏
      adddialogVisible: false,
      // 新增表单数据
      ruleForm: {
        menu: "",
        func: "",
      },
      // 新增表单验证规则
      rules: {
        menu: [
          { required: true, message: "请选择活动资源", trigger: "change" },
        ],
        func: [
          { required: true, message: "请选择活动资源", trigger: "change" },
        ],
      },
      options: [
        {
          value: "选项1",
          label: "黄金糕",
        },
      ],
    };
  },
  methods: {
    // 点击新增
    addClick() {
      this.adddialogVisible = true;
    },
    handleClose() {
      this.$refs.ruleForm.resetFields();
    },
  },
};
</script>
<style lang="less" scoped>
</style>