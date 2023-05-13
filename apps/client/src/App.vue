<script setup lang="ts">
import { v4 } from 'uuid'
import { onBeforeMount } from 'vue'
import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()

onBeforeMount(() => {
  const LsDeviceId = localStorage.getItem('deviceId')
  authStore.deviceId = LsDeviceId ? LsDeviceId : ''

  if (!LsDeviceId) {
    const deviceId = v4()
    authStore.deviceId = deviceId
    localStorage.setItem('deviceId', deviceId)
  }
  if (import.meta.env.PROD) {
    window.addEventListener('beforeunload', function (e) {
      e.preventDefault()
      e.returnValue = ''
    })
  }
})
</script>

<template>
  <router-view />
</template>

<style scoped></style>
