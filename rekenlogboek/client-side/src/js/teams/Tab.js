// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import React from 'react'
import * as microsoftTeams from '@microsoft/teams-js'

/**
 * The 'GroupTab' component renders the main tab content
 * of your app.
 */
class Tab extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			context: {}
		}
	}

	//React lifecycle method that gets called once a component has finished mounting
	//Learn more: https://reactjs.org/docs/react-component.html#componentdidmount
	componentDidMount() {
		// Get the user context from Teams and set it in the state
		microsoftTeams.getContext((context, error) => {
			this.setState({
				context: context
			})
			if (error) {
				console.log(error)
			}
		})
		// Next steps: Error handling using the error object
	}

	render() {
		// let config = {
		// 	clientId: 'e1c0b43f-30fc-491a-ada6-d5edb53b56f3',
		// 	// redirectUri must be in the list of redirect URLs for the Azure AD app
		// 	redirectUri: window.location.origin + '/tab-auth/silent-end',
		// 	cacheLocation: 'localStorage',
		// 	navigateToLoginRequestUrl: false
		// }

		// if (this.state.context['loginHint']) {
		// 	config.extraQueryParameter =
		// 		'scope=openid+profile&login_hint=' +
		// 		encodeURIComponent(this.state.context['loginHint'])
		// } else {
		// 	config.extraQueryParameter = 'scope=openid+profile'
		// }

		// let authContext = new AuthenticationContext(config) // from the ADAL.js library
		// // See if there's a cached user and it matches the expected user
		// let user = authContext.getCachedUser()
		// if (user) {
		// 	if (user.profile.oid !== userObjectId) {
		// 		// User doesn't match, clear the cache
		// 		authContext.clearCache()
		// 	}
		// }

		// // In this example we are getting an id token (which ADAL.js returns if we ask for resource = clientId)
		// authContext.acquireToken(
		// 	config.clientId,
		// 	function (errDesc, token, err, tokenType) {
		// 		if (token) {
		// 			// Make sure ADAL gave us an id token
		// 			if (tokenType !== authContext.CONSTANTS.ID_TOKEN) {
		// 				token = authContext.getCachedToken(config.clientId)
		// 			}
		// 			showProfileInformation(idToken)
		// 		} else {
		// 			console.log('Renewal failed: ' + err)
		// 			// Failed to get the token silently; show the login button

		// 			// You could attempt to launch the login popup here, but in browsers this could be blocked by
		// 			// a popup blocker, in which case the login attempt will fail with the reason FailedToOpenWindow.
		// 		}
		// 	}
		// )

		console.log(this.state.context)

		if (this.state.context['userTeamRole'] === 0) {
			return (
				<div>
					<p>
						Klik{' '}
						<a href="https://localhost:3001/" rel="noreferrer" target="_blank">
							hier
						</a>{' '}
						om de browser te openen voor de leraaromgeving.
					</p>
				</div>
			)
		} else if (this.state.context['userTeamRole'] === 1) {
			if (1) {
				return (
					<div>
						<h3>PRETOETS</h3>
					</div>
				)
			} else if (2) {
				return (
					<div>
						<h3>INSTRUCTIE</h3>
						<p>De leerling omgeving wordt op dit moment gebouwd...</p>
					</div>
				)
			} else if (3) {
				return (
					<div>
						<h3>EVALUATIE!</h3>
						<p>De leerling omgeving wordt op dit moment gebouwd...</p>
					</div>
				)
			}
		} else {
			return (
				<div>
					<p>Er is iets fout gegaan.</p>
				</div>
			)
		}
	}
}
export default Tab
