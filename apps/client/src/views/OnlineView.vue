<template>
  <div class="card">
    <p class="text-xl font-semibold">Список пользователей online</p>
    <p-data-table :value="users" sortField="surname" :sortOrder="1" :loading="loading">
      <template #loading>
        <p-progress-bar mode="indeterminate" style="height: 6px; width: 100%" />
      </template>
      <p-column field="surname" header="Фамилия"></p-column>
      <p-column field="name" header="Имя"></p-column>
      <p-column field="patronymic" header="Отчество"></p-column>
      <p-column field="email" header="Email"></p-column>
      <p-column field="onWork" header="Работает">
        <template #body="slotProps">
          <span
            class="work-status-circle mdi mdi-circle"
            :class="[slotProps.data.onWork ? 'online' : 'offline']"
          />
        </template>
      </p-column>
    </p-data-table>
  </div>
</template>

<script setup lang="ts">
import { onBeforeMount, ref, watch } from 'vue'
import { socket } from '@/api/socket'
import { UserOnlineDto } from '@timelog/interfaces'

const users = ref<
  {
    id: string
    name: string
    surname: string
    patronymic: string
    email: string
    onWork: boolean
  }[]
>([])
const loading = ref(true)

const userIdsOnlineList = ref<UserOnlineDto>([])

watch(userIdsOnlineList, (newV) => {
  users.value = []
  newV.forEach((el) => {
    users.value.push(el)
  })
  loading.value = false
})

onBeforeMount(() => {
  socket.on('onlineList', function (data) {
    loading.value = true
    userIdsOnlineList.value = data
  })
  socket.emit('getOnlineList', (el) => {
    loading.value = true
    userIdsOnlineList.value = el
  })
})
</script>

<style scoped lang="scss">
.work-status-circle {
  &.online {
    color: green;
  }
  &.offline {
    color: red;
  }
}
</style>
