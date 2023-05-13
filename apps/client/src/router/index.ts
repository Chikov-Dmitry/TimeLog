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

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()
  const isAuthenticated = false
  if (to.name !== 'signUp' && to.name !== 'signIn' && !authStore.isAuthenticated) {
    console.warn('canceled navigation', { message: 'not authenticated' })
    next({ name: 'signIn' })
  }else if(authStore.isAuthenticated && (to.name === 'signIn' || to.name === 'signUp')){
    console.warn('canceled navigation', { message: 'do sign out before going sign in' })
    next({name: from.name? from.name : 'home'})
  } else next()
})

export default router
