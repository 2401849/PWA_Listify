import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { authService } from '@/api/auth.service.ts'
import { jwtDecode } from 'jwt-decode'
import { clearApiHeaders } from '@/api/api.ts'
import router from '@/router'

export const useUserAuthStore = defineStore('userAuth', () => {
  const userToken = ref<string>(localStorage.getItem('token') || '')
  const refreshToken = ref<string>(localStorage.getItem('refreshToken') || '')

  const isTokenExpired = computed(() => {
    if (!userToken.value) return true
    try {
      const decoded: any = jwtDecode(userToken.value)
      return decoded.exp * 1000 < Date.now()
    } catch (error) {
      return true
    }
  })

  const login = async (credentials: { username: string; password: string }) => {
    const { access_token, refresh_token } = await authService.login(credentials)
    userToken.value = access_token
    refreshToken.value = refresh_token
    localStorage.setItem('token', access_token)
    localStorage.setItem('refreshToken', refresh_token)
  }

  const isAdmin = computed(() => {
    if (!userToken.value) return false

    try {
      const decoded: any = jwtDecode(userToken.value)
      return decoded.isAdmin === true
    } catch (error) {
      return false
    }
  })

  const username = computed(() => {
    if (!userToken.value) return null
    try {
      const decoded: any = jwtDecode(userToken.value)
      return decoded.username || null
    } catch (error) {
      return null
    }
  })

  const logout = async () => {
    userToken.value = ''
    refreshToken.value = ''
    localStorage.removeItem('token')
    localStorage.removeItem('refreshToken')
    clearApiHeaders()
    await router.push('/login')
  }

  const refreshAccessToken = async () => {
    if (!refreshToken.value) return

    const { access_token, refresh_token } = await authService.refreshToken(refreshToken.value)
    userToken.value = access_token
    refreshToken.value = refresh_token
    localStorage.setItem('token', access_token)
    localStorage.setItem('refreshToken', refresh_token)
  }

  return {
    userToken,
    refreshToken,
    isTokenExpired,
    login,
    logout,
    refreshAccessToken,
    isAdmin,
    username,
  }
})
