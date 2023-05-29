<template>
  <div class="card">
    <p-data-table :value="users" tableStyle="min-width: 50rem">
      <p-column field="id" header="Id"></p-column>
      <p-column field="name" header="Имя"></p-column>
    </p-data-table>
  </div>
</template>

<script setup lang="ts">
import { onBeforeMount, ref, watch } from 'vue'
import { socket } from '@/api/socket'
import { UserIdsOnlineDto } from '@timelog/interfaces'

const users = ref<{ id: string; name: string }[]>([])

const userIdsOnlineList = ref<UserIdsOnlineDto>([])

watch(userIdsOnlineList, (newV) => {
  users.value = []
  newV.forEach((el) => {
    users.value.push({ id: el, name: 'name' })
  })
})

onBeforeMount(() => {
  socket.on('onlineList', function (data) {
    userIdsOnlineList.value = data
  })
  socket.emit('getOnlineList', (el) => {
    userIdsOnlineList.value = el
  })
})
</script>

<style scoped></style>
