import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { useLocation } from 'react-router-dom'
import { LogbookRows } from '../../../common/logbook/LogbookRows'
import socket from '../../../websocket/ws'

import Button from '../../../common/Button'
import Jumbotron from '../../../common/Jumbotron'
import LogbookHeader from '../../../common/logbook/LogbookHeader'
import LogbookFrame from '../../../common/logbook/LogbookFrame'
import TopBar from '../../../common/logbook/TopBar'

import * as actions from '../../../redux/group-overview/actions'

import '../../../../scss/teacher/containers/group-overview/Answers.scss'

const queryParameters = () => new URLSearchParams(useLocation().search)

export const Answers = props => {
	const query = queryParameters()

	const goal = query.get('goal')
	const column = query.get('column')
	const answer = query.get('answer')

	const [answers, setAnswers] = useState(props.answers)
	const [logbook, setLogbook] = useState(props.logbook)
	const [loaded, isLoaded] = useState(true)

	useEffect(() => {
		socket.on('NEW_ANSWER', data => {
			if (data.logbookID === props.logbook._id) {
				props.getLogbookGroupAnswers({ goal, column, answer })
			}
		})
	}, [])

	useEffect(() => {
		setAnswers(props.answers)
		setLogbook(props.logbook)
	}, [props])

	useEffect(() => {
		isLoaded(false)
		props.getLogbookGroupAnswers({ goal, column, answer })
		isLoaded(true)
	}, [query.get('goal'), query.get('column', query.get('answer'))])

	// LOAD DATA
	if (!logbook) {
		props.getLogbook()
		return ''
	}
	if (!loaded) return 'loading'

	return (
		<div className="GroupOverviewAnswers">
			<Jumbotron>
				<TopBar
					title={`Leerdoel ${parseInt(goal) + 1}: ${logbook.goals[goal].title}`}
					noBreadcrumbs
				/>
				<LogbookFrame>
					<LogbookHeader
						columns={logbook.columns}
						type={props.logbookTypes.groupAnswer}
					/>
					<LogbookRows
						goals={answers}
						rowPosition={goal}
						type={props.logbookTypes.groupAnswer}
						logbookTypes={props.logbookTypes}
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
	answers: state.groupOverview.answers,
	logbook: state.groupOverview.logbook,
	logbookTypes: state.main.logbookTypes
})

const mapDispatchToProps = dispatch => ({
	getLogbook: () => dispatch(actions.getLogbook()),
	getLogbookGroupAnswers: payload =>
		dispatch(actions.getLogbookGroupAnswers(payload))
})
export default connect(mapStateToProps, mapDispatchToProps)(Answers)
