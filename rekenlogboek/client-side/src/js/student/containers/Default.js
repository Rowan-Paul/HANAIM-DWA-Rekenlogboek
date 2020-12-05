import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import * as microsoftTeams from '@microsoft/teams-js'

import { fetchCurrentPhase } from '../../../redux/studentlogbook/actions'
import { saveUserAction } from '../../../redux/main/actions'

function StudentUI(props) {
	const [context, setContext] = useState('')
	const [phaseFetched, setPhaseFetched] = useState(false)

	useEffect(() => {
		//TODO: place this somewhere to access it globally
		// removes chararacter at place i in string
		String.prototype.removeCharAt = function (i) {
			var tmp = this.split('') // convert to an array
			tmp.splice(i - 1, 1) // remove 1 element from the array (adjusting for non-zero-indexed counts)
			return tmp.join('') // reconstruct the string
		}

		// save to reducer
		props.doSaveUser(decodeURI(props.location.search.removeCharAt(1)))
	}, [])

	useEffect(() => {
		microsoftTeams.getContext((context, error) => {
			setContext(context)
			if (error) {
				console.log(error)
			}
		})

		// fetch the current phase
		if (!phaseFetched && context.teamName !== undefined) {
			setPhaseFetched(true)
			props.doFetchCurrentPhase(context.teamName)
		}
	})

	// When the user object exists, check which page
	// the user should be redirected to
	if (props.user !== undefined && props.user !== null) {
		if (props.currentPhase !== null) {
			props.history.push('/student/pretest')
		}

		return (
			<div>
				<h1>Hallo, {props.user.name}</h1>
				<p>Het lijkt erop dat je nog niks te doen hebt hier!</p>
			</div>
		)
	} else {
		return <p>Loading...</p>
	}
}

function mapStateToProps(state) {
	return {
		user: state.main.user,
		currentPhase: state.studentLogbook.currentPhase
	}
}

function mapDispatchToProps(dispatch) {
	return {
		doSaveUser: payload => dispatch(saveUserAction(payload)),
		doFetchCurrentPhase: payload => dispatch(fetchCurrentPhase(payload))
	}
}

export const Default = connect(mapStateToProps, mapDispatchToProps)(StudentUI)
