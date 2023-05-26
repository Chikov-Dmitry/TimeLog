import axios from 'axios'
import AuthApi from '@/api/auth.api'

export const API_URL = import.meta.env.VITE_API_URL

const ApiInstance = axios.create({
  withCredentials: true,
  baseURL: API_URL
})

ApiInstance.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`
  return config
})

ApiInstance.interceptors.response.use(
  (config) => {
    return config
  },
  async (error) => {
    const originalRequest = error.config
    if (error.response.status == 401 && originalRequest && !originalRequest._isRetry) {
      originalRequest._isRetry = true
      try {
        const response = await axios.get(`${API_URL}auth/refresh`, {withCredentials: true})
        localStorage.setItem('token', response.data.tokens.accessToken)
        return ApiInstance.request(originalRequest)
      } catch (e) {
        console.warn('authentication failed')
      }
    }
    throw error
  }
)
export default ApiInstance
