<template>
  <div>
    <div class="grid mb-5">
      <div class="col-12 sm:col-6 md:col-4">
        <div class="card h-full flex flex-column justify-content-center today-card">
          <today-info />
        </div>
      </div>
      <div class="col-12 sm:col-6 md:col-4 md:col-offset-4">
        <div
          class="card h-full flex align-items-center justify-content-around text-xl font-semibold"
        >
          <timer-btn />
        </div>
      </div>
    </div>
    <div class="grid stat-block">
      <div class="col-12 md:col-4">
        <total-time-card title="За Месяц" for="month" />
      </div>
      <div class="col-12 md:col-4">
        <total-time-card title="За неделю" for="week" />
      </div>
      <div class="col-12 md:col-4">
        <total-time-card title="Сегодня" for="day" />
      </div>
    </div>
    <div class="grid">
      <div class="col-12">
        <day-chart />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import TimerBtn from '@/components/TimerBtn.vue'
import TodayInfo from '@/components/TodayInfo.vue'
import TotalTimeCard from '@/components/TotalTimeCard.vue'
import DayChart from '@/components/DayChart.vue'
</script>

<style scoped lang="scss">
@media (max-width: 576px) {
  .today-card {
    align-items: center;
  }
  .stat-block {
    flex-direction: column-reverse;
  }
}
</style>
