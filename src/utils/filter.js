// 用法：<div>{{data | dataFormat('yyyy-MM-dd hh:mm:ss')}}</div>
export function dateFormat (value, pattern = 'YYYY-MM-DD HH:mm:ss') {
  const getDate = new Date(Date.parse(value))
  const o = {
    'M+': getDate.getMonth() + 1,
    'd+': getDate.getDate(),
    'h+': getDate.getHours(),
    'm+': getDate.getMinutes(),
    's+': getDate.getSeconds(),
    'q+': Math.floor((getDate.getMonth() + 3) / 3),
    S: getDate.getMilliseconds()
  }
  if (/(y+)/.test(pattern)) {
    pattern = pattern.replace(
      RegExp.$1,
      (getDate.getFullYear() + '').substr(4 - RegExp.$1.length)
    )
  }
  for (const k in o) {
    if (new RegExp('(' + k + ')').test(pattern)) {
      pattern = pattern.replace(
        RegExp.$1,
        RegExp.$1.length === 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length)
      )
    }
  }
  return pattern
}
