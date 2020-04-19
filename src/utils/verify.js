/**
 * 常用正则验证
 */

/**
 *
 * @export
 * @param {string} path
 * @returns {Boolean}
 */
export function isExternal (path) {
  return /^(https?:|mailto:|tel:)/.test(path)
}
