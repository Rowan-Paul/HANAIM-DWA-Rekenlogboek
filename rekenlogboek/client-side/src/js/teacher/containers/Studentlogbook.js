import '../../../scss/teacher/containers/Studentlogbook.scss'

import React from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import socket from '../../websocket/ws'
import { fetchActiveStudentlogbook } from '../../redux/logbookoverview/actions'

import Button from '../../common/Button'
import Jumbotron from '../../common/Jumbotron'
import LogbookFrame from '../../common/logbook/LogbookFrame'
import LogbookHeader from '../../common/logbook/LogbookHeader'
import LogbookRows from '../../common/logbook/LogbookRows'

function StudentLogbook(props) {
	socket.on('NEW_ANSWER', data => {
		if (data.studentlogbookID === props.logbookID) {
			props.fetchStudentlogbook(props.logbookID)
		}
	})

	return (
		<div className="studentlogbook">
			<Jumbotron>
				<h1>Logboek - {props.student}</h1>
				<LogbookFrame>
					<LogbookHeader
						columns={props.columns}
						type={props.logbookTypes.studentLogbook}
					/>
					<LogbookRows
						goals={props.goals}
						type={props.logbookTypes.studentLogbook}
					/>
				</LogbookFrame>
			</Jumbotron>

			<div className="prev button">
				<Button
					color="gray"
					value="Vorige"
					handler={() => props.history.push('./')}
				/>
			</div>
		</div>
	)
}

const mapStateToProps = state => ({
	columns: state.logbookoverview.currentLogbook.columns,
	goals: state.logbookoverview.currentLogbook.goals,
	logbookID: state.logbookoverview.activeStudentlogbook._id,
	logbookTypes: state.main.logbookTypes,
	student: state.logbookoverview.activeStudentlogbook.student,
	teacher: state.main.user.name
})

const mapDispatchToProps = dispatch => ({
	fetchStudentlogbook: logbookID =>
		dispatch(fetchActiveStudentlogbook(logbookID))
})

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(withRouter(StudentLogbook))
