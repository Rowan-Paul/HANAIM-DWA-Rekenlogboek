import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import socket from '../../../websocket/ws'

import Jumbotron from '../../../common/Jumbotron'
import TopBar from '../../../common/logbook/TopBar'
import LogbookFrame from '../../../common/logbook/LogbookFrame'
import LogbookRows from '../../../common/logbook/LogbookRows'

import * as actions from '../../../redux/group-overview/actions'
import '../../../../scss/teacher/containers/group-overview/Index.scss'
import Button from '../../../common/Button'
export const Index = props => {
	const [logbookID, setLogbookID] = useState(props.logbookID)
	const [logbook, setLogbook] = useState(props.logbook)
	const [overview, setOverview] = useState(props.overview)

	useEffect(() => {
		socket.on('NEW_ANSWER', data => {
			if (data.logbookID === props.logbookID) {
				props.getLogbookGroupOverview()
			}
		})
	}, [])

	const logbookHandler = () => {
		if (!logbookID) {
			props.userGroups.map(group => {
				if (group.substr(0, 5) === 'Groep') {
					const groupNo = group.substr(6, 1)
					if (typeof Number(groupNo)) {
						props.getLogbookID(groupNo)
					}
				}
			})
		} else if (!logbook) {
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
		setLogbookID(props.logbookID)
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
	logbookID: state.groupOverview.logbookID,
	logbook: state.groupOverview.logbook,
	overview: state.groupOverview.overview,
	userGroups: state.main.user.groups
})

const mapDispatchToProps = dispatch => ({
	getLogbookID: payload => dispatch(actions.getLogbookID(payload)),
	getLogbook: () => dispatch(actions.getLogbook()),
	getLogbookGroupOverview: () => dispatch(actions.getLogbookGroupOverview())
})

export default connect(mapStateToProps, mapDispatchToProps)(Index)
