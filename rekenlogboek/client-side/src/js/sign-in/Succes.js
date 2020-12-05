import '../../scss/sigin-in/SignIn.scss'

import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import * as microsoftTeams from '@microsoft/teams-js'

import { saveUserAction } from '../../redux/main/actions'

export default function SuccesUI(props) {
	useEffect(() => {
		// initialize teams on this page, cause it
		// needs to tell teams it has logged in
		microsoftTeams.initialize()

		// removes chararacter at place i in string
		String.prototype.removeCharAt = function (i) {
			var tmp = this.split('') // convert to an array
			tmp.splice(i - 1, 1) // remove 1 element from the array (adjusting for non-zero-indexed counts)
			return tmp.join('') // reconstruct the string
		}

		// save to reducer
		props.doSaveUser(decodeURI(props.location.search.removeCharAt(1)))
	}, []) // empty array to signal it only has to execute on mount

	useEffect(() => {
		// redirect to the correct page
		if (props.user.groups !== undefined && props.user.groups !== null) {
			if (props.user.groups.includes('Logboekontwerpers')) {
				props.history.push('/teacher')
			} else if (
				props.user.jobTitle === 'Leerling' &&
				window.opener &&
				window.opener !== window
			) {
				microsoftTeams.authentication.notifySuccess(props.user)
			} else {
				props.history.push('/no-access')
			}
		}
	})

	return (
		<section>
			<p>Redirecting you to the correct page..</p>
		</section>
	)
}

function mapStateToProps(state) {
	return {
		user: state.main.user
	}
}

function mapDispatchToProps(dispatch) {
	return {
		doSaveUser: payload => dispatch(saveUserAction(payload))
	}
}

export const Succes = connect(mapStateToProps, mapDispatchToProps)(SuccesUI)
