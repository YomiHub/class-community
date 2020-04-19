import AES from 'crypto-js/aes'
import request from '@/utils/request.js'
const secret = 'community_pass123'

/*
request params
  baseURL = null,
  url,
  method = 'get',
  data = {},
  dataType = '',  contentType类型为json格式
  headers = {},
  loading = false
*/

/*
data:{
  phone_num:
  user_pass:
}
*/
export function register (data) {
  var changeData = JSON.parse(JSON.stringify(data)) // 深拷贝，防止页面密码被修改为加密后密码
  changeData.user_pass = AES.encrypt(data.user_pass, secret).toString()
  return request({
    url: '/register',
    method: 'post',
    data: changeData,
    loading: true
  })
}

export function login (data) {
  var changeData = JSON.parse(JSON.stringify(data))
  changeData.user_pass = AES.encrypt(data.user_pass, secret).toString()
  return request({
    url: '/login',
    method: 'post',
    data: changeData,
    loading: true
  })
}
