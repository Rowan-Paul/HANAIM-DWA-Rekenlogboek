import React, { useEffect } from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { fetchCurrentLogbook } from '../../redux/logbookoverview/actions'

import Jumbotron from '../../common/Jumbotron'
import LogbookList from '../components/LogbookList'
import TopBar from '../components/logbook/TopBar'
import LogbookFrame from '../components/logbook/LogbookFrame'

function Logbooks(props) {
	useEffect(() => {
		props.getPageInformation()
	}, [props.period, props.group])

	return (
		<Jumbotron>
			<TopBar title={'Overzicht logboeken'} noBreadcrumbs />
			<LogbookFrame>
				<LogbookList
					logbook={props.logbook}
					studentlogbooks={props.studentlogbooks}
				></LogbookList>
			</LogbookFrame>
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
)(withRouter(Logbooks))
