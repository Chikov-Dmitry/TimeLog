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
            <div class="text-900 text-3xl font-medium mb-3">Регистрация</div>
          </div>

          <div>
            <label for="name" class="block text-900 text-xl font-medium mb-2">Имя</label>
            <pInputText
              id="name"
              type="text"
              placeholder="Имя"
              class="w-full md:w-30rem mb-5"
              style="padding: 1rem"
              v-model="name"
            />

            <label for="surname" class="block text-900 text-xl font-medium mb-2">Фамилия</label>
            <pInputText
              id="surname"
              type="text"
              placeholder="Фамилия"
              class="w-full md:w-30rem mb-5"
              style="padding: 1rem"
              v-model="surname"
            />

            <label for="patronymic" class="block text-900 text-xl font-medium mb-2">Отчество</label>
            <pInputText
              id="patronymic"
              type="text"
              placeholder="Отчество"
              class="w-full md:w-30rem mb-5"
              style="padding: 1rem"
              v-model="patronymic"
            />

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

            <label for="password2" class="block text-900 font-medium text-xl mb-2"
              >Подтверждение пароля</label
            >
            <pPassword
              id="password2"
              v-model="password2"
              :feedback="false"
              placeholder="Пароль"
              :toggleMask="true"
              class="w-full mb-5"
              :class="{ 'p-invalid': !equalPasswords }"
              inputClass="w-full"
              :inputStyle="{ padding: '1rem' }"
            ></pPassword>

            <pButton label="Зарегистрировать" class="w-full p-3 text-xl" @click="signUp"></pButton>
          </div>
          <div class="flex align-items-center justify-content-center mt-5">
            <span>Уже зарегистрированы?</span>
            <a
              class="font-medium no-underline ml-2 text-right cursor-pointer"
              style="color: var(--primary-color)"
              @click="router.push({name: 'signIn'})"
              >Войти</a
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const name = ref('')
const surname = ref('')
const patronymic = ref('')
const email = ref('')
const password = ref('')
const password2 = ref('')

const equalPasswords = computed(() => {
  return !(password2.value && password.value !== password2.value);
})

function signUp() {
  console.log(name.value)
  console.log(surname.value)
  console.log(patronymic.value)
}
</script>

<style scoped></style>
