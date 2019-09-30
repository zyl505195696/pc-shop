import Vue from 'vue'
import App from './App.vue'
import router from './router'
import elementUi from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import '@/assets/css/base.css'
import moment from 'moment'
import axios from 'axios'
axios.defaults.baseURL="http://localhost:8888/api/private/v1/"
Vue.prototype.$http = axios

Vue.use(elementUi)
Vue.config.productionTip = false
// 全局过滤器处理日期格式
Vue.filter('fmtdate',(v)=>{
  return moment(v).format('YYYY-MM-DD')
})

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
