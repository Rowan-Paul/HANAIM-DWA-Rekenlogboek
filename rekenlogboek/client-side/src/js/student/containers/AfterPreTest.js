import React, { useEffect } from 'react'
import { connect } from 'react-redux'

import '../../../scss/student/containers/AfterPreTest.scss'
import '../../../scss/student/Student.scss'

import ProgressBar from '../components/ProgressBar'
import LearnGoal from '../components/LearnGoal'
import LearnGoalImage from '../components/LearnGoalImage'
import Question from '../components/Question'

import Jumbotron from '../../common/Jumbotron'
import Button from '../../common/Button'

import {
	setCurrentGoal,
	decrementCurrentGoal,
	incrementCurrentGoal,
	loadStudentLogbook
} from '../../redux/studentlogbook/actions'

function AfterPreTestUI(props) {
	useEffect(() => {
		props.loadStudentLogbook()
	}, [props.currentGoal])

	const getAnswer = () =>
		props.answers.filter(
			answer =>
				answer.goalPosition === props.currentGoal && answer.columnPosition === 1
		)[0]

	const previousPage = () => {
		if (props.currentGoal > 0) {
			props.decrementCurrentGoal()
		}
	}

	const nextPage = () => {
		if (props.currentGoal < props.goals.length - 1) {
			props.incrementCurrentGoal()
		} else {
			props.history.push('/student/pretest/done')
		}
	}

	const getProgressBarNumbers = () => {
		const numbers = props.answers.map(answer => {
			if (answer.columnPosition === 1) {
				return answer.goalPosition
			}
		})
		return numbers.filter(number => number !== undefined)
	}

	return (
		<div className="after-pre-test student-container">
			<ProgressBar
				itemCount={props.goals.length}
				done={getProgressBarNumbers()}
				changeHandler={props.setCurrentGoal}
			/>
			<Jumbotron columns={1}>
				<div className="learn-goal-container">
					<div className="left-side">
						<LearnGoal
							currentGoal={props.currentGoal}
							goal={props.goals[props.currentGoal].title}
							description={props.goals[props.currentGoal].description}
						/>
						<Question
							answer={getAnswer()}
							goalPosition={props.currentGoal}
							columnPosition={1}
							input={props.column.input}
							state={props.inputStates.inUse}
							explanation={props.explanation}
						/>
					</div>
					<div className="right-side">
						<LearnGoalImage src={props.goals[props.currentGoal].imageLink} />
					</div>
				</div>
			</Jumbotron>
			<div className="buttons">
				<div className="prev button">
					<Button color="gray" value="Vorige" handler={() => previousPage()} />
				</div>
				<div className="next button">
					<Button color="blue" value="Volgende" handler={() => nextPage()} />
				</div>
			</div>
		</div>
	)
}

function mapStateToProps(state) {
	return {
		explanation: state.studentLogbook.logbook.columns[1].explanation,
		inputStates: state.main.inputStates,
		answers: state.studentLogbook.studentlogbook.answers,
		column: state.studentLogbook.logbook.columns[1],
		currentGoal: state.studentLogbook.currentGoal,
		goals: state.studentLogbook.logbook.goals
	}
}

function mapDispatchToProps(dispatch) {
	return {
		setCurrentGoal: goal => dispatch(setCurrentGoal(goal)),
		incrementCurrentGoal: () => dispatch(incrementCurrentGoal()),
		decrementCurrentGoal: () => dispatch(decrementCurrentGoal()),
		loadStudentLogbook: () => dispatch(loadStudentLogbook())
	}
}

export const AfterPreTest = connect(
	mapStateToProps,
	mapDispatchToProps
)(AfterPreTestUI)
