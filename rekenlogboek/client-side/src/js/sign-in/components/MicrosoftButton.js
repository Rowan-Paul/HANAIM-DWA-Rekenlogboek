import '../../../scss/sigin-in/components/MicrosoftButton.scss'
import MicrosoftLogo from '../../../img/icons/microsoft.svg'

import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import * as microsoftTeams from '@microsoft/teams-js'

import { saveUserAction, setContext } from '../../redux/main/actions'

import { config } from '../Config'
import { normalizeError, getUserProfile } from '../MSUtils'
import { UserAgentApplication } from 'msal'

function MicrosoftButtonUI(props) {
	const [isAuthenticated, setIsAuthenticated] = useState(false)
	const [user, setUser] = useState({})
	const [error, setError] = useState(null)
	const [userAgentApplication] = useState(
		() =>
			new UserAgentApplication({
				auth: {
					clientId: config.clientId,
					redirectUri: config.redirectUri
				},
				cache: {
					cacheLocation: 'localStorage',
					storeAuthStateInCookie: true
				}
			})
	)

	useEffect(() => {
		microsoftTeams.initialize()

		microsoftTeams.getContext((context, error) => {
			props.doSetContext(context)
			if (error) {
				console.log(error)
			}
		})
	}, [])

	const silentLogin = async () => {
		try {
			const user = await getUserProfile(userAgentApplication, config.scopes)

			// if in teams, check if the user logged in is the same
			// as the user logged in teams
			if (window.parent !== window.self) {
				if (props.context.loginHint !== user.userPrincipalName) {
					window.localStorage.clear()
					throw new Error('Logged in as two different users')
				} else {
					setIsAuthenticated(true)
					setUser({
						name: user.displayName,
						email: user.mail || user.userPrincipalName,
						jobTitle: user.jobTitle,
						groups: user.groups
					})
				}
			} else {
				setIsAuthenticated(true)
				setUser({
					name: user.displayName,
					email: user.mail || user.userPrincipalName,
					jobTitle: user.jobTitle,
					groups: user.groups
				})
				setError(null)
			}
		} catch (err) {
			setIsAuthenticated(false)
			setUser({})
			setError(normalizeError(err))
		}
	}

	const login = async () => {
		try {
			await userAgentApplication.loginPopup({
				scopes: config.scopes,
				prompt: 'select_account'
			})

			const user = await getUserProfile(userAgentApplication, config.scopes)

			setIsAuthenticated(true)
			setUser({
				name: user.displayName,
				email: user.mail || user.userPrincipalName,
				jobTitle: user.jobTitle,
				groups: user.groups
			})
			setError(null)
		} catch (err) {
			setIsAuthenticated(false)
			setUser({})
			setError(normalizeError(err))
		}
	}

	useEffect(() => {
		if (error) {
			console.log(error)
		}

		if (isAuthenticated) {
			props.doSaveUser(user)
			if (props.user.name !== undefined) props.history.push('/auth/succes')
		}
	})

	if (window.parent === window.self || props.context.loginHint !== undefined) {
		return (
			<button className="MicrosoftButton" onLoad={silentLogin} onClick={login}>
				<div>
					<img src={MicrosoftLogo} alt="Microsoft Logo" />
					<span>Login met Microsoft</span>
				</div>
			</button>
		)
	} else {
		return <p>Proberen je in te loggen...</p>
	}
}

function mapStateToProps(state) {
	return {
		user: state.main.user,
		context: state.main.context
	}
}

function mapDispatchToProps(dispatch) {
	return {
		doSaveUser: payload => dispatch(saveUserAction(payload)),
		doSetContext: payload => dispatch(setContext(payload))
	}
}

export const MicrosoftButton = connect(
	mapStateToProps,
	mapDispatchToProps
)(withRouter(MicrosoftButtonUI))
