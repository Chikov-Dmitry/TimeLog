import { defineStore } from 'pinia'
import { ref } from 'vue'
import { enumStatusLoad } from '@/common/enumStatusLoad'
import { IAuthUserResponseDto } from '@timelog/interfaces'
import AuthApi from '@/api/auth.api'
import axios, { AxiosError } from 'axios'
import { date } from 'yup'

export const useAuthStore = defineStore('auth', () => {
  const isAuthenticated = ref(false)
  const user = ref<IAuthUserResponseDto | null>(null)
  const statusLoad = ref(enumStatusLoad.NOT_STARTED)
  const deviceId = ref<string>('')

  async function login(email: string, password: string, deviceId: string) {
    const response = await AuthApi.login({ email, password, deviceId })
    isAuthenticated.value = true
    user.value = response.data
  }

  return { isAuthenticated, user, statusLoad, deviceId, login }
})
