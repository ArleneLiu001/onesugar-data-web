import axios from 'axios'

const service = axios.create({
  withCredentials: true,
  baseUrl: '/'
})

service.interceptors.request.use(config => {
  return config
}, error => {
  return Promise.reject(error)
})

service.interceptors.response.use(response => {
  return response
}, error => {
  return Promise.reject(error)
})

export function post(url) {
  return (params, baseUrl = '') => {
    return service({
      method: 'post',
      url: baseUrl + url,
      data: params
    })
  }
}
