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
        <div class="card h-full flex flex-column justify-content-center">
          <div class="text-2xl font-semibold">За месяц</div>
          <div class="flex align-items-center justify-content-between">
            <div class="text-4xl font-bold text-orange-500">160:05:32</div>
            <div
              class="flex align-items-center justify-content-center border-round"
              style="width: 6.5rem; height: 6.5rem"
            >
              <i class="mdi mdi-calendar-month-outline text-primary" style="font-size: 6rem"></i>
            </div>
          </div>
        </div>
      </div>
      <div class="col-12 md:col-4">
        <div class="card h-full flex flex-column justify-content-center">
          <div class="text-2xl font-semibold">За неделю</div>
          <div class="flex align-items-center justify-content-between">
            <div class="text-4xl font-bold text-green-500">40:24:32</div>
            <div
              class="flex align-items-center justify-content-center border-round"
              style="width: 6.5rem; height: 6.5rem"
            >
              <i class="mdi mdi-calendar-week-outline text-primary" style="font-size: 6rem"></i>
            </div>
          </div>
        </div>
      </div>
      <div class="col-12 md:col-4">
        <div class="card h-full flex flex-column justify-content-center">
          <div class="text-2xl font-semibold">Сегодня</div>
          <div class="flex align-items-center justify-content-between">
            <div class="text-4xl font-bold text-primary">8:43:32</div>
            <div
              class="flex align-items-center justify-content-center border-round"
              style="width: 6.5rem; height: 6.5rem"
            >
              <i class="mdi mdi-calendar-today-outline text-primary" style="font-size: 6rem"></i>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import TimerBtn from '@/components/TimerBtn.vue'
import TodayInfo from '@/components/TodayInfo.vue'
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
