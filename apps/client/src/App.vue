<script setup lang="ts">
import { v4 } from 'uuid'
import { onBeforeMount, watch } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { storeToRefs } from 'pinia'
import { socket } from '@/api/socket'
import {getTypedLStorageItem, setTypedLStorageItem} from "@/common/typedLocalStorage";

const authStore = useAuthStore()
const { userId } = storeToRefs(authStore)

watch(userId, (newVal) => {
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
  const LsDeviceId = getTypedLStorageItem('deviceId')
  authStore.deviceId = LsDeviceId ? LsDeviceId : ''

  if (!LsDeviceId) {
    const deviceId = v4()
    authStore.deviceId = deviceId
    setTypedLStorageItem('deviceId', deviceId)
    setTypedLStorageItem('deviceId', deviceId)
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
