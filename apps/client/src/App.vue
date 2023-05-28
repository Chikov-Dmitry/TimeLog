<script setup lang="ts">
import { v4 } from 'uuid'
import { onBeforeMount, watch } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { storeToRefs } from 'pinia'
import { socket } from '@/api/socket'

const authStore = useAuthStore()
const { userId } = storeToRefs(authStore)

watch(userId, (newVal, old) => {
  if (!newVal) socket.disconnect()
  else if (newVal) {
    const qUserId = socket.io.opts.query?.userId
    if (!qUserId || qUserId !== newVal) {
      if (socket.io.opts.query) socket.io.opts.query.userId = newVal
    }
    socket.connect()
  }
})

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
