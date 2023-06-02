<template>
  <span v-if="!isStarted">Запустить таймер</span>
  <span v-else>Остановить таймер</span>
  <p-button @click="btnClick" class="timer-btn" :icon="btnIcon" style="font-size: 3rem; width: 60px; height: 60px"/>
</template>

<script setup lang="ts">
import {computed, ref} from "vue";

const isStarted = ref(false)

const btnIcon = computed(()=>{
  return isStarted.value ? "mdi mdi-stop" : "mdi mdi-play"
})

const btnClick = function () {
  isStarted.value = !isStarted.value
}
</script>

<style scoped lang="scss">
@import "@/assets/variables.scss";

.timer-btn{
  border-radius: $borderRadius;
}
</style>