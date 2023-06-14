import { mount } from '@vue/test-utils'
import AppLogo from '@/components/AppLogo.vue'
import { test, expect } from 'vitest'

test(`app-logo component`, async () => {
  expect(AppLogo).toBeTruthy()

  const component = mount(AppLogo, {
    props: {
      fontSize: '14px'
    }
  })

  expect(component.text()).toContain('T ime L og')
})
