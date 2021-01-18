import axios from 'axios'
// import { message } from 'ant-design-vue'
// import { router, resetRoutes } from '/@/router'
// import { store } from '/@/store'
import NProgress from 'nprogress'
NProgress.configure({ showSpinner: false })
const service = axios.create({
  timeout: 15 * 1000
  // baseURL: '/api'
})

//请求拦截
// service.interceptors.request.use(
//   config => {
//     NProgress.start()
//     //非登录接口，带上token
//     if (!config.url.includes('adminLogin')) {
//       const { token } = store.state.user
//       config.headers['token'] = token
//     }
//     return config
//   },
//   error => {
//     message.error({
//       content: error.message
//     })
//     NProgress.done()
//     return Promise.reject(error)
//   }
// )

//响应拦截
// service.interceptors.response.use(
//   res => {
//     const { config, data } = res

//     if (config.responseType === 'blob') {
//       NProgress.done()
//       return res
//     }
//     const { code, msg } = data
//     if (code !== 0) {
//       message.error(msg || '服务器异常')
//       if (code === '-100') {
//         message.error('服务器不可用')
//       }
//       //登录失效
//       if (code === 403) {
//         resetRoutes()
//         router.replace('/login')
//       }
//     }

//     NProgress.done()
//     return data
//   },
//   error => {
//     NProgress.done()
//     message.error({
//       content: error.message
//     })
//     return Promise.reject(error)
//   }
// )

export default service
