<template>
  <li :class="{ 'active-menuitem': isActiveMenu }">
    <router-link
      v-if="item.to"
      @click="itemClick()"
      :class="[{ 'active-route': checkActiveRoute(item) }]"
      tabindex="0"
      :to="item.to"
    >
      <i :class="item.icon" class="layout-menuitem-icon"></i>
      <span class="layout-menuitem-text">{{ item.label }}</span>
    </router-link>
  </li>
</template>

<script setup lang="ts">
import { ref, watch, onBeforeMount } from 'vue'
import { useRoute } from 'vue-router'
import { useLayout } from '@/views/layout/composables/layout'
import { menuItem } from '@/views/layout/AppMenu.vue'

const route = useRoute()

const { layoutState, onMenuToggle } = useLayout()

interface IProps {
  item: menuItem
  index: number
}

const props = defineProps<IProps>()

const isActiveMenu = ref(false)

onBeforeMount(() => {
  const activeItem = layoutState.activeMenuItem

  isActiveMenu.value = activeItem.value === props.index
})

watch(
  () => layoutState.activeMenuItem.value,
  (newVal) => {
    isActiveMenu.value = newVal === props.index
  }
)
const itemClick = () => {
  const { overlayMenuActive, staticMenuMobileActive } = layoutState

  if (staticMenuMobileActive.value || overlayMenuActive.value) {
    onMenuToggle()
  }

  layoutState.activeMenuItem.value = props.index
}

const checkActiveRoute = (item: menuItem) => {
  return route.path === item.to
}
</script>

<style scoped></style>
