import { io, Socket } from 'socket.io-client'
import { IClientToServerEvents, IServerToClientEvents } from '@timelog/interfaces'

export const socket: Socket<IServerToClientEvents, IClientToServerEvents> = io(
  'http://localhost:3000',
  {
    query: {},
    autoConnect: false
  }
)

socket.on('connect', function () {
  console.log('Connected')
})
socket.on('connect_error', (error) => {
  throw error
})
socket.on('disconnect', function () {
    console.log('Disconnected')
})
socket.on('log', (data) => {
  console.log('log', data)
})

