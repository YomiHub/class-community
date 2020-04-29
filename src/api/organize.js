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

/**
 * @export
 * @param {album_id}
 * @returns
 */
export function getPhoto (data) {
  return request({
    url: '/class/getphoto',
    method: 'get',
    data: data,
    loading: true
  })
}

export const photoDir = {
  url: 'api/class/photoupload'
}

/**
 * @export
 * @param {album_id}
 * @returns
 */
export function photoUpload (data) {
  return request({
    url: '/class/photoupload',
    method: 'post',
    data: data,
    headers: {
      'Content-Type': 'multipart/form-data'
    },
    dataType: 'file',
    loading: true
  })
}

/**
 * @export
 * @param {class_id,album_name}
 * @returns
 */

export function createAlbum (data) {
  return request({
    url: '/class/createalbum',
    method: 'post',
    data: data,
    loading: true
  })
}

/**
 * @export
 * @param {user_id,class_id}
 * @returns
 */
export function getAlbum (data) {
  return request({
    url: '/class/getalbum',
    method: 'get',
    data: data
  })
}

/**
 * @export
 * @param {photo_id}
 * @returns
 */
export function delPhoto (data) {
  return request({
    url: '/class/delphoto',
    method: 'delete',
    data: data
  })
}

/**
 *
 *
 * @export
 * @param { user_id,class_id,pageindex,pagesize}
 * @returns
 */
export function getNoticeList (data) {
  return request({
    url: '/class/getnoticelist',
    method: 'get',
    data: data
  })
}

/**
 *
 *
 * @export
 * @param { user_id,class_id}
 * @returns
 */
export function getRecentNotice (data) {
  return request({
    url: '/class/getrecentnotice',
    method: 'get',
    data: data
  })
}

export const noticeFileDir = {
  url: 'api/class/noticefile'
}

export function noticeFileUpload (data) {
  return request({
    url: '/class/noticefile',
    method: 'post',
    data: data,
    headers: {
      'Content-Type': 'multipart/form-data'
    },
    dataType: 'file',
    loading: true
  })
}

/**
 *
 *
 * @export
 * @param {class_id,user_id,title,content,notice_file,add_time}
 * @returns
 */
export function noticeUpload (data) {
  return request({
    url: '/class/noticeupload',
    method: 'post',
    data: data,
    loading: true
  })
}

/**
 * @export
 * @param {notice_id,user_id}
 * @returns
 */
export function delNotice (data) {
  return request({
    url: '/class/delnotice',
    method: 'delete',
    data: data
  })
}

/**
 * @export
 * @param {notice_id,notice_unread}
 * @returns
 */
export function readNotice (data) {
  return request({
    url: '/class/readnotice',
    method: 'put',
    data: data
  })
}
