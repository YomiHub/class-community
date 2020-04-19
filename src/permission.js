import router from './router'
import NProgress from '@/utils/nprogress.js'
import { getToken } from '@/utils/authority.js'

/**
 * 白名单
 * no redirect whitelist
 */
const whiteList = ['/login']

// vue-router: https://router.vuejs.org/zh/
router.beforeEach((to, from, next) => {
  // start progress
  NProgress.start()
  const userToken = getToken()

  if (userToken) { // 登录未过期
    if (to.path === '/login') {
      next({ path: '/' }) // 跳转到一个不同的地址。当前的导航被中断，然后进行一个新的导航
      NProgress.done()
    } else {
      next()
    }
  } else { // 尚未登录或登录过期
    if (whiteList.includes(to.path)) {
      next()
    } else {
      next(`/login?redirect=${to.path}`)
    }
  }
})

router.afterEach(() => {
  // finish progress bar
  NProgress.done()
})
