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
