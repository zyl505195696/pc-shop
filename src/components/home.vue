<template>

    <el-container class="container">
      <el-header>Header</el-header>
      <el-container>
        <el-aside width="200px" class="aside">Aside</el-aside>
        <el-main class="main">Main</el-main>
      </el-container>
    </el-container>

</template>

<script>
export default {
  data() {
    return {};
  },
  created() {},
  methods: {},
  components: {}
};
</script>

<style scoped >
.container{
    height: 100%;
  background-color: pink;

}
.aside{
  background-color: deeppink;
}
.main{
  background-color: skyblue;
}
</style>
