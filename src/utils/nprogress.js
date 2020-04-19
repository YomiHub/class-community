// 设置进度条
import NProgress from 'nprogress' // https://github.com/rstacruz/nprogress
import 'nprogress/nprogress.css'

NProgress.configure({
  trickleSpeed: 500 // default: ease and 200
  // showSpinner:default: true
})

export default NProgress
