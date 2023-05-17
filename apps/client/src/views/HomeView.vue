<template>
  <div>
    home
    <p-button @click="router.push({ name: 'signIn' })" />
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
const router = useRouter()
</script>
