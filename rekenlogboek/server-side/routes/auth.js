'use strict'

const express = require('express')
const auth = express.Router()
const msal = require('@azure/msal-node')
const session = require('express-session')
const fetch = require('node-fetch')

// config for msal
const config = {
	auth: {
		clientId: 'e1c0b43f-30fc-491a-ada6-d5edb53b56f3',
		authority: 'https://login.microsoftonline.com/common',
		clientSecret: '_YcV26J9-F~s3j1mSGD9P52_tl0WI2HtHn'
	},
	system: {
		loggerOptions: {
			loggerCallback(loglevel, message, containsPii) {
				console.log(message)
			},
			piiLoggingEnabled: false,
			logLevel: msal.LogLevel.Verbose
		}
	}
}

// Create msal application object
const pca = new msal.ConfidentialClientApplication(config)

auth.get('/', (req, res) => {
	const authCodeUrlParameters = {
		scopes: ['user.read'],
		redirectUri: 'http://localhost:3000/auth/redirect'
	}

	// get url to sign user in and consent to scopes needed for application
	pca
		.getAuthCodeUrl(authCodeUrlParameters)
		.then(response => {
			res.redirect(response)
		})
		.catch(error => console.log(JSON.stringify(error)))
})

auth.get('/redirect', (req, res) => {
	const tokenRequest = {
		code: req.query.code,
		scopes: ['user.read'],
		redirectUri: 'http://localhost:3000/auth/redirect'
	}

	let accessToken

	pca
		.acquireTokenByCode(tokenRequest)
		.then(response => {
			// req.session.user = response.account.name
			// req.session.token = response.accessToken
			// console.log('\nResponse: \n:', response)

			accessToken = response.accessToken

			fetch('https://graph.microsoft.com/v1.0/me', {
				method: 'GET',
				headers: { Authorization: 'Bearer ' + accessToken }
			})
				.then(res => res.json())
				.then(res => {
					fetch('https://graph.microsoft.com/v1.0/groups', {
						method: 'GET',
						headers: { Authorization: 'Bearer ' + accessToken }
					}).then(groups => {
						groups = groups.json()
						console.log('groups: ', groups)
						const user = {
							name: res.displayName,
							jobTitle: res.jobTitle,
							email: res.mail,
							groups: groups
						}

						return user
					})
				})
				.then(user => {
					req.session.user = user
					console.log(req.session)
					res.sendStatus(200)
				})
		})
		.catch(error => {
			console.log(error)
			res.status(500).send(error)
		})
})

module.exports = auth
