import '../../scss/sigin-in/components/SignInContainer.scss'

import React from 'react'
import { connect } from 'react-redux'
import * as microsoftTeams from '@microsoft/teams-js'

import { MicrosoftButton } from '../sign-in/components/MicrosoftButton'

import { setContext } from '../../redux/main/actions'

function TabUI(props) {
	microsoftTeams.getContext((context, error) => {
		props.doSetContext(context)
		if (error) {
			console.log(error)
		}
	})
	return (
		<div className="SignInContainer">
			<h1>Inloggen</h1>
			<p>Login om gebruik te kunnen maken van de applicatie</p>
			<MicrosoftButton />
		</div>
	)
}

function mapStateToProps() {
	return {}
}

function mapDispatchToProps(dispatch) {
	return {
		doSetContext: payload => dispatch(setContext(payload))
	}
}

export const Tab = connect(mapStateToProps, mapDispatchToProps)(TabUI)
