<template>
  <div class="layout-wrapper" :class="containerClass">
    <app-top-bar />
    <div class="layout-sidebar">
      <app-menu />
    </div>
    <div class="layout-main-container">
      <div class="layout-main">
        <router-view></router-view>
      </div>
    </div>
    <div class="layout-mask"></div>
  </div>
</template>

<script setup lang="ts">
import './styles/layout.scss'
import { computed, ref, watch } from 'vue'
import { useLayout } from '@/views/layout/composables/layout'
import AppTopBar from '@/views/layout/AppTopBar.vue'
import AppMenu from '@/views/layout/AppMenu.vue'
const { layoutConfig, layoutState, isSidebarActive } = useLayout()

const outsideClickListener = ref<null | ((e: Event) => void)>(null)

watch(isSidebarActive, (newVal) => {
  if (newVal) {
    bindOutsideClickListener()
  } else {
    unbindOutsideClickListener()
  }
})

const containerClass = computed(() => {
  return {
    'layout-theme-light': !layoutConfig.darkTheme.value,
    'layout-theme-dark': layoutConfig.darkTheme.value,
    'layout-overlay': layoutConfig.menuMode.value === 'overlay',
    'layout-static': layoutConfig.menuMode.value === 'static',
    'layout-static-inactive':
      layoutState.staticMenuDesktopInactive.value && layoutConfig.menuMode.value === 'static',
    'layout-overlay-active': layoutState.overlayMenuActive.value,
    'layout-mobile-active': layoutState.staticMenuMobileActive.value,
    'p-input-filled': layoutConfig.inputStyle.value === 'filled',
    'p-ripple-disabled': !layoutConfig.ripple.value
  }
})

const bindOutsideClickListener = () => {
  if (!outsideClickListener.value) {
    outsideClickListener.value = (event) => {
      if (isOutsideClicked(event)) {
        layoutState.overlayMenuActive.value = false
        layoutState.staticMenuMobileActive.value = false
        layoutState.menuHoverActive.value = false
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
  const sidebarEl = document.querySelector('.layout-sidebar')
  const topBarEl = document.querySelector('.layout-menu-button')

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
