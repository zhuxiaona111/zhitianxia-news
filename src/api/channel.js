import request from '@/utils/request'
// 获取频道内容
export function getChannel () {
  return request({
    url: '/user/channels'
  })
}
