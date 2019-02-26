import axios from 'axios'
import envConfig from 'config/envConfig'


let url = envConfig[_ENV_] // eslint-disable-line

// axios 配置
console.log('当前请求url为：', url)
axios.defaults.timeout = 5000 //设置超时时间
axios.defaults.baseURL = url

// 拦截请求
axios.interceptors.request.use(config => {
  console.log('请求拦截！')
  config.headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    // 'Access-Control-Allow-Origin': '*',
  }
  return config
})

// 拦截响应
// Add a response interceptor
axios.interceptors.response.use(response => {
  // Do something with response data
  console.log(response)
  return response
}, (error) => {
  // Do something with response error
  console.log(error)
  return Promise.reject(error)
})
