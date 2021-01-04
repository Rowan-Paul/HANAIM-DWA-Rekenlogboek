import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import '../../../scss/student/Student.scss'

import ProgressBar from '../components/ProgressBar'
import ResultText from '../components/ResultText'
import ResultTable from '../components/ResultTable'

import Jumbotron from '../../common/Jumbotron'
import Button from '../../common/Button'

// import {
// 	fetchAllGoals,
// 	previousGoal,
// 	nextGoal,
// 	fetchAnswers
// } from '../../redux/studentlogbook/actions'

function AfterPreTestEndUI(props) {
	//TODO: fix it going back and actually loading the page
	const previousPage = () => {
		props.history.push('/student/pretest')
	}

	return (
		<div className="end-screen student-container">
			{/* <ProgressBar itemCount={props.goalAmount} done={[0, 1, 2, 3, 4]} /> */}
			<Jumbotron columns={1}>
				<div className="learn-goal-container">
					<div className="left-side">
						<ResultText
							title="Je bent klaar!"
							description="De door jou ingevoerde antwoorden zijn naar jouw leraar verstuurd."
							image=""
						/>
					</div>
					<div className="right-side">
						<ResultTable
							results={props.allGoals}
							answers={props.answers}
							columnPosition={1}
							description="Dit heb je bij je leerdoelen beantwoord:"
						/>
					</div>
				</div>
			</Jumbotron>
			<div className="prev button">
				<Button color="gray" value="Vorige" handler={() => previousPage()} />
			</div>
		</div>
	)
}

function mapStateToProps(state) {
	return {
		answers: state.studentLogbook.studentlogbook.answers,
		allGoals: state.studentLogbook.logbook.goals
	}
}

function mapDispatchToProps(dispatch) {
	return {
		doFetchAnswers: () => dispatch(fetchAnswers()),
		doNextGoal: () => dispatch(nextGoal()),
		doPreviousGoal: () => dispatch(previousGoal()),
		doFetchAllGoals: () => dispatch(fetchAllGoals())
	}
}

export const AfterPreTestEnd = connect(
	mapStateToProps,
	mapDispatchToProps
)(withRouter(AfterPreTestEndUI))
