// 获取设置token、username
import Cookies from 'js-cookie' // https://www.npmjs.com/package/js-cookie

const TokenKey = 'user_token'
const UserNameKey = 'user_name'
const UserIdKey = 'user_id'
const AvaterUrlKey = 'avater_url'

// 获取设置token
export function getToken () {
  return Cookies.get(TokenKey)
}

export function setToken (token = '') {
  return Cookies.set(TokenKey, token)
}

export function removeToken () {
  return Cookies.remove(TokenKey)
}

// 获取设置用户信息
export function getUserName () {
  return Cookies.get(UserNameKey)
}

export function getUserId () {
  return Cookies.get(UserIdKey)
}

export function getUserAvater () {
  return Cookies.get(AvaterUrlKey)
}

export function setUser (userName = '', userId = '', userAvater = '') {
  return (
    Cookies.set(UserNameKey, userName) &&
    Cookies.set(UserIdKey, userId) &&
    Cookies.set(AvaterUrlKey, userAvater)
  )
}

export function removeUser () {
  return (
    Cookies.remove(UserNameKey) &&
    Cookies.remove(UserIdKey) &&
    Cookies.remove(AvaterUrlKey)
  )
}

// 便于发起http请求时将token设置到请求头
export function getHttpHeader () {
  return {
    [process.env.VUE_APP_HEADERS_TOKEN]: getToken() // 在.env中自定义
  }
}
