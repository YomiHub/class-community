import Vue from 'vue'
import 'normalize.css/normalize.css' // A modern alternative to CSS resets
import './plugins/element.js' // 按需引入element
import 'element-ui/lib/theme-chalk/index.css'
import '@/assets/styles/global.scss' // 引入所有全局样式
import App from './App.vue'
import router from './router'
import store from './store'

import '@/icons' // 将SvgIcon.vue注册为<svg-icon>全局组件，并引入所有svg
import '@/permission.js' // 限制路由跳转，未登录时跳转到登录页
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
