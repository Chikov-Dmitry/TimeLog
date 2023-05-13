<template>
  <div class="app-logo" style="color: var(--primary-color)" :style="{ 'font-size': fontSize }">
    T<div class="expand-part">ime</div>L<div class="expand-part">og</div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  fontSize: string
}>()
</script>

<style scoped>
.app-logo {
  cursor: pointer;
  display: flex;
}
.expand-part{
  max-width: 0;
  overflow: hidden;
  transition: max-width .4s ease-in-out;
}
.app-logo:hover .expand-part{
  max-width: 300px;
}
</style>
