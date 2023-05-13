<script setup lang="ts">
import { toRef } from 'vue'
import { useField } from 'vee-validate'

const props = defineProps({
  type: {
    type: String,
    default: 'text'
  },
  value: {
    type: String,
    default: ''
  },
  name: {
    type: String,
    required: true
  },
  label: {
    type: String,
    required: true
  },
  successMessage: {
    type: String,
    default: ''
  },
  placeholder: {
    type: String,
    default: ''
  }
})

const name = toRef(props, 'name')

const {
  value: inputValue,
  errorMessage,
  handleBlur,
  handleChange,
  meta
} = useField(name, undefined, {
  initialValue: props.value
})
</script>

<template>
  <div class="InputText">
    <label :for="name" class="block text-900 text-xl font-medium mb-2">{{ label }}</label>
    <p-password
      v-if="type === 'password'"
      :id="name"
      :name="name"
      v-model="inputValue"
      :placeholder="placeholder"
      :toggleMask="true"
      :feedback="false"
      @input="handleChange"
      @blur="handleBlur"
      class="w-full"
      inputClass="w-full"
      :inputStyle="{ padding: '1rem' }"
      :class="{ 'p-invalid': !!errorMessage }"
    />
    <pInputText
      v-else
      :id="name"
      :name="name"
      :type="type"
      :value="inputValue"
      :placeholder="placeholder"
      @input="handleChange"
      @blur="handleBlur"
      class="w-full"
      style="padding: 1rem"
      :class="{ 'p-invalid': !!errorMessage }"
    />

    <span :class="{ 'p-error': !!errorMessage }" v-show="errorMessage || meta.valid">
      {{ errorMessage || successMessage }}
    </span>
  </div>
</template>

<style scoped></style>
