<template>
  <div class="app-container">
    <div>
      <el-button type="primary" class="btn" size="small" @click="handleCreate()">+ 新增展览类型</el-button>
    </div>

    <el-table :data="list" fit highlight-current-row style="width: 100%;">
      <el-table-column label="序号" prop="id" align="center" width="80">
        <template slot-scope="{ row }">
          <span>{{ row.index }}</span>
        </template>
      </el-table-column>
      <el-table-column label="展览类型" min-width="150px">
        <template slot-scope="{ row }">
          <span>{{ row.temporary_exhibition_type_name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="创建时间" min-width="150px">
        <template slot-scope="{ row }">
          <span>{{ row.temporary_exhibition_type_addTime }}</span>
        </template>
      </el-table-column>

      <el-table-column label="操作" align="center" width="200" class-name="small-padding fixed-width">
        <template slot-scope="{ row, $index }">
          <el-button type="primary" size="mini" @click="handleUpdate(row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(row, $index)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <Pagination
      v-show="total > 0"
      :total="total"
      :current.sync="listQuery.current"
      :size.sync="listQuery.size"
      @pagination="getList"
    />
    <EditTemporaryType ref="editTemporaryType" :getList="getList"></EditTemporaryType>
  </div>
</template>

<script>
import Pagination from "@/componentsCommon/Pagination"; // secondary package based on el-pagination
import EditTemporaryType from "./component/EditTemporaryType";
import * as API from "@/axios/api";

export default {
  name: "ComplexTable",
  components: { Pagination, EditTemporaryType },
  filters: {},
  data() {
    return {
      tableKey: 0,
      total: 0,
      list: null,
      listQuery: {
        current: 1,
        size: 20,
      },
      // 查询参数
      searchForm: {
        ticketName: "",
        openTime: "",
        saleStatus: "",
      },
      // 预售状态列表
      saleStatusList: [
        { value: "0", label: "全部" },
        { value: "1", label: "未开始" },
        { value: "2", label: "预约中" },
        { value: "3", label: "已结束" },
      ],
    };
  },
  created() {
    this.getList();
  },
  methods: {
    /**
     * 获取数据 *
     */
    // 获取列表数据
    getList() {
      this.$myLoading();
      API.GetTemporaryExhibitionTypeData().then((res) => {
        console.log(res);
        if (res.data.msg === "200") {
          let data = res.data.data.map((el, index) => {
            el.index = index + 1;
            return el;
          });
          this.list = data;
        }
        this.$myLoading().close();
      });
    },

    /**
     * 功能函数 *
     */
    // 新增展览类型
    handleCreate() {
      this.$refs.editTemporaryType.handleDialogVisible();
    },
    // 编辑展览类型
    handleUpdate(row) {
      this.$refs.editTemporaryType.handleDialogVisible(row);
    },
    handleDelete(row, index) {
      this.$notify({
        title: "成功",
        message: "删除成功",
        type: "success",
        duration: 2000,
      });
      this.list.splice(index, 1);
    },
  },
};
</script>
