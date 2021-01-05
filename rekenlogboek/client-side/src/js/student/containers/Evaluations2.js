import React, { useEffect } from 'react'
import { connect } from 'react-redux'

import '../../../scss/student/containers/Evaluation.scss'
import '../../../scss/student/Student.scss'

import ProgressBar from '../components/ProgressBar'
import LearnGoal from '../components/LearnGoal'
import LearnGoalImage from '../components/LearnGoalImage'
import Question from '../components/Question'
import Evaluation from '../../common/InputTypes/Evaluation'

import Jumbotron from '../../common/Jumbotron'
import Button from '../../common/Button'

import { loadStudentLogbook } from '../../redux/studentlogbook/actions'
import { saveAnswerRadio } from '../../redux/studentlogbook/actions'

function EvaluationsUI(props) {
	useEffect(() => {
		props.loadStudentLogbook()
	}, [props.currentGoal])

	const getAnswer = () =>
		props.answers.filter(
			answer =>
				answer.goalPosition === props.currentGoal && answer.columnPosition === 3
		)[0]

	const nextPage = () => {
		if (getAnswer()) {
			props.history.push('/student/evaluation/done')
		}
	}

	if (props.column.input !== undefined) {
		return (
			<div className="after-pre-test student-container">
				{/* <ProgressBar itemCount={props.goals.length} done={[1, 3]} /> */}
				<Jumbotron columns={1}>
					<div className="learn-goal-container">
						<div className="left-side">
							<LearnGoal
								goal={props.goals[props.currentGoal].title}
								description={props.goals[props.currentGoal].description}
							/>

							<h2>{props.column.title}</h2>
							<Evaluation
								state={props.inputStates.inUse}
								answer={getAnswer()}
								changeHandler={newAnswerValue => {
									props.saveAnswerRadio(newAnswerValue, props.currentGoal, 3)
								}}
							/>

							{/* <Question
								answer={getAnswer()}
								goalPosition={props.currentGoal}
								columnPosition={3}
								input={props.column.input}
								state={props.inputStates.inUse}
								explanation={props.explanation}
							/> */}
						</div>
						<div className="right-side">
							<LearnGoalImage src={props.goals[props.currentGoal].imageLink} />
						</div>
					</div>
				</Jumbotron>
				<div className="next button">
					<Button color="blue" value="Volgende" handler={() => nextPage()} />
				</div>
			</div>
		)
	} else {
		return <p>Loading</p>
	}
}

function mapStateToProps(state) {
	return {
		inputStates: state.main.inputStates,
		answers: state.studentLogbook.studentlogbook.answers,
		column: state.studentLogbook.logbook.columns[3],
		currentGoal: state.studentLogbook.logbook.activeGoal,
		goals: state.studentLogbook.logbook.goals
	}
}

function mapDispatchToProps(dispatch) {
	return {
		loadStudentLogbook: () => dispatch(loadStudentLogbook()),
		saveAnswerRadio: (answerValue, goalPosition, columnPosition) =>
			dispatch(saveAnswerRadio(answerValue, goalPosition, columnPosition))
	}
}

export const Evaluations = connect(
	mapStateToProps,
	mapDispatchToProps
)(EvaluationsUI)
