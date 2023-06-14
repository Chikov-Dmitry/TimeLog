<template>
  <div class="text-3xl font-bold">Сегодня</div>
  <div class="text-xl font-semibold">
    {{ date.day }} ({{ date.dayShort }}) {{ date.monthShort }} {{ date.year }}г. {{ date.hour }}:{{
      date.minute
    }}
  </div>
</template>

<script setup lang="ts">
import { onBeforeMount, onBeforeUnmount, ref } from 'vue'
import { DateTime } from 'luxon'

type dateObj = {
  year: number
  monthShort: string
  month: number
  day: number
  dayShort: string
  hour: number
  minute: number
}

const date = ref<dateObj>({
  year: 0,
  monthShort: '',
  month: 0,
  dayShort: '',
  day: 0,
  hour: 0,
  minute: 0
})

const intervalId = ref<NodeJS.Timer>()

function fillDate() {
  const dt = DateTime.now()
  date.value = {
    year: dt.year,
    monthShort: dt.monthShort ? dt.monthShort : '',
    month: dt.month,
    dayShort: dt.weekdayShort ? dt.weekdayShort : '',
    day: dt.day,
    hour: dt.hour,
    minute: dt.minute
  }
}

onBeforeMount(() => {
  fillDate()
  intervalId.value = setInterval(() => {
    fillDate()
  }, 10000)
})
onBeforeUnmount(() => {
  clearInterval(intervalId.value)
})
</script>

<style scoped></style>
