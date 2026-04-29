import axios from 'axios'

const service = axios.create({
  baseURL: ''
})
service.interceptors.request.use(
  (config) => config,
  (error) => Promise.reject(error)
)

service.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(error)
)

export default axios