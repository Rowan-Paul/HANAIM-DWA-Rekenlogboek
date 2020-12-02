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
require('./models/templates')

const authRouter = require('./routes/auth')
const logbookRouter = require('./routes/logbook')
const studentlogbookRouter = require('./routes/studentlogbook')
const templatesRouter = require('./routes/templates')

require('dotenv').config()

const dbName = 'rekenlogboek'

// Create Express App and Routes
const app = express()

// middle ware
app.use(express.static('uploads'))
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

// file upload api
app.post('/upload', (req, res) => {
	if (!req.files) {
		return res.status(500).send({ msg: 'file is not found' })
	}
	// accessing the file
	const myFile = req.files.file
	//  mv() method places the file inside public directory
	myFile.mv(`${__dirname}/uploads/${myFile.name}`, function (err) {
		if (err) {
			console.log(err)
			return res.status(500).send({ msg: 'Error occured' })
		}
		// returing the response with file path and name
		return res.send({ name: myFile.name, path: `/${myFile.name}` })
	})
})

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
