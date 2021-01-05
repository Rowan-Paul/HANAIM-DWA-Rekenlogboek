import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import '../../../scss/student/Student.scss'

import ProgressBar from '../components/ProgressBar'
import ResultText from '../components/ResultText'
import ResultTable from '../components/ResultTable'

import Jumbotron from '../../common/Jumbotron'
import Button from '../../common/Button'

function EvaluationsEndUI(props) {
	const previousPage = () => {
		props.history.push('/student/evaluation')
	}

	const filterCorrectAnswer = () => {
		return [
			props.answers.filter(
				answer =>
					answer.goalPosition === props.currentGoal &&
					answer.columnPosition === 3
			)[0]
		]
	}

	const filterCorrectGoal = () => {
		return [
			props.allGoals.filter(goal => goal.position === props.currentGoal)[0]
		]
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
							results={filterCorrectGoal()}
							answers={filterCorrectAnswer()}
							columnPosition={3}
							goalPosition={props.currentGoal}
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
		currentGoal: state.studentLogbook.currentGoal,
		answers: state.studentLogbook.studentlogbook.answers,
		allGoals: state.studentLogbook.logbook.goals
	}
}

export const EvaluationsEnd = connect(
	mapStateToProps,
	null
)(withRouter(EvaluationsEndUI))
