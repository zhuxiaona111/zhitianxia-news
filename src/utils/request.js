import axios from 'axios'
import JSONBig from 'json-bigint'
import store from '@/store'
import router from '@/router'
const instance = axios.create({
  // 1.基准地址
  baseURL: 'http://ttapi.research.itcast.cn/app/v1_0',
  // 2.设置大数字
  transformResponse: [function (data) {
    try {
      return JSONBig.parse(data)
    } catch (error) {
      return data
    }
  }]

})
// 3.请求拦截器注入token
instance.interceptors.request.use(function (config) {
  if (store.state.user.token) {
    config.headers['Authorization'] = `bearer ${store.state.user.token}`
  }
}, function (error) {
  return Promise.reject(error)
})
// 4.响应拦截器处理返回数据
instance.interceptors.response.use(function (response) {
  try {
    return response.data.data
  } catch (error) {
    return response.data
  }
}, async function (error) {
  if (error.response && error.response.status === 401) {
    let toPath = { path: '/login', query: { redirectUrl: router.currentRoute.path } }
    if (store.state.user.refresh_token) {
      try {
        let result = await axios({
          method: 'put',
          url: 'http://ttapi.research.itcast.cn/app/v1_0/authorizations',
          header: {
            Authorization: `bearer ${store.state.user.refresh_token}`
          }
        })
        store.commit('updateUser', {
          user: {
            token: result.data.data.token,
            refresh_token: store.state.user.refresh_token
          }
        })
        return instance(error.config)
      } catch (error) {
        store.commit('clearUser')
        router.push(toPath)
      }
    } else {
      router.push(toPath)
    }
  }
  return Promise.reject(error)
})

export default instance
