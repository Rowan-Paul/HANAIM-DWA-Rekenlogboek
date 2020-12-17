import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'

import '../../../scss/student/containers/Default.scss'

import { loadLogbook } from '../../redux/studentlogbook/actions'

import defaultSVG from '../../../img/illustrations/nothing_to_see.svg'

function StudentUI(props) {
	useEffect(() => {
		if (props.context.teamName !== undefined) {
			props.loadLogbook(props.context.teamName)
		}
	}, [])

	// When the user object exists, check which page
	// the user should be redirected to
	if (props.user !== undefined && props.user !== null) {
		if (props.currentPhase !== null)
			switch (props.currentPhase) {
				case 'pretest':
					props.history.push('/student/pretest')
					break

				case 'instruction':
					props.history.push('/student/instruction')
					break

				case 'evaluation':
					props.history.push('/student/evaluation')
					break

				default:
					break
			}

		return (
			<div className="default">
				<div className="text-field">
					<h1>Nog geen logboeken die ingevuld moeten worden!</h1>
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
		currentPhase: state.studentLogbook.logbook.currentPhase,
		context: state.main.context
	}
}

function mapDispatchToProps(dispatch) {
	return {
		loadLogbook: payload => dispatch(loadLogbook(payload))
	}
}

export const Default = connect(mapStateToProps, mapDispatchToProps)(StudentUI)
