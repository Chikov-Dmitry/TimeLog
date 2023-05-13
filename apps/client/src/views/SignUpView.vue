<template>
  <div
    class="surface-ground flex align-items-center justify-content-center min-h-screen overflow-hidden"
  >
    <div class="flex flex-column align-items-center justify-content-center">
      <div class="mb-5 text-8xl" style="color: var(--primary-color)">TL</div>

      <div
        style="
          border-radius: 6px;
          padding: 0.3rem;
          background: linear-gradient(180deg, var(--primary-color) 10%, rgba(59, 130, 246, 0) 40%);
        "
      >
        <div class="w-full surface-card py-8 px-5 sm:px-8" style="border-radius: 3px">
          <div class="text-center mb-5">
            <div class="text-900 text-3xl font-medium mb-3">Регистрация</div>
          </div>

          <div>
            <Form @submit="onSubmit" :validation-schema="schema">
              <validate-input-text label="Имя" name="name" placeholder="Имя" class="mb-5" />

              <validate-input-text
                label="Фамилия"
                name="surname"
                placeholder="Фамиия"
                class="mb-5 md:w-30rem"
              />

              <validate-input-text
                label="Отчество"
                name="patronymic"
                placeholder="Отчество"
                class="mb-5 md:w-30rem"
              />

              <validate-input-text
                label="Email"
                name="email"
                type="email"
                placeholder="Email"
                class="mb-5 md:w-30rem"
              />

              <validate-input-text
                label="Пароль"
                name="password"
                type="password"
                placeholder="Пароль"
                class="mb-5 md:w-30rem"
              />

              <validate-input-text
                label="Пароль"
                name="password2"
                type="password"
                placeholder="Пароль"
                class="mb-5 md:w-30rem"
              />

              <pButton label="Зарегистрировать" class="w-full p-3 text-xl" type="submit"></pButton>
            </Form>
            <p-toast />
          </div>
          <div class="flex align-items-center justify-content-center mt-5">
            <span>Уже зарегистрированы?</span>
            <a
              class="font-medium no-underline ml-2 text-right cursor-pointer"
              style="color: var(--primary-color)"
              @click="router.push({ name: 'signIn' })"
              >Войти</a
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import ValidateInputText from '@/components/ValidateInputText.vue'
import { Form } from 'vee-validate'
import * as Yup from 'yup'
import { useAuthStore } from '@/stores/auth'
import axios from 'axios'
import { useToast } from 'primevue/usetoast'
const toast = useToast()

const authStore = useAuthStore()

const { registration } = authStore

const router = useRouter()

const schema = Yup.object().shape({
  name: Yup.string().required('Обязательное поле'),
  surname: Yup.string().required('Обязательное поле'),
  patronymic: Yup.string().required('Обязательное поле'),
  email: Yup.string().email('Не валидный email').required('Обязательное поле'),
  password: Yup.string().required('Обязательное поле').min(8),
  password2: Yup.string()
    .required('Обязательное поле')
    .oneOf([Yup.ref('password')], 'Пароли не совпадают')
})

async function onSubmit(values: Record<string, string>) {
  const { name, surname, patronymic, email, password } = values
  const deviceId = authStore.deviceId
  try {
    await registration({ name, surname, patronymic, email, password, deviceId })

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
</script>

<style scoped></style>
