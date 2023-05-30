import { toRefs, reactive, computed } from 'vue'

const mobileBreakpoint = 991

export interface ITheme {
  name: 'light-blue' | 'dark-blue',
  mode: 'light' | 'dark'
}

const layoutConfig = reactive({
  ripple: false,
  darkTheme: false,
  inputStyle: 'outlined',
  menuMode: 'static',
  theme: 'light-blue',
  scale: 14
})

const layoutState = reactive({
  staticMenuDesktopInactive: false,
  overlayMenuActive: false,
  profileSidebarVisible: false,
  configSidebarVisible: false,
  staticMenuMobileActive: false,
  menuHoverActive: false,
  activeMenuItem: 0
})

export function useLayout() {
  const setScale = (scale: number) => {
    layoutConfig.scale = scale
  }

  const onMenuToggle = () => {
    if (layoutConfig.menuMode === 'overlay') {
      layoutState.overlayMenuActive = !layoutState.overlayMenuActive
    }

    if (window.innerWidth > mobileBreakpoint) {
      layoutState.staticMenuDesktopInactive = !layoutState.staticMenuDesktopInactive
    } else {
      layoutState.staticMenuMobileActive = !layoutState.staticMenuMobileActive
    }
  }

  const isSidebarActive = computed(
    () => layoutState.overlayMenuActive || layoutState.staticMenuMobileActive
  )

  const isMobileScreenWidth = () => {
    return window.innerWidth < mobileBreakpoint
  }

  const isDarkTheme = computed(() => layoutConfig.darkTheme)

  return {
    layoutConfig: toRefs(layoutConfig),
    layoutState: toRefs(layoutState),
    setScale,
    onMenuToggle,
    isSidebarActive,
    isDarkTheme,
    isMobileScreenWidth
  }
}
