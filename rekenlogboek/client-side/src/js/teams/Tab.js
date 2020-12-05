import React, { useState, useEffect } from 'react'
import * as microsoftTeams from '@microsoft/teams-js'
import { withRouter } from 'react-router-dom'

import MicrosoftLogo from '../../img/icons/microsoft.svg'

//TODO: Reduxify this class (put context into Redux state)
// though is that necessary wiht the login system in place?
function TabUI(props) {
	const [context, setContext] = useState('')
	const [loginButton, setLoginButton] = useState('')

	// on mount
	useEffect(() => {
		// Get the user context from Teams and set it in the state
		microsoftTeams.getContext((context, error) => {
			setContext(context)
			if (error) {
				console.log(error)
			}
		})

		// Set up extra query parameters for ADAL
		// - openid and profile scope adds profile information to the id_token
		// - login_hint provides the expected user name
		if (context.loginHint) {
			config.extraQueryParameter =
				'scope=openid+profile&login_hint=' + encodeURIComponent(loginHint)
		} else {
			config.extraQueryParameter = 'scope=openid+profile'
		}

		let authContext = new AuthenticationContext(config) // from the ADAL.js library
		// See if there's a cached user and it matches the expected user
		let user = authContext.getCachedUser()
		if (user) {
			if (user.profile.oid !== userObjectId) {
				// User doesn't match, clear the cache
				authContext.clearCache()
			}
		}

		// In this example we are getting an id token (which ADAL.js returns if we ask for resource = clientId)
		authContext.acquireToken(
			config.clientId,
			function (errDesc, token, err, tokenType) {
				if (token) {
					// Make sure ADAL gave us an id token
					if (tokenType !== authContext.CONSTANTS.ID_TOKEN) {
						token = authContext.getCachedToken(config.clientId)
					}
					showProfileInformation(idToken)
				} else {
					console.log('Renewal failed: ' + err)
					// Failed to get the token silently; show the login button
					showLoginButton(true)
				}
			}
		)

		function showLoginButton(show) {
			if (show) {
				setLoginButton(
					<button
						className="MicrosoftButton"
						onClick={() => {
							microsoftTeams.authentication.authenticate({
								url: process.env.REACT_SERVER_ADDRESS + '/auth',
								width: 600,
								height: 535,
								successCallback: user => {
									// Create an encryptor:
									const encryptor = require('simple-encryptor')(
										process.env.REACT_APP_SECRET_KEY
									)
									const objEnc = encryptor.encrypt(user)
									props.history.push('/student?' + objEnc)
								},
								failureCallback: reason => {
									console.log('Error: ', reason)
								}
							})
						}}
					>
						<div>
							<img src={MicrosoftLogo} alt="Microsoft Logo" />
							<span>Login met Microsoft</span>
						</div>
					</button>
				)
			}
		}

		if (authContext.isCallback(window.location.hash)) {
			authContext.handleWindowCallback(window.location.hash)
			if (window.parent === window) {
				if (authContext.getCachedUser()) {
					microsoftTeams.authentication.notifySuccess()
				} else {
					microsoftTeams.authentication.notifyFailure(
						authContext.getLoginError()
					)
				}
			}
		}
	}, [])

	return (
		<div>
			Hallo! Druk op de knop hierbeneden om verder te gaan <br></br>{' '}
			{loginButton}
		</div>
	)
}

export const Tab = withRouter(TabUI)
