<template>
  <div class="card relative">
    <p-chart class="w-full relative" type="bar" :data="chartData" :options="chartOptions" />
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import TimeLogApi from '@/api/time-log.api'
import { DateTime, Duration } from 'luxon'
import { useAuthStore } from '@/stores/auth'
import { ITimeLogResponseDto } from '@timelog/interfaces'
import { ChartData, TooltipItem } from 'chart.js'

const authStore = useAuthStore()

const fetchLogs = async function () {
  const userId = authStore.userId
  if (!userId) return
  const now = DateTime.now()
  const startOf = now.startOf('day').toMillis().toString()
  const endOf = now.toMillis().toString()
  const res = await TimeLogApi.getLogsByTimeRange({
    userId: userId,
    startTimestamp: startOf,
    endTimestamp: endOf
  })
  return res.data
}

onMounted(async () => {
  logs.value = await fetchLogs()
  chartData.value = setChartData()
  chartOptions.value = setChartOptions()
})

const chartData = ref()
const chartOptions = ref()
const logs = ref<ITimeLogResponseDto[]>()

type dataItem = { value: number; key: number; log: ITimeLogResponseDto }

const parseLogsForDataSet = function () {
  const documentStyle = getComputedStyle(document.body)

  const datasets: ChartData<'bar', dataItem[]> = {
    datasets: [
      {
        data: [],
        backgroundColor: documentStyle.getPropertyValue('--blue-500'),
        parsing: {
          xAxisKey: 'key',
          yAxisKey: 'value'
        }
      }
    ]
  }
  const data: dataItem[] = []
  if (!logs.value) return datasets
  logs.value.forEach((log) => {
    const startDate = DateTime.fromMillis(Number(log.startDate))
    const endDate = log.endDate ? DateTime.fromMillis(Number(log.endDate)) : DateTime.now()
    const dur = Duration.fromMillis(endDate.toMillis() - startDate.toMillis()).shiftTo('hours')
    data.push({ value: dur.hours, log: log, key: dur.hours })
  })
  datasets.datasets[0].data = data
  return datasets.datasets
}

const parseLogsForLabels = function (): string[] {
  const arr: string[] = []
  if (!logs.value) return []
  logs.value.forEach((log) => {
    const startDate = DateTime.fromMillis(Number(log.startDate))
    const endDate = log.endDate ? DateTime.fromMillis(Number(log.endDate)) : DateTime.now()
    arr.push(`${startDate.hour}:${startDate.minute}: ${endDate.hour}:${endDate.minute}`)
  })
  return arr
}

const setChartData = () => {
  let obj = {
    labels: parseLogsForLabels(),
    datasets: parseLogsForDataSet()
  }
  if (!logs.value) return

  return obj
}

const setChartOptions = () => {
  return {
    plugins: {
      tooltip: {
        callbacks: {
          label: function (context: TooltipItem<'bar'>) {
            const dataIndex = context.dataIndex
            const data = context.dataset.data[dataIndex] as unknown as dataItem
            const log = data.log
            const DT = Duration.fromMillis(Number(log.endDate) - Number(log.startDate)).shiftTo(
              'hours',
              'minutes',
              'seconds',
              'milliseconds'
            )
            return `Время (Часы:Минуты:Секунды) ${DT.hours}:${DT.minutes}:${DT.seconds}`
          }
        }
      }
    }
  }
}
</script>

<style scoped></style>
