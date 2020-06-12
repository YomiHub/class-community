import Vue from 'vue'
import Router from 'vue-router'
// const routerPush = Router.prototype.push
// Router.prototype.push = function push (location) {
//   return routerPush.call(this, location).catch(error => error)
// }
Vue.use(Router)
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
            component: () => import('@/views/index/SearchContent.vue'),
            props: true
          }
        ]
      },
      {
        path: '/index/joinclass',
        name: 'JoinClass',
        component: () => import(/* webpackChunkName: "editclass" */ '@/views/editclass/Join.vue')
      },
      {
        path: '/index/createclass',
        name: 'CreateClass',
        component: () => import(/* webpackChunkName: "editclass" */ '@/views/editclass/Create.vue')
      },
      {
        path: '/index/featuredetail/:id',
        name: 'featureDetail',
        component: () => import(/* webpackChunkName: "featureDetail" */ '@/views/feature/Detail.vue'),
        props: true
      },
      {
        path: '/index/createfeature',
        name: 'CreateFeature',
        component: () => import(/* webpackChunkName: "createfeature" */ '@/views/feature/Create.vue'),
        props: true
      },
      {
        path: '/index/classalbum',
        name: 'ClassAlbum',
        component: () => import(/* webpackChunkName: "classAlbum" */ '@/views/class/ClassAlbum.vue'),
        props: true
      }, {
        path: '/index/classnotice',
        name: 'ClassNotice',
        component: () => import(/* webpackChunkName: "classNotice" */ '@/views/class/ClassNotice.vue'),
        props: true
      }, {
        path: '/index/classleave',
        name: 'ClassLeave',
        component: () => import(/* webpackChunkName: "classLeave" */ '@/views/class/ClassLeave.vue'),
        props: true
      }, {
        path: '/index/classmember',
        name: 'ClassMember',
        component: () => import(/* webpackChunkName: "classMember" */ '@/views/class/ClassMember.vue'),
        props: true
      }, {
        path: '/index/classpage/:id',
        name: 'ClassPage',
        component: () => import(/* webpackChunkName: "classPage" */ '@/views/class/ClassPage.vue'),
        props: true
      }, {
        path: '/index/userpage/:id',
        name: 'UserPage',
        component: () => import(/* webpackChunkName: "userPage" */ '@/views/user/UserPage.vue'),
        props: true
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

const createRouter = () => new Router({
  mode: 'history', // reqiure service support
  base: process.env.NODE_ENV === 'development' ? '/' : '/classcommunity/',
  routes
})
const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter () {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // 退出登录后 reset router
}
export default router
