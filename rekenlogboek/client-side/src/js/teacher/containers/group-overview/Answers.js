import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { useLocation } from 'react-router-dom'

import Jumbotron from '../../../common/Jumbotron'
import LogbookHeader from '../../../common/logbook/LogbookHeader'
import LogbookFrame from '../../../common/logbook/LogbookFrame'
import TopBar from '../../../common/logbook/TopBar'

import * as actions from '../../../redux/group-overview/actions'

import '../../../../scss/teacher/containers/group-overview/Answers.scss'
import { LogbookRows } from '../../../common/logbook/LogbookRows'
import Button from '../../../common/Button'

const queryParameters = () => new URLSearchParams(useLocation().search)

export const Answers = props => {
	const q = queryParameters()

	const goal = q.get('goal')
	const column = q.get('column')
	const answer = q.get('answer')

	const [answers, setAnswers] = useState(props.answers)
	const [logbook, setLogbook] = useState(props.logbook)

	useEffect(() => {
		setAnswers(props.answers)
		setLogbook(props.logbook)
	}, [props])

	// LOAD DATA
	if (!logbook) {
		props.getLogbook()
		return ''
	}
	if (!answers) {
		props.getLogbookGroupAnswers({ goal, column, answer })
		return ''
	}
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
