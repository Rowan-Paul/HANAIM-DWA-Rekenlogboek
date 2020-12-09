import React, { useEffect } from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'

import '../../../scss/student/Student.scss'

import ProgressBar from '../components/ProgressBar'
import Jumbotron from '../../common/Jumbotron'
import Button from '../../common/Button'
import ResultText from '../components/ResultText'
import ResultTable from '../components/ResultTable'

import { nextGoal } from '../../../redux/studentlogbook/actions'
import { newExplanation } from '../../../redux/studentlogbook/actions'
import { newAnswer } from '../../../redux/studentlogbook/actions'
import { fetchAnswers } from '../../../redux/studentlogbook/actions'
import { fetchColumn } from '../../../redux/studentlogbook/actions'
import { fetchGoal } from '../../../redux/studentlogbook/actions'
import { fetchGoalAmount } from '../../../redux/studentlogbook/actions'

function AfterPreTestEndUI(props) {
	useEffect(() => {
		if (props.goal.position !== undefined) {
			props.doFetchAnswers()
		}
	}, [])

	const saveAnswers = () => {}

	const results = [
		{ goalCount: 'Doel 1', goalName: 'Optellen', answer: 'Ik snap het goed' },
		{
			goalCount: 'Doel 2',
			goalName: 'Breuken',
			answer: 'Ik vind het nog erg moeilijk'
		},
		{
			goalCount: 'Doel 3',
			goalName: 'Keersommen',
			answer: 'Ik snap het, maar vind het nog lastig'
		}
	]
	return (
		<div className="end-screen student-container">
			<ProgressBar itemCount={props.goalAmount} done={[0, 1, 2, 3, 4]} />
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
							description="Dit heb je bij je leerdoelen beantwoord:"
						/>
					</div>
				</div>
			</Jumbotron>
			<div className="next button">
				<Button color="blue" value="Afsluiten" handler={() => saveAnswers()} />
			</div>
		</div>
	)
}

function mapStateToProps(state) {
	return {
		column: state.studentLogbook.column,
		goal: state.studentLogbook.currentGoal,
		goalAmount: state.studentLogbook.goalAmount,
		answers: state.studentLogbook.answers,
		allGoals: state.studentLogbook.allGoals
	}
}

function mapDispatchToProps(dispatch) {
	return {
		doFetchColumn: payload => dispatch(fetchColumn(payload)),
		doFetchGoal: payload => dispatch(fetchGoal(payload)),
		doFetchGoalAmount: () => dispatch(fetchGoalAmount()),
		doFetchAnswers: () => dispatch(fetchAnswers()),
		doNewAnswer: payload => dispatch(newAnswer(payload)),
		doNewExplanation: payload => dispatch(newExplanation(payload)),
		doNextGoal: () => dispatch(nextGoal())
	}
}

export const AfterPreTestEnd = connect(
	mapStateToProps,
	mapDispatchToProps
)(AfterPreTestEndUI)
