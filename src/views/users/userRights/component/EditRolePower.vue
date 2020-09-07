<template>
  <div class="edit_basic">
    <!-- 编辑角色权限弹框 -->
    <el-dialog title="编辑角色权限" :visible.sync="dialogVisible">
      <div v-loading="loading">
        <el-tree
          ref="tree"
          :data="allPowers"
          show-checkbox
          node-key="id"
          :default-expand-all="true"
          :default-checked-keys="userPower"
          :props="defaultProps"
        ></el-tree>
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
      // 全部权限数据
      allPowers: [],
      // 当前用户权限
      userPower: [],
      // 当前用户code
      userCode: "",
      defaultProps: {
        children: "children",
        label: "label",
      },
      dialogVisible: false,
      formLabelWidth: "120px",
      loading: true,
    };
  },
  created() {},
  methods: {
    /**
     * 请求函数 *
     */
    // 获取系统所有权限
    getSystemPower() {
      this.loading = true;
      API.GetSystemAuthorityData().then((res) => {
        // console.log(res);
        if (res.data.msg === "200") {
          let list = this.formatPowerData(res.data.data);
          this.allPowers = list;
          this.getRolePower();
        }
      });
    },
    // 获取角色的权限
    getRolePower() {
      let params = { role_code: this.userCode };
      API.GetLoginUserRoleAuthority(params).then((res) => {
        console.log(res);
        if (res.data.msg === "200") {
          let power = this.getItemPower(res.data.data);
          this.userPower = power;
        }
        this.loading = false;
      });
    },
    // 编辑角色权限
    editRolePower(params) {
      this.loading = true;
      API.InsertRolePermissionAssociation(params).then((res) => {
        if (res.data.msg === "200") {
          this.handleDialogVisible();
          this.$message.success("修改成功！");
        } else {
          this.$message.error("修改失败！");
        }
        this.loading = false;
      });
    },
    /**
     * 功能函数 *
     */
    // 点击提交
    handleSubmit() {
      let checkedPowers = this.$refs.tree.getCheckedKeys();
      let params = checkedPowers.map((el) => ({
        role_code: this.userCode,
        permission_code: el,
      }));
      this.editRolePower(params);
    },
    /**
     * 监听弹框唤起
     * @param {object} item 票类参数
     */
    handleDialogVisible(item) {
      this.dialogVisible = !this.dialogVisible;
      if (item && this.dialogVisible) {
        this.userCode = item.role_code;
        this.getSystemPower();
      }
      if (!this.dialogVisible) {
        this.allPowers = [];
        this.userPower = [];
        this.userCode = "";
      }
    },
    /**
     * 格式化系统权限数据
     * @param {array} data 权限数据
     */
    formatPowerData(data) {
      return data.map((el, index) => {
        let item = {
          id: el.code,
          label: el.authority_name,
        };
        if (el.listSystemAuthorityTable) {
          item.children = this.formatPowerData(el.listSystemAuthorityTable);
        }
        return item;
      });
    },
    /**
     * 获取当前用户的角色权限
     * @param {array} data 权限数据
     */
    getItemPower(data) {
      let power = [];
      getPower(data);

      function getPower(data) {
        data.forEach((el, index) => {
          if (el.listSystemAuthorityTable) {
            getPower(el.listSystemAuthorityTable);
          }
          power.push(el.code);
        });
      }

      return power;
    },
  },
};
</script>
<style lang="less"></style>
