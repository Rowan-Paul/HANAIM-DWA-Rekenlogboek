import io from 'socket.io-client'

const socket = io('ws://localhost:3000')

socket.on('connect', () => socket.emit('join', socket.id))

export default socket
