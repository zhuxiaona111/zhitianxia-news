// 处理用户信息存储，删除，获取
const USER_TOKEN = 'zhitianxia'
export function setUser (user) {
  localStorage.setItem(USER_TOKEN, JSON.stringify(user))
}
export function getUser () {
  return JSON.parse(localStorage.getItem(USER_TOKEN) || '{}')
}
export function delUser () {
  return localStorage.removeItem(USER_TOKEN)
}
