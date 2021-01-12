import io from 'socket.io-client'

const socket = io('ws://localhost:3000')

socket.on('connect', () => {
	console.log('Socket id: ', socket.id)
	socket.emit('join', socket.id)
})

export default socket
