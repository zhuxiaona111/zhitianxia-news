import request from '@/utils/request'
// 获取频道内容
export function getChannel () {
  return request({
    url: '/user/channels'
  })
}
// 渲染可选频道
export function getMyChannel () {
  return request({
    url: '/channels'
  })
}
