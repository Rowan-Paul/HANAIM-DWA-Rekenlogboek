import React, { useEffect } from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import LogbookList from '../components/LogbookList'
import Jumbotron from '../../common/Jumbotron'
import { fetchCurrentLogbook } from '../../../redux/logbookoverview/actions'

function StudentLogbooks(props) {
	useEffect(() => {
		props.getPageInformation()
	}, [])

	return (
		<Jumbotron>
			<LogbookList
				logbook={props.logbook}
				studentlogbooks={props.studentlogbooks}
			></LogbookList>
		</Jumbotron>
	)
}

const mapStateToProps = state => {
	return {
		logbook: state.logbookoverview.currentLogbook,
		studentlogbooks: state.logbookoverview.studentlogbooks
	}
}

const mapDispatchToProps = dispatch => {
	return {
		getPageInformation: () => dispatch(fetchCurrentLogbook())
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(withRouter(StudentLogbooks))
