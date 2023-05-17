<template>
  <div class="layout-top-bar">
    <button class="p-link layout-menu-button layout-top-bar-button" @click="onMenuToggle()">
      <i class="mdi mdi-menu"></i>
    </button>

    <router-link to="/" class="layout-top-bar-logo">
      <app-logo font-size="40px" />
    </router-link>

    <button
      class="p-link layout-top-bar-menu-button layout-top-bar-button"
      @click="onTopBarMenuButton()"
    >
      <i class="mdi mdi-dots-vertical"></i>
    </button>

    <div class="layout-top-bar-menu" :class="topBarMenuClasses">
      <button class="p-link layout-top-bar-button">
        <i class="mdi mdi-cog-outline"></i>
        <span>Настройки</span>
      </button>
      <button class="p-link layout-top-bar-button">
        <i class="mdi mdi-account-outline"></i>
        <span>Профиль</span>
      </button>
      <button class="p-link layout-top-bar-button">
        <i class="mdi mdi-logout"></i>
        <span>logout</span>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import AppLogo from '@/components/AppLogo.vue'
import { computed, ref, onMounted, onBeforeUnmount } from 'vue'
import { useLayout } from '@/views/layout/composables/layout'

const { onMenuToggle } = useLayout()

const topBarMenuActive = ref(false)
const outsideClickListener = ref<null | ((e: Event) => void)>(null)

onMounted(() => {
  bindOutsideClickListener()
})

onBeforeUnmount(() => {
  unbindOutsideClickListener()
})

const onTopBarMenuButton = () => {
  topBarMenuActive.value = !topBarMenuActive.value
}

const topBarMenuClasses = computed(() => {
  return {
    'layout-top-bar-menu-mobile-active': topBarMenuActive.value
  }
})

const bindOutsideClickListener = () => {
  if (!outsideClickListener.value) {
    outsideClickListener.value = (event: Event) => {
      if (isOutsideClicked(event)) {
        topBarMenuActive.value = false
      }
    }
    document.addEventListener('click', outsideClickListener.value)
  }
}
const unbindOutsideClickListener = () => {
  if (outsideClickListener.value) {
    document.removeEventListener('click', outsideClickListener.value)
    outsideClickListener.value = null
  }
}
const isOutsideClicked = (event: Event) => {
  if (!topBarMenuActive.value) return

  const sidebarEl = document.querySelector('.layout-top-bar-menu')
  const topBarEl = document.querySelector('.layout-top-bar-menu-button')
  if (!sidebarEl || !topBarEl) return

  return !(
    sidebarEl.isSameNode(event.target as Node) ||
    sidebarEl.contains(event.target as Node) ||
    topBarEl.isSameNode(event.target as Node) ||
    topBarEl.contains(event.target as Node)
  )
}
</script>

<style scoped></style>
