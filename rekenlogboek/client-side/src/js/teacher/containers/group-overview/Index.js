import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { io } from 'socket.io-client'

import Jumbotron from '../../../common/Jumbotron'
import TopBar from '../../../common/logbook/TopBar'
import LogbookFrame from '../../../common/logbook/LogbookFrame'
import LogbookRows from '../../../common/logbook/LogbookRows'

import * as actions from '../../../redux/group-overview/actions'
import '../../../../scss/teacher/containers/group-overview/Index.scss'
import Button from '../../../common/Button'
export const Index = props => {
	useEffect(() => {
		const socket = io('ws://localhost:3000')
		socket.on('NEW_ANSWER', data => {
			props.getLogbookGroupOverview()
		})
	}, [])

	const [logbook, setLogbook] = useState(props.logbook)
	const [overview, setOverview] = useState(props.overview)

	const logbookHandler = () => {
		if (!logbook) {
			props.getLogbook()
			return ''
		} else if (!overview) {
			props.getLogbookGroupOverview()
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
		setOverview(props.overview)
	}, [props])

	return (
		<div className="GroupOverview">
			<Jumbotron>
				<TopBar title="Groepsoverzicht logboek" noBreadcrumbs />
				<LogbookFrame>{logbookHandler()}</LogbookFrame>
			</Jumbotron>

			<div className="prev button">
				<Button
					color="gray"
					value="Vorige"
					handler={() => props.history.push('../')}
				/>
			</div>
		</div>
	)
}

const mapStateToProps = state => ({
	logbookTypes: state.main.logbookTypes,
	logbook: state.groupOverview.logbook,
	overview: state.groupOverview.overview
})

const mapDispatchToProps = dispatch => ({
	getLogbook: () => dispatch(actions.getLogbook()),
	getLogbookGroupOverview: () => dispatch(actions.getLogbookGroupOverview())
})

export default connect(mapStateToProps, mapDispatchToProps)(Index)
