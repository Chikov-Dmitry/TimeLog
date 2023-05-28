import { io } from 'socket.io-client'

export const socket = io('http://localhost:3000', {
  query: {},
  autoConnect: false
})

socket.on('connect', function () {
  console.log('Connected')
})
socket.on('connect_error', (error) => {
  throw error
})

socket.on('events', function (data) {
  console.log('event', data)
})
socket.on('log', (data) => {
  console.log('log', data)
})
socket.on('exception', function (data) {
  console.log('event', data)
})
socket.on('disconnect', function () {
  console.log('Disconnected')
})
