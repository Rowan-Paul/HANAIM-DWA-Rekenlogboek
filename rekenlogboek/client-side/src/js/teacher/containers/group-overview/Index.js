import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'

import Jumbotron from '../../../common/Jumbotron'
import TopBar from '../../../common/logbook/TopBar'
import LogbookFrame from '../../../common/logbook/LogbookFrame'
import LogbookRows from '../../../common/logbook/LogbookRows'

import {
	getLogbook,
	getLogbookGroupOverview
} from '../../../redux/group-overview/actions'
import '../../../../scss/teacher/containers/group-overview/Index.scss'
export const Index = props => {
	const [logbook, setLogbook] = useState(props.logbook)

	const logbookHandler = () => {
		if (!logbook) {
			props.getLogbook()
			props.getLogbookGroupOverview()
			return ''
		} else {
			return (
				<LogbookRows
					type={props.logbookTypes.groupOverview}
					goals={logbook.goals}
				/>
			)
		}
	}

	useEffect(() => {
		setLogbook(props.logbook)
	}, [props.logbook])

	return (
		<div className="GroupOverview">
			<Jumbotron>
				<TopBar title="Groepsoverzicht logboek" noBreadcrumbs />
				<LogbookFrame>{logbookHandler()}</LogbookFrame>
			</Jumbotron>
		</div>
	)
}

const mapStateToProps = state => ({
	logbookTypes: state.main.logbookTypes,
	logbook: state.groupOverview.logbook
})

const mapDispatchToProps = dispatch => ({
	getLogbook: () => dispatch(getLogbook()),
	getLogbookGroupOverview: () => dispatch(getLogbookGroupOverview())
})

export default connect(mapStateToProps, mapDispatchToProps)(Index)
