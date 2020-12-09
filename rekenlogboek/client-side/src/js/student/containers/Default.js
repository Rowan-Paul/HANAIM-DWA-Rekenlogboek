import React, { useEffect, useState } from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'

import '../../../scss/student/containers/Default.scss'

import { fetchCurrentPhase } from '../../../redux/studentlogbook/actions'
import { saveUserAction } from '../../../redux/main/actions'

import defaultSVG from '../../../img/illustrations/nothing_to_see.svg'

function StudentUI(props) {
	const [phaseFetched, setPhaseFetched] = useState(false)

	useEffect(() => {
		// fetch the current phase
		if (!phaseFetched && props.context.teamName !== undefined) {
			setPhaseFetched(true)
			props.doFetchCurrentPhase(props.context.teamName)
		}
	})

	// When the user object exists, check which page
	// the user should be redirected to
	if (props.user !== undefined && props.user !== null) {
		if (props.currentPhase !== null) {
			props.history.push('/student/pretest')
		}

		return (
			<div className="default">
				<div className="text-field">
					<h1>Niks te zien hier!</h1>
					<p>
						Je meester/jufvrouw heeft nog geen taken voor je open gezet. Klopt
						dit niet? Laat het dan even weten, dan zorgt hij/zij ervoor dat je
						weer verder kan.
					</p>
				</div>
				<img src={defaultSVG} />
			</div>
		)
	} else {
		return <p>Loading...</p>
	}
}

function mapStateToProps(state) {
	return {
		user: state.main.user,
		currentPhase: state.studentLogbook.currentPhase,
		context: state.main.context
	}
}

function mapDispatchToProps(dispatch) {
	return {
		doSaveUser: payload => dispatch(saveUserAction(payload)),
		doFetchCurrentPhase: payload => dispatch(fetchCurrentPhase(payload))
	}
}

export const Default = connect(mapStateToProps, mapDispatchToProps)(StudentUI)
