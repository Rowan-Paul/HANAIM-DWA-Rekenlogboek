import '../../../scss/sigin-in/components/MicrosoftButton.scss'
import MicrosoftLogo from '../../../img/icons/microsoft.svg'

import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import { saveUserAction } from '../../../redux/main/actions'

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

	const silentLogin = async () => {
		try {
			const user = await getUserProfile(userAgentApplication, config.scopes)

			if (props.context.loginHint !== undefined)
				if (props.context.loginHint !== user.userPrincipalName) {
					throw new Error('Logged in as two different users')
				}

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

	return (
		<button className="MicrosoftButton" onLoad={silentLogin} onClick={login}>
			<div>
				<img src={MicrosoftLogo} alt="Microsoft Logo" />
				<span>Login met Microsoft</span>
			</div>
		</button>
	)
}

function mapStateToProps(state) {
	return {
		user: state.main.user,
		context: state.main.context
	}
}

function mapDispatchToProps(dispatch) {
	return {
		doSaveUser: payload => dispatch(saveUserAction(payload))
	}
}

export const MicrosoftButton = connect(
	mapStateToProps,
	mapDispatchToProps
)(withRouter(MicrosoftButtonUI))
