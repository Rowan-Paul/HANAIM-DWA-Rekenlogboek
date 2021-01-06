import React, { useEffect } from 'react'
import { connect } from 'react-redux'

import '../../../scss/student/containers/Default.scss'

import {
	loadLogbook,
	loadStudentLogbook
} from '../../redux/studentlogbook/actions'

import defaultSVG from '../../../img/illustrations/nothing_to_see.svg'

function StudentUI(props) {
	useEffect(() => {
		if (props.context.teamName !== undefined) {
			props.loadLogbook(props.context.teamName)
		}
	}, [])

	useEffect(() => {
		if (props.context.teamName !== undefined && props.logbookid) {
			props.loadStudentLogbook()
		}
	}, [props.logbookid])

	// When the user object exists, check which page
	// the user should be redirected to
	if (props.user !== undefined && props.user !== null) {
		if (props.currentPhase !== null && props.studentlogbookid)
			switch (props.currentPhase) {
				case 'pretest':
					props.history.push('/student/pretest')
					break

				case 'instructions':
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
		logbookid: state.studentLogbook.logbook._id,
		currentPhase: state.studentLogbook.logbook.currentPhase,
		studentlogbookid: state.studentLogbook.studentlogbook._id,
		context: state.main.context
	}
}

function mapDispatchToProps(dispatch) {
	return {
		loadLogbook: payload => dispatch(loadLogbook(payload)),
		loadStudentLogbook: () => dispatch(loadStudentLogbook())
	}
}

export const Default = connect(mapStateToProps, mapDispatchToProps)(StudentUI)
