import Vue from 'vue'
import { Button, Tabs, TabPane, Form, FormItem, Input, Loading, Message } from 'element-ui'
Vue.use(Button)
Vue.use(Tabs)
Vue.use(TabPane)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
Vue.use(Loading.directive)
Vue.prototype.$loading = Loading.service
Vue.prototype.$message = Message
