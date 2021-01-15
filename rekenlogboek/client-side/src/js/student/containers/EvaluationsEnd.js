import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import '../../../scss/student/Student.scss'

import ProgressBar from '../components/ProgressBar'
import ResultText from '../components/ResultText'
import ResultTable from '../components/ResultTable'

import Jumbotron from '../../common/Jumbotron'
import Button from '../../common/Button'

import { setCurrentGoal } from '../../redux/studentlogbook/actions'

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

	const getProgressBarNumbers = () => {
		const numbers = props.answers.map(answer => {
			if (
				answer.columnPosition === 3 &&
				answer.goalPosition === props.currentGoal
			) {
				return 0
			}
		})
		return numbers.filter(number => number !== undefined)
	}

	return (
		<div className="end-screen student-container">
			<ProgressBar
				itemCount={1}
				done={getProgressBarNumbers()}
				changeHandler={goal => {
					props.setCurrentGoal(goal)
					props.history.push('/student/evaluation')
				}}
			/>
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
			<div className="buttons">
				<div className="prev button">
					<Button color="gray" value="Vorige" handler={() => previousPage()} />
				</div>
			</div>
		</div>
	)
}

const mapStateToProps = state => ({
	currentGoal: state.studentLogbook.logbook.activeGoal,
	answers: state.studentLogbook.studentlogbook.answers,
	allGoals: state.studentLogbook.logbook.goals
})

const mapDispatchToProps = dispatch => ({
	setCurrentGoal: goal => dispatch(setCurrentGoal(goal))
})

export const EvaluationsEnd = connect(
	mapStateToProps,
	mapDispatchToProps
)(withRouter(EvaluationsEndUI))
