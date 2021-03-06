import request from '@/utils/request'
export function login (data) {
  return request({
    url: '/authorizations',
    data,
    method: 'post'
  })
}
// 用户关注
export function followUser (data) {
  return request({
    url: '/user/followings',
    type: 'post',
    data
  })
}
// 取消关注
export function unFollowUser (target) {
  return request({
    url: `/user/followings/${target}`,
    method: 'delete'
  })
}
// 获取用户个人资料
export function getUserProfile () {
  return request({
    url: '/user/profile'
  })
}
// 获取用户头像
export function updateImg (data) {
  return request({
    url: '/user/photo',
    method: 'patch',
    data
  })
}
// 保存修改内容
export function saveUserInfo (data) {
  return request({
    url: '/user/profile',
    method: 'patch',
    data
  })
}
// 获取用户信息
export function getUserInfo () {
  return request({
    url: '/user'
  })
}
