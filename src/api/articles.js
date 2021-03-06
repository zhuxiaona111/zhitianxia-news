import request from '@/utils/request'
// 获取文章列表
export function getArticles (params) {
  return request({
    url: 'http://ttapi.research.itcast.cn/app/v1_1/articles',
    params: { with_top: 1, ...params }
  })
}
// 获取不喜欢
export function dislikeArt (data) {
  return request({
    url: '/article/dislikes',
    method: 'post',
    data
  })
}
// 举报文章
export function reportArt (data) {
  return request({
    url: '/article/reports',
    method: 'post',
    data
  })
}
// 获取文章详情
export function getArticlesDetial (articleId) {
  return request({
    url: `/articles/${articleId}`
  })
}
// 获取评论或者获取评论回复
export function getComments (params) {
  return request({
    url: '/comments',
    params
  })
}
// 评论或回复评论
export function addComments (data) {
  return request({
    url: '/comments',
    method: 'post',
    data
  })
}
