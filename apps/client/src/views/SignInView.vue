<template>
  <div
    class="surface-ground flex align-items-center justify-content-center min-h-screen overflow-hidden"
  >
    <div class="flex flex-column align-items-center justify-content-center">
      <app-logo class="mb-5" font-size="100px" />

      <div
        style="
          border-radius: 6px;
          padding: 0.3rem;
          background: linear-gradient(180deg, var(--primary-color) 10%, rgba(59, 130, 246, 0) 40%);
        "
      >
        <div class="w-full surface-card py-8 px-5 sm:px-8" style="border-radius: 3px">
          <div class="text-center mb-5">
            <div class="text-900 text-3xl font-medium mb-3">Вход</div>
          </div>

          <div>
            <Form @submit="onSubmit" :validation-schema="schema">
              <validate-input-text
                label="Email"
                name="email"
                placeholder="Email"
                type="email"
                class="mb-5"
              />
              <validate-input-text
                label="Пароль"
                name="password"
                placeholder="Пароль"
                type="password"
                class="w-full md:w-30rem mb-5"
              />

              <pButton label="Войти" class="w-full p-3 text-xl" type="submit"></pButton>
            </Form>
            <pToast />
          </div>
          <div class="flex align-items-center justify-content-center mt-5">
            <span>Не зарегистрированы?</span>
            <a
              class="font-medium no-underline ml-2 text-right cursor-pointer"
              style="color: var(--primary-color)"
              @click="router.push({ name: 'signUp' })"
              >Зарегистрировать</a
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { Form } from 'vee-validate'
import * as Yup from 'yup'
import ValidateInputText from '@/components/ValidateInputText.vue'
import axios from 'axios'

import { useToast } from 'primevue/usetoast'
import AppLogo from '@/components/AppLogo.vue'
const toast = useToast()

const authStore = useAuthStore()
const { login } = authStore

const router = useRouter()

async function onSubmit(values: Record<string, string>) {
  try {
    await login(values.email, values.password, authStore.deviceId)

    await router.push({ name: 'home' })
  } catch (e) {
    if (axios.isAxiosError(e)) {
      if (e.response) {
        const message = e.response.data.message
        toast.add({ severity: 'error', summary: 'Ошибка', detail: `${message}`, life: 5000 })
      }
    } else {
      toast.add({
        severity: 'error',
        summary: 'Ошибка',
        detail: 'непредвиденная ошибка',
        life: 5000
      })
    }
  }
}

const schema = Yup.object().shape({
  email: Yup.string().email('Не валидный email').required('Обязательное поле'),
  password: Yup.string().required('Обязательное поле')
})
</script>

<style scoped></style>
