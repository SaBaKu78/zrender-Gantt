import axios from 'axios'
import { PROJECT_ID } from '../config/project'

const service = axios.create({
  baseURL: ''
})
service.interceptors.request.use(
  (config) => {
    config.headers.set('X-Project-Id', PROJECT_ID)
    return config
  },
  (error) => Promise.reject(error)
)

service.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(error)
)

// 所有业务请求统一使用 service，确保 baseURL 与拦截器配置生效。
export default service
