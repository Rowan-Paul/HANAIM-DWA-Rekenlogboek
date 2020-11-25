'use-strict'

const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const session = require('express-session')
const cors = require('cors')

const SERVER_PORT = process.env.PORT || 3000

require('./models/logbook')
require('./models/studentlogbook')
require('./models/templates')

const authRouter = require('./routes/auth')
const logbookRouter = require('./routes/logbook')
const studentlogbookRouter = require('./routes/studentlogbook')
const templatesRouter = require('./routes/templates')

require('dotenv').config()

const dbName = 'rekenlogboek'

// Create Express App and Routes
const app = express()

app.use(cors({ origin: true, credentials: true }))
app.options('*', cors({ origin: true, credentials: true }))
app.use(
	session({
		resave: true,
		saveUninitialized: true,
		secret: 'randomString'
	})
)
app.use('/auth', authRouter)
app.use('/logbook', logbookRouter)
app.use('/studentlogbook', studentlogbookRouter)
app.use('/templates', templatesRouter)

app.listen(SERVER_PORT, () => {
	mongoose.connect(
		`mongodb://localhost:27017/${dbName}`,
		{ useNewUrlParser: true, useUnifiedTopology: true },
		() => {
			console.log(`Rekenlogboek server listening on port ${SERVER_PORT}!`)
		}
	)
})
