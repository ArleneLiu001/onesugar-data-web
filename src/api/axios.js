import axios from 'axios'
import store from '@/store'
import route from '@/router'

let reqCount = 0

const setLoading = () => {
  store.dispatch('options/setShowLoading', reqCount > 0)
}

let interce = axios.create({
  baseURL: '/',
  timeout: 8000,
  withCredentials: true
})

interce.interceptors.request.use((config) => {
  if (config.method && config.method.toLocaleLowerCase() === 'get') {
    if (config.params) {
      config.params.t = Date.now()
    }
  }
  if (config.headers.isLoading) {
    ++reqCount
    setLoading()
  }

  return config
})

interce.interceptors.response.use(
  (res) => {
    if (res.config.headers.isLoading) {
      --reqCount
      setLoading()
    }
    if (res.data.respHeader) {
      if (res.data.respHeader.code === -201 && res.config.url.indexOf('/api/current/user/info/get') === -1) {
        store.dispatch('auth/setShowLogin', true)
        return
      }
      if (res.data.respHeader.code === -101) {
        route.push('/noLock')
        return
      }
    }
    return res
  },

  error => {
    if (error.config.headers.isLoading) {
      --reqCount
      setLoading()
    }
    return Promise.reject(error)
  }
)
export default interce

export function get(url, isLoading = false) {
  return (params) => {
    return interce({
      method: 'GET',
      url: url,
      params,
      headers: {
        isLoading
      }
    })
  }
}

export function post(url, isLoading = false) {
  return (data) => {
    return interce({
      method: 'POST',
      url,
      data,
      headers: {
        isLoading
      }
    })
  }
}

export function upload(url, isLoading = false) {
  return (data) => {
    return interce({
      method: 'POST',
      url,
      data,
      headers: {
        'Content-Type': 'multipart/form-data',
        isLoading
      }
    })
  }
}