<template>
  <el-container class="container">
    <el-header>
      <el-row>
        <el-col :span="4">
          <img src="@/assets/aa.png" alt="">
        </el-col>
        <el-col :span="19" class="mid">这不是一个后台管理系统</el-col>
        <el-col :span="1">
          <a href="#" class="logout" @click="handleloginOut()">退出</a>
        </el-col>
      </el-row>
    </el-header>
    <el-container>
      <el-aside width="200px" class="aside">
        <el-menu router :unique-opened="true" default-active="2" class="el-menu-vertical-demo">
          <!-- 1 -->
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>用户管理</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="1-1">
                <i class="el-icon-menu"></i>
                用户列表
              </el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <!-- 2 -->
          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>权限管理</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="1-1">
                <i class="el-icon-menu"></i>
                角色列表
              </el-menu-item>
              <el-menu-item index="1-2">
                <i class="el-icon-menu"></i>
                权限列表
              </el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <!-- 3 -->
          <el-submenu index="3">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>商品管理</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="1-1">
                <i class="el-icon-menu"></i>
                商品列表
              </el-menu-item>
              <el-menu-item index="1-2">
                <i class="el-icon-menu"></i>
                分类参数
              </el-menu-item>
              <el-menu-item index="1-2">
                <i class="el-icon-menu"></i>
                商品分类
              </el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <!-- 4 -->
          <el-submenu index="4">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>订单管理</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="1-1">
                <i class="el-icon-menu"></i>
                订单列表
              </el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <!-- 5 -->
          <el-submenu index="5">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>数据统计</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="1-1">
                <i class="el-icon-menu"></i>
                数据列表
              </el-menu-item>
            </el-menu-item-group>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-main class="main">Main</el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  data() {
    return {};
  },
  beforeMount() {
    if (!localStorage.getItem("token")) {
      this.$router.push({
        name: "login"
      });
          this.$message.warning("请先登录")
    }

  },
  created() {},
  methods: {
    handleloginOut(){
      localStorage.clear()
      this.$router.push({
        name:'login'
      })
      this.$message.warning('退出成功')
    }
  },
  components: {}
};
</script>

<style scoped >
.container {
  height: 100%;
  background-color: #b3c0d1;
}
.aside {
  background-color: deeppink;
}
.main {
  background-color: skyblue;
}
.mid {
  line-height: 60px;
  text-align: center;
  color: #fff;
}
.logout {
  line-height: 60px;
  text-decoration: none;
}
</style>
