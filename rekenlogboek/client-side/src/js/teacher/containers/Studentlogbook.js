import React from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import Button from '../../common/Button'
import Jumbotron from '../../common/Jumbotron'
import LogbookFrame from '../components/logbook/LogbookFrame'
import StudentLogbookHeader from '../components/logbook/StudentLogbookHeader'
import StudentLogbookRows from '../components/logbook/StudentLogbookRows'
import '../../../scss/teacher/containers/Studentlogbook.scss'

function StudentLogbook(props) {
	return (
		<div className="studentlogbook">
			<Jumbotron>
				<h1>Logboek van: {props.student}</h1>
				<LogbookFrame>
					<StudentLogbookHeader />
					<StudentLogbookRows />
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
		student: state.logbookoverview.activeStudentlogbook.student
	}
}

const mapDispatchToProps = dispatch => {
	return {}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(withRouter(StudentLogbook))
