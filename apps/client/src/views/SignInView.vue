<template>
  <div
    class="surface-ground flex align-items-center justify-content-center min-h-screen min-w-screen overflow-hidden"
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
            <div class="text-900 text-3xl font-medium mb-3">Вход</div>
          </div>

          <div>
            <label for="email" class="block text-900 text-xl font-medium mb-2">Email</label>
            <pInputText
              id="email"
              type="email"
              placeholder="Email"
              class="w-full md:w-30rem mb-5"
              style="padding: 1rem"
              v-model="email"
            />

            <label for="password" class="block text-900 font-medium text-xl mb-2">Пароль</label>
            <pPassword
              id="password"
              v-model="password"
              :feedback="false"
              placeholder="Пароль"
              :toggleMask="true"
              class="w-full mb-5"
              inputClass="w-full"
              :inputStyle="{ padding: '1rem' }"
            ></pPassword>

            <pButton label="Войти" class="w-full p-3 text-xl" @click="signIn"></pButton>
          </div>
          <div class="flex align-items-center justify-content-center mt-5">
            <span>Не зарегистрированы?</span>
            <a
              class="font-medium no-underline ml-2 text-right cursor-pointer"
              style="color: var(--primary-color)"
              @click="router.push({name: 'signUp'})"
            >Зарегистрировать</a
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import {useAuthStore} from "@/stores/auth";

const authStore = useAuthStore()
const {login} = authStore

const router = useRouter()

const email = ref('')
const password = ref('')



async function signIn() {
  await login(email.value, password.value, authStore.deviceId)
  await router.push({name: 'home'})
}
</script>

<style scoped></style>
