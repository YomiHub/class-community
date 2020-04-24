import request from '@/utils/request.js'

/*
data:{
  user_id:
  class_id:
  class_pass:
  identity:0为家长、1为学生、2为教师
}
*/
export function joinClass (data) {
  return request({
    url: '/class/joinclass',
    method: 'post',
    data: data,
    loading: true
  })
}

export const logoDir = {
  url: 'api/class/logoupload'
}

export function logoUpload (data) {
  return request({
    url: '/class/logoupload',
    method: 'post',
    data: data,
    headers: {
      'Content-Type': 'multipart/form-data'
    },
    dataType: 'file',
    loading: true
  })
}

/*
  {
    logo_url
    user_id:
    name:
    pass:
    brief:
  }
*/
export function createClass (data) {
  return request({
    url: '/class/createclass',
    method: 'post',
    data: data,
    loading: true
  })
}
