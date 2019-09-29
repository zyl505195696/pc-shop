<template>
  <div class="login-wrap">

<el-form class="login-form" label-position="top" label-width="80px" :model="formdata">
     <h2>用户登录</h2>
  <el-form-item label="用户名">
    <el-input v-model="formdata.username"></el-input>
  </el-form-item>
  <el-form-item label="密码">
    <el-input v-model="formdata.password"></el-input>
  </el-form-item>
<el-button class="login-btn" type="success" @click="handleLogin()">登录</el-button>
</el-form>
  </div>
</template>

<script>
export default {
  data () {
    return {
      formdata:{
        username:'',
        password:''
      }
    }
  },
  created () {

  },
  methods: {
handleLogin(){
  this.$http.post(`login`,this.formdata).then((res)=>{
    const {data:{data,meta:{msg,status}}} = res
    if(status===200){
     this.$message.success(msg)
    }else{
     this.$message.error(msg)
    }
  })
}
  },
  components: {

  }
}
</script>

<style scoped >
.login-wrap{
  background-color: #324152;
  height: 100%;
  display: flex;
justify-content: center;
  align-items: center;
}
.login-form{
  width: 400px;
  border-radius: 6px;
  background-color: #fff;
  padding: 30px;
}
.login-btn{
  width: 100%;
}
</style>
