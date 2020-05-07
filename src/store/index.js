import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/user'
import socket from './modules/socket'
Vue.use(Vuex)

/*
有了命令空间以后，触发:

实例内访问state:  this.$store.state.模块名.属性名
访问‘计算机属性’getters:   this.$store.getters.模块名.getters_name
mutations:  this.$store.commit('模块名/mutations_name')
actions:  this.$store.dispatch('模块名/actions_name')
*/
export default new Vuex.Store({
  modules: {
    user,
    socket
  }
})
