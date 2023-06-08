<template>
  <div class="card h-full flex flex-column justify-content-center relative cursor-pointer">
    <div
      v-if="statusLoad === enumStatusLoad.NOT_STARTED || statusLoad === enumStatusLoad.LOADING"
      class="flex justify-content-center"
    >
      <p-progress-spinner />
    </div>
    <div v-if="statusLoad === enumStatusLoad.LOADED">
      <div class="text-2xl font-semibold">{{ title }}</div>
      <div class="flex align-items-center justify-content-between">
        <div class="text-4xl font-bold text-primary">{{ timeStr }}</div>
        <div
          class="flex align-items-center justify-content-center border-round"
          style="width: 6.5rem; height: 6.5rem"
        >
          <i class="mdi mdi-calendar-today-outline text-primary" style="font-size: 6rem"></i>
        </div>
      </div>
      <p-button
        @click="updateClick"
        class="update-btn"
        icon="mdi mdi-reload"
        size="large"
        text
        rounded
        aria-label="обновить"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { onBeforeMount, ref } from 'vue'
import TimeLogApi from '@/api/time-log.api'
import { useAuthStore } from '@/stores/auth'
import { DateTime, Interval, Duration } from 'luxon'
import { enumStatusLoad } from '@/common/enumStatusLoad'

const props = defineProps<{
  title: string
  for: 'day' | 'week' | 'month'
}>()

const statusLoad = ref(enumStatusLoad.NOT_STARTED)

const authStore = useAuthStore()
const timeStr = ref('')

const fetchLogs = async function () {
  const userId = authStore.userId
  if (!userId) return
  const now = DateTime.now()
  const startOf = now.startOf(props.for).toMillis().toString()
  const endOf = now.toMillis().toString()
  const res = await TimeLogApi.getLogsByTimeRange({
    userId: userId,
    startTimestamp: startOf,
    endTimestamp: endOf
  })
  return res.data
}

const calculateTime = async function () {
  statusLoad.value = enumStatusLoad.LOADING
  const logs = await fetchLogs()
  if (!logs) {
    console.error('Ошибка при запросе записей')
    return
  }
  let totalMilliseconds = 0
  logs.forEach((log) => {
    const start = DateTime.fromMillis(Number(log.startDate))
    const end = log.endDate ? DateTime.fromMillis(Number(log.endDate)) : DateTime.now()
    const interval = Interval.fromDateTimes(start, end)
    totalMilliseconds += interval.toDuration().toMillis()
  })
  const dur = Duration.fromMillis(totalMilliseconds).shiftTo('hours', 'minutes', 'seconds')
  timeStr.value = `${dur.hours}:${dur.minutes}:${Math.trunc(dur.seconds)}`
  statusLoad.value = enumStatusLoad.LOADED
}

onBeforeMount(async () => {
  await calculateTime()
})

function updateClick() {
  calculateTime()
}
</script>

<style scoped>
.update-btn {
  position: absolute;
  top: 0;
  right: 0;
}
</style>
