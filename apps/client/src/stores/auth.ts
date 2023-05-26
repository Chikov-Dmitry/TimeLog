import { defineStore } from 'pinia'
import { ref } from 'vue'
import { enumStatusLoad } from '@/common/enumStatusLoad'
import { IAuthUserResponseDto, ICreateUserRequestDto } from '@timelog/interfaces'
import AuthApi from '@/api/auth.api'

export const useAuthStore = defineStore('auth', () => {
  const isAuthenticated = ref(false)
  const user = ref<IAuthUserResponseDto | null>(null)
  const statusLoad = ref(enumStatusLoad.NOT_STARTED)
  const deviceId = ref<string>('')

  async function login(email: string, password: string, deviceId: string) {
    statusLoad.value = enumStatusLoad.LOADING
    const response = await AuthApi.login({ email, password, deviceId })
    isAuthenticated.value = true
    user.value = response.data
    statusLoad.value = enumStatusLoad.LOADED
    return response
  }

  async function logout() {
    const userV = user.value
    if (!userV || !userV.id || !deviceId.value) throw new Error('user id or device id undefined')
    statusLoad.value = enumStatusLoad.LOADING
    const response = await AuthApi.logout({ id: userV.id, deviceId: deviceId.value })
    user.value = null
    isAuthenticated.value = false
    statusLoad.value = enumStatusLoad.LOADED
    return response
  }

  async function registration(payload: ICreateUserRequestDto) {
    statusLoad.value = enumStatusLoad.LOADING
    const response = await AuthApi.registration(payload)
    isAuthenticated.value = true
    user.value = response.data
    statusLoad.value = enumStatusLoad.LOADED
    return response
  }

  async function checkAuth() {
    if (isAuthenticated.value) return true
    statusLoad.value = enumStatusLoad.LOADING
    try {
      const response = await AuthApi.refresh()
      localStorage.setItem('token', response.data.tokens.accessToken)
      isAuthenticated.value = true
      user.value = response.data
      statusLoad.value = enumStatusLoad.LOADED
      return true
    } catch (e) {
      console.warn(e)
      return false
    }
  }

  return { isAuthenticated, user, statusLoad, deviceId, login, logout, registration, checkAuth }
})
