<template>
  <div class="edit_basic">
    <!-- 编辑角色权限弹框 -->
    <el-dialog title="编辑角色权限" :visible.sync="dialogVisible">
      <div>
        <el-tree
          :data="data"
          show-checkbox
          node-key="id"
          :default-expanded-keys="[2, 3]"
          :default-checked-keys="[5]"
          :props="defaultProps"
        >
        </el-tree>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="handleDialogVisible">取 消</el-button>
        <el-button type="primary" @click="handleSubmit">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import * as API from "@/axios/api";

export default {
  name: "EditRolePower",
  props: {
    getList: {
      type: Function,
    },
  },
  components: {},
  filters: {},
  data() {
    return {
      data: [
        {
          id: 1,
          label: "一级 1",
          children: [
            {
              id: 4,
              label: "二级 1-1",
              children: [
                {
                  id: 9,
                  label: "三级 1-1-1",
                },
                {
                  id: 10,
                  label: "三级 1-1-2",
                },
              ],
            },
          ],
        },
        {
          id: 2,
          label: "一级 2",
          children: [
            {
              id: 5,
              label: "二级 2-1",
            },
            {
              id: 6,
              label: "二级 2-2",
            },
          ],
        },
        {
          id: 3,
          label: "一级 3",
          children: [
            {
              id: 7,
              label: "二级 3-1",
            },
            {
              id: 8,
              label: "二级 3-2",
            },
          ],
        },
      ],
      defaultProps: {
        children: "children",
        label: "label",
      },
      dialogVisible: false,
      formLabelWidth: "120px",
    };
  },
  created() {
    this.getSystemPower();
  },
  methods: {
    /**
     * 请求函数 *
     */
    // 获取系统所有权限
    getSystemPower() {
      API.GetSystemAuthorityData().then((res) => {
        console.log(res);
      });
    },
    // 获取角色的权限
    getRolePower() {
      API.GetLoginUserRoleAuthority().then((res) => {
        console.log(res);
      });
    },
    // 新增角色
    addRole(params) {
      this.$myLoading();
      let request = API.InsertSystemRoleData;
      request(params).then((res) => {
        this.$myLoading().close();
        if (res.data.msg === "200") {
          console.log(res);
          this.handleDialogVisible();
          this.getList();
        }
      });
    },
    /**
     * 功能函数 *
     */
    // 点击提交
    handleSubmit() {
      this.$refs.formRef.validate((valid) => {
        if (valid) {
        }
      });
    },
    /**
     * 监听弹框唤起
     * @param {object} item 票类参数
     */
    handleDialogVisible(item) {
      this.dialogVisible = !this.dialogVisible;
      if (item) {
        const { role_code } = item;
        this.getRolePower({ role_code });
      }
    },
  },
};
</script>
<style lang="less"></style>
