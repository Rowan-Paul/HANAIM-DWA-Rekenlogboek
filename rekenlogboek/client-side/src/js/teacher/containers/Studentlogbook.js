import '../../../scss/teacher/containers/Studentlogbook.scss'

import React from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { io } from 'socket.io-client'
import { fetchActiveStudentlogbook } from '../../redux/logbookoverview/actions'

import Button from '../../common/Button'
import Jumbotron from '../../common/Jumbotron'
import LogbookFrame from '../../common/logbook/LogbookFrame'
import LogbookHeader from '../../common/logbook/LogbookHeader'
import LogbookRows from '../../common/logbook/LogbookRows'

function StudentLogbook(props) {
	const socket = io('ws://localhost:3000')
	const teacher = props.teacher

	socket.on('connect', () => {
		console.log('Socket id: ', socket.id)
		socket.emit('join', teacher)
	})

	socket.on('NEW_ANSWER', data => {
		if (data === props.student) {
			props.fetchStudentlogbook(props.logbookid)
		}
	})

	return (
		<div className="studentlogbook">
			<Jumbotron>
				<h1>Logboek - {props.student}</h1>
				<LogbookFrame>
					<LogbookHeader columns={props.columns} />
					<LogbookRows goals={props.goals} type={'studentLogbooks'} />
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

const mapStateToProps = state => {
	return {
		columns: state.logbookoverview.currentLogbook.columns,
		goals: state.logbookoverview.currentLogbook.goals,
		logbookid: state.logbookoverview.activeStudentlogbook._id,
		student: state.logbookoverview.activeStudentlogbook.student,
		teacher: state.main.user.name
	}
}

const mapDispatchToProps = dispatch => {
	return {
		fetchStudentlogbook: logbookid =>
			dispatch(fetchActiveStudentlogbook(logbookid))
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(withRouter(StudentLogbook))
