import React from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import Jumbotron from '../../common/Jumbotron'
import LogbookFrame from '../components/logbook/LogbookFrame'
import StudentLogbookHeader from '../components/logbook/StudentLogbookHeader'
import StudentLogbookRows from '../components/logbook/StudentLogbookRows'
import '../../../scss/teacher/containers/Studentlogbook.scss'

function StudentLogbook(props) {
	return (
		<div className="studentlogbook">
			<Jumbotron>
				<LogbookFrame>
					<StudentLogbookHeader />
					<StudentLogbookRows />
				</LogbookFrame>
			</Jumbotron>
		</div>
	)
}

const mapStateToProps = state => {
	return {}
}

const mapDispatchToProps = dispatch => {
	return {}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(withRouter(StudentLogbook))
