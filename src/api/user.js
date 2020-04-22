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
  phone_num:注册手机号
  user_pass:
  user_name:
}
*/
export function register (data) {
  var changeData = JSON.parse(JSON.stringify(data)) // 深拷贝，防止页面密码显示被修改为加密后密码
  changeData.user_pass = AES.encrypt(data.user_pass, secret).toString()
  return request({
    url: '/register',
    method: 'post',
    data: changeData,
    loading: true
  })
}

/*
data:{
  phone_num:
  user_pass:
}
*/
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

/*
data:{
  formData
}
*/
export function avatarUpload (uploadData) {
  return request({
    url: '/avater/upload',
    method: 'post',
    data: uploadData,
    headers: {
      'Content-Type': 'multipart/form-data'
    },
    dataType: 'file'
  })
}

export const baseDir = {
  url: '/api/avatar/upload'
}

/*
  data:{
    id:
  }
*/
export function getClassRelation (data) {
  return request({
    url: '/userinfo/relation',
    method: 'get',
    data,
    loading: true
  })
}

/*
data:{
  id:
  user_name:
  user_num:
  user_phone:实名手机号
}
*/
export function updateUserInfo (data) {
  return request({
    url: '/userinfo/update',
    method: 'post',
    data,
    loading: true
  })
}

/*
data:{
  id
}
*/
export function getUserInfo (userId) {
  return request({
    url: '/userinfo/getinfo',
    method: 'get',
    data: { id: userId },
    loading: true
  })
}

/*
data:{
  id:
  user_pass:
  other_id:
  class_id
}
*/
export function changeClass (data) {
  var changeData = JSON.parse(JSON.stringify(data))
  changeData.user_pass = AES.encrypt(data.user_pass, secret).toString()
  return request({
    url: '/userinfo/removeclass',
    method: 'post',
    data: changeData,
    loading: true
  })
}
