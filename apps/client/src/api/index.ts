import axios from 'axios'
import { getTypedLStorageItem, setTypedLStorageItem } from '@/common/typedLocalStorage'

export const API_URL = import.meta.env.VITE_API_URL

const ApiInstance = axios.create({
  withCredentials: true,
  baseURL: API_URL
})

ApiInstance.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${getTypedLStorageItem('token')}`
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
        const response = await axios.get(`${API_URL}auth/refresh`, { withCredentials: true })
        setTypedLStorageItem('token', response.data.tokens.accessToken)
        return ApiInstance.request(originalRequest)
      } catch (e) {
        console.warn('authentication failed')
      }
    }
    throw error
  }
)
export default ApiInstance
