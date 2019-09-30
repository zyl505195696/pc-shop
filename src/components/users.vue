<template>
  <el-card class="box">
    <!-- 面包屑 -->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 搜索+添加 -->
    <el-row class="searchbox">
      <el-col>
        <el-input
          placeholder="请输入内容"
          clearable
          v-model="query"
          @clear="abc"
          style="width:350px;margin-right:20px"
        >
          <el-button slot="append" icon="el-icon-search" @click="searchUser"></el-button>
        </el-input>
        <el-button type="success" @click="showadd">添加用户</el-button>
      </el-col>
    </el-row>
    <!-- 表格 -->
    <el-table :data="list" style="width: 100%">
      <el-table-column prop="id" label="#" width="80"></el-table-column>
      <el-table-column prop="username" label="姓名" width="120"></el-table-column>
      <el-table-column prop="email" label="邮箱" width="140"></el-table-column>
      <el-table-column prop="mobile" label="电话" width="140"></el-table-column>
      <el-table-column prop="create_time" label="创建日期" width="140">
        <template slot-scope="scope">{{scope.row.create_time|fmtdate}}</template>
      </el-table-column>
      <el-table-column prop="date" label="用户状态" width="140">
        <template slot-scope="scope">
          <el-switch
            @change="changestate(scope.row)"
            v-model="scope.row.mg_state"
            active-color="#13ce66"
            inactive-color="#ff4949"
          ></el-switch>
        </template>
      </el-table-column>
      <el-table-column prop="date" label="操作" width="200">
        <template slot-scope="scope">
          <el-button
            type="primary"
            icon="el-icon-edit"
            circle
            size="mini"
            plain
            @click="edit(scope.row)"
          ></el-button>
          <el-button
            type="success"
            icon="el-icon-check"
            circle
            size="mini"
            plain
            @click="role(scope.row)"
          ></el-button>
          <el-button
            type="danger"
            icon="el-icon-delete"
            circle
            size="mini"
            plain
            @click="del(scope.row)"
          ></el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-pagination
      style="margin-top:20px"
      @current-change="handleCurrentChange"
      :current-page="pagenum"
      :page-sizes="[2, 4, 6, 8]"
      :page-size="pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    ></el-pagination>
    <!-- 对话框--添加用户 -->
    <el-dialog title="添加用户" :visible.sync="dialogFormVisible">
      <el-form label-position="left" label-width="80px" :model="formdata">
        <el-form-item label=" 用户名">
          <el-input v-model="formdata.username"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="formdata.password"></el-input>
        </el-form-item>
        <el-form-item label="邮箱">
          <el-input v-model="formdata.email"></el-input>
        </el-form-item>
        <el-form-item label="电话">
          <el-input v-model="formdata.mobile"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="centerDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="useradd">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 对话框-编辑用户 -->
    <el-dialog title="编辑用户" :visible.sync="dialogFormVisible1">
      <el-form label-position="left" label-width="80px" :model="formdata">
        <el-form-item label=" 用户名">
          <el-input v-model="formdata.username" disabled></el-input>
        </el-form-item>
        <el-form-item label="邮箱">
          <el-input v-model="formdata.email"></el-input>
        </el-form-item>
        <el-form-item label="电话">
          <el-input v-model="formdata.mobile"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="centerDialogVisible1 = false">取 消</el-button>
        <el-button type="primary" @click="useredit">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 对话框-- 分配角色 -->
    <el-dialog title="分配角色" :visible.sync="dialogFormVisible2">
      <el-form :model="formdata">
        <el-form-item label="活动名称">
          <el-input v-model="formdata.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="活动区域">
          <el-select v-model="selectVal" placeholder="请选择角色">
            <el-option
              v-for="(item) in roles"
              :key="item.id"
              :label="item.roleName"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible2 = false">取 消</el-button>
        <el-button type="primary" @click="userrole" >确 定</el-button>
      </div>
    </el-dialog>
  </el-card>
</template>

<script>
export default {
  data() {
    return {
      list: [],
      pagenum: 1,
      pagesize: 2,
      query: "",
      total: -1,
      dialogFormVisible: false,
      dialogFormVisible1: false,
      dialogFormVisible2: false,
      currUserId:-1,
      formdata: {
        username: "",
        password: "",
        email: "",
        mobile: ""
      },
      selectVal: 1,
      roles: ""
    };
  },
  created() {
    this.getTableData();
  },
  methods: {
    async userrole() {
      const res = await this.$http.put(`users/${this.currUserId}/role`,{rid:this.selectVal})
      const {
        meta: { msg, status }
      } = res.data;
      if (status === 200) {
        this.dialogFormVisible2=false
        this.$message.success(msg);
      }
    },
    // 分配角色
    async role(k) {
      this.currUserId=k.id
      this.formdata = k;
      this.dialogFormVisible2 = true;
      const res = await this.$http.get(`roles`);
      this.roles = res.data.data;

      const res2 = await this.$http.get(`users/${k.id}`);

      // 给下拉框绑定select赋值
      this.selectVal = res2.data.data.rid;
    },
    //修改状态
    async changestate(k) {
      const res = await this.$http.put(`users/${k.id}/state/${k.mg_state}`);
      const {
        meta: { msg, status }
      } = res.data;
      if (status === 200) {
        this.$message.success(msg);
      }
    },
    //  编辑
    async edit(k) {
      this.dialogFormVisible1 = true;
      this.formdata = k;
    },
    async useredit() {
      const res = await this.$http.put(
        `users/${this.formdata.id}`,
        this.formdata
      );
      const {
        meta: { msg, status }
      } = res.data;
      if (status === 200) {
        this.dialogFormVisible1 = false;
        this.getTableData();
      }
    },
    // 删除
    del(k) {
      console.log(k);
      this.$confirm("此操作将删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
          const res = await this.$http.delete(`users/${+k.id}`);
          this.getTableData();
          this.$message.success("删除成功");
        })
        .catch(() => {
          this.$message.info("已取消删除");
        });
    },

    // 添加
    async useradd() {
      const res = await this.$http.post(`users`, this.formdata);
      const {
        meta: { msg, status }
      } = res.data;
      if (status === 201) {
        this.dialogFormVisible = false;
        this.getTableData();
      }
    },
    showadd() {
      this.dialogFormVisible = true;
      this.formdata = {};
    },
    abc() {
      this.getTableData();
    },
    // 搜索
    searchUser() {
      this.pagenum = 1;
      this.getTableData();
    },
    // 分页
    handleCurrentChange(val) {
      this.pagenum = val;
      this.getTableData();
    },

    // 获取表格数据
    async getTableData() {
      const AUTH_TOKEN = localStorage.getItem("token");
      this.$http.defaults.headers.common["Authorization"] = AUTH_TOKEN;
      const res = await this.$http.get(
        `users?query=${this.query}&pagenum=${this.pagenum}&pagesize=${
          this.pagesize
        }`
      );
      const {
        data,
        meta: { msg, status }
      } = res.data;
      if (status == 200) {
        this.total = data.total;
        this.list = data.users;
        console.log(this.total);
      }
    }
  }
};
</script>

<style scoped >
.box {
  height: 100%;
}
.searchbox {
  margin-top: 30px;
}
</style>
