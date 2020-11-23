'use-strict'

const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const msal = require('@azure/msal-node')

const SERVER_PORT = process.env.PORT || 3000

const authRouter = require('./routes/auth')

// Create Express App and Routes
const app = express()

app.use('/auth', authRouter)

app.listen(SERVER_PORT, () =>
	console.log(
		`Msal Node Auth Code Sample app listening on port ${SERVER_PORT}!`
	)
)
