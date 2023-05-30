<template>
  <div class="card">
    <div class="text-xl font-semibold ml-2 mb-4">Тема</div>
    <div class="flex justify-content-center gap-3">
      <p-button label="Светлая" @click="onChangeTheme({ name: 'light-blue', mode: 'light' })" />
      <p-button
        label="Темная"
        severity="secondary"
        @click="onChangeTheme({ name: 'dark-blue', mode: 'dark' })"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ITheme } from '@/views/layout/composables/layout'
import { usePrimeVue } from 'primevue/config'
import { getTypedLStorageItem, setTypedLStorageItem } from '@/common/typedLocalStorage'

const PrimeVue = usePrimeVue()

const onChangeTheme = (theme: ITheme) => {
  const currentTheme = getTypedLStorageItem('theme')
  //ts swears that there is no property changeTheme, but it works
  // @ts-ignore
  PrimeVue.changeTheme(currentTheme.name, theme.name, 'theme-css', () => {})

  setTypedLStorageItem('theme', theme)
}
</script>

<style scoped></style>
