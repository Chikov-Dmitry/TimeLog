<template>
  <div class="card">
    <div class="inline-block font-semibold mr-4" style="min-width: 70px">Имя:</div>
    {{ user.name }}
  </div>
  <div class="card">
    <div class="inline-block font-semibold mr-4" style="min-width: 70px">Фамилия:</div>
    {{ user.surname }}
  </div>
  <div class="card">
    <div class="inline-block font-semibold mr-4" style="min-width: 70px">Отчество:</div>
    {{ user.patronymic }}
  </div>
  <div class="card">
    <div class="inline-block font-semibold mr-4" style="min-width: 70px">Email:</div>
    {{ user.email }}
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from '@/stores/auth'
import { storeToRefs } from 'pinia'
const authStore = useAuthStore()

const { user } = storeToRefs(authStore)
</script>

<style scoped></style>
