/* 公用方法 */

/**
 *
 * 弹出正在加载的遮罩
 * @export
 * @param {this} context
 * @returns {object}
  const loading = popLoading(this)
  setTimeout(() => {
    loading.close()
  }, 1000)
*/
export function popLoading (context) {
  return context.$loading({
    lock: true,
    text: 'loading',
    spinner: 'el-icon-loading',
    background: 'rgba(0, 0, 0, 0.7)'
  })
}
