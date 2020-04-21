import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)
const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/Home.vue'), // 替代import Home from '../views/Home.vue' ，使用路由懒加载
    redirect: '/index',
    children: [
      {
        path: '/index',
        component: () => import(/* webpackChunkName: "index" */ '@/views/index/Index.vue'),
        meta: { title: '首页' },
        children: [
          {
            path: '',
            name: 'Index',
            component: () => import('@/views/index/IndexContent.vue')
          },
          {
            path: '/index/search',
            name: 'Search',
            component: () => import('@/views/index/SearchContent.vue')
          }
        ]
      }
    ]
  },
  {
    path: '/login',
    name: 'Login',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "login" */ '@/views/Login.vue')
  }
]

const createRouter = () => new VueRouter({
  mode: 'history',
  routes
})
const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter () {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // 退出登录后 reset router
}
export default router
