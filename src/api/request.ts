import request from 'axios'

request.interceptors.request.use(
  config => {
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

request.interceptors.response.use(
  response => {
    return response.data
  },
  error => {
    return Promise.reject(error)
  }
)

export const GET = (url: string, params?: object, others?: object) => {
  return request.get(url, { params, ...others })
}

export const POST = (url: string, params?: object, others?: object) => {
  return request.post(url, params, others)
}
