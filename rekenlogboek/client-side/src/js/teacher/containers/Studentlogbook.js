import React, { useEffect } from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import LogbookList from '../components/LogbookList'
import Jumbotron from '../../common/Jumbotron'
import { fetchCurrentLogbook } from '../../../redux/logbookoverview/actions'

function StudentLogbook(props) {
	useEffect(() => {
		props.getPageInformation()
	}, [props.period, props.group])

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
		period: state.logbookoverview.period,
		group: state.logbookoverview.group,
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
)(withRouter(StudentLogbook))
