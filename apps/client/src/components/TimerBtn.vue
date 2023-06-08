<template>
  <span v-if="!isStarted">Запустить таймер</span>
  <span v-else>Остановить таймер</span>
  <p-button
    @click="btnClick"
    class="timer-btn"
    :icon="btnIcon"
    style="font-size: 3rem; width: 60px; height: 60px"
    :severity="!isStarted ? 'success' : 'danger'"
  />
</template>

<script setup lang="ts">
import { computed, onBeforeMount, ref } from 'vue'
import TimeLogApi from '@/api/time-log.api'
import { useAuthStore } from '@/stores/auth'
import { DateTime } from 'luxon'

const authStore = useAuthStore()

const isStarted = ref(false)
const currentStartedLogId = ref<string | null>(null)

const btnIcon = computed(() => {
  return isStarted.value ? 'mdi mdi-stop' : 'mdi mdi-play'
})

const btnClick = async function () {
  const userId = authStore.userId
  if (!userId) return
  const dt = DateTime.now()
  const timeStamp = dt.toMillis()
  if (!isStarted.value) {
    let res = await TimeLogApi.createLogEntry({
      user: authStore.userId,
      startDate: timeStamp.toString()
    })
    currentStartedLogId.value = res.data.id
  } else if (isStarted.value) {
    if (!currentStartedLogId.value) return
    await TimeLogApi.stopLogEntry(currentStartedLogId.value, { endDate: timeStamp.toString() })
    currentStartedLogId.value = null
  }

  isStarted.value = !isStarted.value
}

async function getStartedButNotStoppedLog() {
  if (!authStore.userId) return
  const res = await TimeLogApi.getStartedButNotStoppedLog(authStore.userId)
  const log = res.data
  if (log) {
    isStarted.value = true
    currentStartedLogId.value = log.id
  }
}

onBeforeMount(async () => {
  await getStartedButNotStoppedLog()
})
</script>

<style scoped lang="scss">
@import '@/assets/variables.scss';

.timer-btn {
  border-radius: $borderRadius;
}
</style>
