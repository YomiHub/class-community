import request from '@/utils/request.js'

/* data:{
  type:
  classid:
  pageindex:
  pagesize:
}
*/

export function getFeature (data) {
  return request({
    url: '/feature/getlist',
    method: 'get',
    data: data,
    loading: true
  })
}

export function getHotFeature () {
  return request({
    url: '/feature/gethotlist',
    method: 'get',
    data: {},
    loading: true
  })
}

export const uploadUrl = {
  featureUrl: '/api/feature/uploadimg'
}

export function uploadImg (data) {
  return request({
    url: '/feature/uploadimg',
    method: 'post',
    data: data,
    headers: {
      'Content-Type': 'multipart/form-data'
    },
    dataType: 'file',
    loading: true
  })
}

export function uploadFeature (data) {
  return request({
    url: '/feature/upload',
    method: 'post',
    data: data,
    loading: true
  })
}
