import Vue from 'vue'
import App from './App.vue'
import router from './router'
import elementUi from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import '@/assets/css/base.css'

import axios from 'axios'
axios.defaults.baseURL="http://localhost:8888/api/private/v1/"
Vue.prototype.$http = axios

Vue.use(elementUi)
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
