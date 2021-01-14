'use-strict'

const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const session = require('express-session')
const cors = require('cors')
const fileupload = require('express-fileupload')

const SERVER_PORT = process.env.PORT || 3000

require('./models/logbook')
require('./models/studentlogbook')

const logbookRouter = require('./routes/logbook')
const studentlogbookRouter = require('./routes/studentlogbook')
const filesRouter = require('./routes/files')

require('dotenv').config()

const dbName = 'rekenlogboek'

// Create Express App and Routes
const app = express()

// middle ware
app.use(express.static('static'))
app.use(fileupload())
app.use(bodyParser.json())
app.use(cors({ origin: true, credentials: true }))
app.use(
	session({
		resave: true,
		saveUninitialized: true,
		secret: 'randomString'
	})
)
app.options('*', cors({ origin: true, credentials: true }))

// routes
app.use('/logbook', logbookRouter)
app.use('/studentlogbook', studentlogbookRouter)
app.use('/files', filesRouter)

const server = app.listen(SERVER_PORT, () => {
	mongoose.connect(
		`mongodb://localhost:27017/${dbName}`,
		{
			useNewUrlParser: true,
			useUnifiedTopology: true,
			useFindAndModify: false
		},
		() => {
			console.log(`Rekenlogboek server listening on port ${SERVER_PORT}!`)
		}
	)
})

// Socket.io
const io = require('socket.io')(server, {
	cors: {
		origin: process.env.REACT_APP_ADDRESS,
		credentials: true
	}
})
io.on('connection', function (socket) {
	console.log('User connected: ', socket.id)

	socket.on('join', function (room) {
		console.log('Joining room ', room)
		socket.join(room)
	})

	socket.on('disconnect', function () {
		console.log('User Disconnected')
	})
})

exports.io = io
