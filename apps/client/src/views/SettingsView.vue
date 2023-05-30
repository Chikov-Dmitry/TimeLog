<template>
  <div class="card">
    <div class="text-xl font-semibold ml-2 mb-4">Тема</div>
    <div class="flex justify-content-center gap-3">
      <p-button :disabled="themeMode === 'light'" label="Светлая"  @click="onChangeTheme('light')"/>
      <p-button :disabled="themeMode === 'dark'" label="Темная" severity="secondary"  @click="onChangeTheme('dark')"/>
    </div>
  </div>
</template>

<script setup lang="ts">
import {ref} from "vue";
import { usePrimeVue } from 'primevue/config';
const PrimeVue = usePrimeVue();

const themeMode = ref<"light"| "dark">('light')

const onChangeTheme = (mode: 'light' | 'dark') => {
  //ts swears that there is no property changeTheme, but it works
  if(mode === 'light') {
    themeMode.value = 'light'
    PrimeVue.changeTheme('dark-blue', 'light-blue', 'theme-css', () => {});
  }
  if(mode === 'dark'){
    themeMode.value = 'dark'
    PrimeVue.changeTheme('light-blue', 'dark-blue', 'theme-css', () => {});
  }


};
</script>

<style scoped></style>
