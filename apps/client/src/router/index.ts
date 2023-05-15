import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import SignUpView from '@/views/SignUpView.vue'
import SignInView from '@/views/SignInView.vue'
import { useAuthStore } from '@/stores/auth'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/sign-up',
      name: 'signUp',
      component: SignUpView
    },
    {
      path: '/sign-in',
      name: 'signIn',
      component: SignInView
    }
  ]
})

router.beforeEach(async (to, from) => {
  const publicPages = ['/sign-in', '/sign-up']
  const authRequired = !publicPages.includes(to.path)
  const authStore = useAuthStore()
  const { checkAuth } = authStore
  await checkAuth()
  if (authRequired && !authStore.isAuthenticated) {
    console.warn('canceled navigation', { message: 'not authenticated' })
    return { name: 'signIn' }
  }
  if (authStore.isAuthenticated && (to.name === 'signIn' || to.name === 'signUp')) {
    console.warn('canceled navigation', { message: 'do sign out before going sign in' })
    return { name: from.name ? from.name : 'home' }
  }
})

export default router
