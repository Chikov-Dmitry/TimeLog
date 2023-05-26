import { toRefs, reactive, computed } from 'vue'

const mobileBreakpoint = 991

const layoutConfig = reactive({
  ripple: false,
  darkTheme: false,
  inputStyle: 'outlined',
  menuMode: 'static',
  theme: 'lara-light-blue',
  scale: 14,
  activeMenuItem: null
})

const layoutState = reactive({
  staticMenuDesktopInactive: false,
  overlayMenuActive: false,
  profileSidebarVisible: false,
  configSidebarVisible: false,
  staticMenuMobileActive: false,
  menuHoverActive: false
})

export function useLayout() {
  const changeThemeSettings = (theme: string, darkTheme: boolean) => {
    layoutConfig.darkTheme = darkTheme
    layoutConfig.theme = theme
  }

  const setScale = (scale: number) => {
    layoutConfig.scale = scale
  }

  const setActiveMenuItem = (item: any) => {
    layoutConfig.activeMenuItem = item.value || item
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
    changeThemeSettings,
    setScale,
    onMenuToggle,
    isSidebarActive,
    isDarkTheme,
    isMobileScreenWidth,
    setActiveMenuItem
  }
}
