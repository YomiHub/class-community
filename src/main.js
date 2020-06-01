import Vue from 'vue'
import 'normalize.css/normalize.css' // A modern alternative to CSS resets
import './plugins/element.js' // 按需引入element
import 'element-ui/lib/theme-chalk/index.css'
import '@/assets/styles/global.scss' // 引入所有全局样式
import App from './App.vue'
import router from './router'
import store from './store'
/* import VueSocketIO from 'vue-socket.io' // 在线聊天
import SocketIO from 'socket.io-client' */

import '@/icons' // 将SvgIcon.vue注册为<svg-icon>全局组件，并引入所有svg
import '@/permission.js' // 限制路由跳转，未登录时跳转到登录页

import VueClipboard from 'vue-clipboard2' // 复制到粘贴板
VueClipboard.config.autoSetContainer = true
Vue.use(VueClipboard)
Vue.config.productionTip = false

/* const options = {
  // autoConnect: false, // 默认在实例创建时就自动发起连接
  path: '',
  transports: ['websocket', 'xhr-polling', 'jsonp-polling']
}
  // 使用时机不当，组件中的sockets不能监听到服务端的emit事件，弃用，改为组件中直接使用socket.io-client
  Vue.use(new VueSocketIO({
  debug: true, // 开发环境
  connection: SocketIO(process.VUE_APP_BASE_SOCKET_URL), // websocket连接地址，如果有子目录，通过options.path设置
  vuex: {
    store,
    actionPrefix: 'SOCKET_',
    mutationPrefix: 'SOCKET_'
  }
})) */

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
