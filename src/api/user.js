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
