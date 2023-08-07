<template>
  <ul class="layout-menu">
    <template v-for="(item, i) in menuItems" :key="item">
      <app-menu-item :item="item" :index="i"></app-menu-item>
    </template>
  </ul>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import AppMenuItem from '@/views/layout/AppMenuItem.vue'

export type menuItem = { label: string; icon: string; to: string }

const menuItems = ref<menuItem[]>([
  { label: 'Доска', icon: 'mdi mdi-home-outline', to: '/' },
  { label: 'За работой', icon: 'mdi mdi-briefcase-outline', to: '/atwork' },
  { label: 'Онлайн', icon: 'mdi mdi-record-circle-outline', to: '/online' },
  { label: 'Профиль', icon: 'mdi mdi-account-outline', to: '/profile' },
  { label: 'Настройки', icon: 'mdi mdi-cog-outline', to: '/settings' }
])
</script>

<style scoped></style>
