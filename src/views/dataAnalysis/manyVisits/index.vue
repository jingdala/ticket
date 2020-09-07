<template>
  <div>
    <el-table :data="data" style="width: 100%">
      <el-table-column label="姓名" width="180">
        <template slot-scope="scope">
          <span>{{ scope.row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="身份证" width="180">
        <template slot-scope="scope">
          <span>{{ scope.row.id }}</span>
        </template>
      </el-table-column>
      <el-table-column label="手机" width="180">
        <template slot-scope="scope">
          <span>{{ scope.row.phone }}</span>
        </template>
      </el-table-column>
      <el-table-column label="年龄" width="180">
        <template slot-scope="scope">
          <span>{{ scope.row.age }}</span>
        </template>
      </el-table-column>
      <el-table-column label="访问次数" width="180">
        <template slot-scope="scope">
          <span>{{ scope.row.count }}</span>
        </template>
      </el-table-column>
      <el-table-column label="最后访问" width="180">
        <template slot-scope="scope">
          <span>{{ scope.row.endVisit }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="handleDetail(scope.row)">详情</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
export default {
  data() {
    return {
      data: [
        {
          name: "金身注定",
          id: "11111",
          phone: "123",
          age: "16",
          count: "5",
          endVisit: "2020-08-09 21:27:39",
        },
      ],
    };
  },
  methods: {
    handleDetail(row) {
      this.$router.push("/users/detail?id=" + row.id);
    },
  },
};
</script>
<style scoped lang="less">
</style>