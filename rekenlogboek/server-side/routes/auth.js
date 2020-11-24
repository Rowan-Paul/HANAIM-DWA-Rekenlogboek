'use strict'

const express = require('express')
const auth = express.Router()
const msal = require('@azure/msal-node')
const fetch = require('node-fetch')
const { response } = require('express')

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
				// console.log(message)
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

	req.session.user = {}

	pca
		.acquireTokenByCode(tokenRequest)
		.then(response => {
			req.session.token = response.accessToken

			return response
		})
		// get acces token
		.then(response => {
			return fetch('https://graph.microsoft.com/v1.0/me', {
				method: 'GET',
				headers: { Authorization: 'Bearer ' + req.session.token }
			})
		})
		.then(res => res.json())
		.then(res => {
			req.session.user = {
				name: res.displayName,
				jobTitle: res.jobTitle,
				email: res.mail,
				groups: []
			}

			let body = {
				securityEnabledOnly: false
			}

			body = JSON.stringify(body)

			// get groups for user
			return fetch('https://graph.microsoft.com/v1.0/me/getMemberGroups', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					'Content-Length': 33,
					Authorization: 'Bearer ' + req.session.token
				},
				body: body
			})
		})
		.then(res => res.json())
		// get group names for user
		.then(groups => {
			return Promise.all(
				groups.value.map(id =>
					fetch('https://graph.microsoft.com/v1.0/groups/' + id, {
						method: 'GET',
						headers: { Authorization: 'Bearer ' + req.session.token }
					})
						.then(res => res.json())
						.then(response => response.displayName)
				)
			)
		})
		.then(groups => {
			req.session.user = {
				...req.session.user,
				groups: groups
			}
		})
		// make cookie with user info
		.then(response => {
			console.log('User logged in: ', req.session.user)
			res.sendStatus(200)
		})
		.catch(error => {
			console.log(error)
			res.status(500).send(error)
		})
})

module.exports = auth
