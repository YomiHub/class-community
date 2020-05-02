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

// data{user_id,feature_id}
export function getDetail (data) {
  return request({
    url: '/feature/getdetail',
    method: 'get',
    data,
    loading: true
  })
}

// data{feature_id,pagesize,pageindex}
export function getComment (data) {
  return request({
    url: '/feature/getcomment',
    method: 'get',
    data,
    loading: true
  })
}

/*
 data{
   comment_user:
   feature_id:
   comment:
   comment_time:
 }
*/
export function sendComment (data) {
  return request({
    url: '/feature/sendcomment',
    method: 'post',
    data: data,
    loading: true
  })
}

/*
 data{
   comment_id:
   reply_for_user:
   reply_user:
   reply_content:
   reply_time:
 }
*/
export function sendCommentReply (data) {
  return request({
    url: '/feature/sendcommentreply',
    method: 'post',
    data: data,
    loading: true
  })
}

/*
data{
  feature_id
}
*/
export function addFeatureLike (data) {
  return request({
    url: '/feature/addfeaturelike',
    method: 'put',
    data: data,
    loading: true
  })
}

/*
data{
  feature_id
  user_id
}
*/
export function addCollect (data) {
  return request({
    url: '/feature/addcollect',
    method: 'post',
    data: data,
    loading: true
  })
}

/*
data{
  feature_id
  user_id
}
*/
export function deleteFeture (data) {
  return request({
    url: '/feature/deletefeture',
    method: 'delete',
    data: data,
    loading: true
  })
}

export function supportComment (data) {
  return request({
    url: '/feature/supportcomment',
    method: 'put',
    data: data,
    loading: true
  })
}

export function supportReply (data) {
  return request({
    url: '/feature/supportreply',
    method: 'put',
    data: data,
    loading: true
  })
}

export function deleteComment (data) {
  return request({
    url: '/feature/deletecomment',
    method: 'delete',
    data: data,
    loading: true
  })
}

/*
data{
  class_id:
  user_id:
}
*/
export function addFocus (data) {
  return request({
    url: '/feature/addfocus',
    method: 'post',
    data: data,
    loading: true
  })
}

/*
data{
  class_id:
  user_id:
}
*/
export function removeFocus (data) {
  return request({
    url: '/feature/removefocus',
    method: 'delete',
    data: data,
    loading: true
  })
}

/* data:{
  class_id:
  pageindex:
  pagesize:
}
*/

export function getClassFeature (data) {
  return request({
    url: '/feature/getclasslist',
    method: 'get',
    data: data,
    loading: true
  })
}

/* data:{
  user_id:
  pageindex:
  pagesize:
}
*/

export function getCollectFeature (data) {
  return request({
    url: '/feature/getcollectlist',
    method: 'get',
    data: data,
    loading: true
  })
}
